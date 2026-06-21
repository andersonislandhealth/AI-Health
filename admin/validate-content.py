#!/usr/bin/env python3
"""Validate CMS JSON files against Sveltia list-field rules and index.html bindings."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# List fields that use singular `field:` in collections.yml — values must be plain strings.
SINGULAR_STRING_LISTS = {
    ("content/mission.json", "leftColumn.paragraphs"),
    ("content/plans.json", "pills"),
    ("content/giving.json", "impactItems"),
    ("content/footer.json", "principles.items"),
}

CMS_FILES = [
    "content/site-meta.json",
    "content/hero.json",
    "content/mission.json",
    "content/plans.json",
    "content/giving.json",
    "content/charity-disclosure.json",
    "content/board-section.json",
    "content/faqs.json",
    "content/events-section.json",
    "content/contact.json",
    "content/footer.json",
    "content/volunteer-modal.json",
    "board.json",
    "events.json",
    "giving-progress.json",
]

CONTENT_KEY_MAP = {
    "content/site-meta.json": "siteMeta",
    "content/hero.json": "hero",
    "content/mission.json": "mission",
    "content/plans.json": "plans",
    "content/giving.json": "giving",
    "content/charity-disclosure.json": "charityDisclosure",
    "content/board-section.json": "boardSection",
    "content/faqs.json": "faqs",
    "content/events-section.json": "eventsSection",
    "content/contact.json": "contact",
    "content/footer.json": "footer",
    "content/volunteer-modal.json": "volunteerModal",
}

MOUNT_PATHS = {
    "hero.actions",
    "mission.leftColumn.paragraphs",
    "plans.pills",
    "plans.timeline",
    "giving.impactItems",
    "giving.actions",
    "faqs.items",
    "contact.cards",
    "footer.principles.items",
}


def get_path(obj, path: str):
    cur = obj
    for key in path.split("."):
        if not isinstance(cur, dict) or key not in cur:
            return None
        cur = cur[key]
    return cur


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def find_wrapped_text_objects(obj, path: str = "") -> list[str]:
    """Detect {text: "..."} objects inside arrays — invalid for singular Sveltia lists."""
    issues: list[str] = []
    if isinstance(obj, list):
        for i, item in enumerate(obj):
            item_path = f"{path}[{i}]" if path else f"[{i}]"
            if isinstance(item, dict) and set(item.keys()) == {"text"}:
                issues.append(f"{item_path} uses {{text: ...}} wrapper — Sveltia expects a plain string")
            issues.extend(find_wrapped_text_objects(item, item_path))
    elif isinstance(obj, dict):
        for key, value in obj.items():
            child = f"{path}.{key}" if path else key
            issues.extend(find_wrapped_text_objects(value, child))
    return issues


def check_singular_lists(errors: list[str]) -> None:
    for file_rel, list_path in SINGULAR_STRING_LISTS:
        data = load_json(ROOT / file_rel)
        items = get_path(data, list_path)
        if items is None:
            errors.append(f"{file_rel}: missing list `{list_path}`")
            continue
        if not isinstance(items, list):
            errors.append(f"{file_rel}: `{list_path}` must be an array")
            continue
        for i, item in enumerate(items):
            if not isinstance(item, str):
                errors.append(
                    f"{file_rel}: `{list_path}[{i}]` must be a plain string for Sveltia CMS "
                    f"(got {type(item).__name__})."
                )
            elif not item.strip():
                errors.append(f"{file_rel}: `{list_path}[{i}]` is empty")


def check_wrapped_text_objects(errors: list[str]) -> None:
    for file_rel in CMS_FILES:
        data = load_json(ROOT / file_rel)
        for issue in find_wrapped_text_objects(data, file_rel):
            errors.append(issue)


def check_required_keys(errors: list[str]) -> None:
    checks = {
        "content/hero.json": ["headlineLine1", "headlineLine2", "tagline", "actions"],
        "content/mission.json": ["sectionCaption", "leftColumn", "rightColumn"],
        "content/plans.json": ["sectionCaption", "heading", "intro", "pills", "graphic", "cards"],
        "content/giving.json": ["sectionCaption", "heading", "intro", "impactItems", "actions", "sidebar"],
        "content/faqs.json": ["sectionCaption", "heading", "items"],
        "content/contact.json": ["cards"],
        "content/footer.json": ["organization", "principles", "contact", "copyrightName"],
        "board.json": ["members"],
        "events.json": ["events"],
        "giving-progress.json": ["goal", "current", "updated"],
    }
    for file_rel, keys in checks.items():
        data = load_json(ROOT / file_rel)
        for key in keys:
            if key not in data:
                errors.append(f"{file_rel}: missing required key `{key}`")

    hero = load_json(ROOT / "content/hero.json")
    for i, action in enumerate(hero.get("actions", [])):
        for key in ("label", "href", "variant"):
            if key not in action:
                errors.append(f"content/hero.json: actions[{i}] missing `{key}`")

    plans = load_json(ROOT / "content/plans.json")
    for i, card in enumerate(plans.get("cards", [])):
        for key in ("status", "body", "variant"):
            if key not in card:
                errors.append(f"content/plans.json: cards[{i}] missing `{key}`")

    faqs = load_json(ROOT / "content/faqs.json")
    for i, item in enumerate(faqs.get("items", [])):
        for key in ("question", "answer"):
            if key not in item:
                errors.append(f"content/faqs.json: items[{i}] missing `{key}`")

    contact = load_json(ROOT / "content/contact.json")
    for i, card in enumerate(contact.get("cards", [])):
        for key in ("heading", "body"):
            if key not in card:
                errors.append(f"content/contact.json: cards[{i}] missing `{key}`")

    board = load_json(ROOT / "board.json")
    for i, member in enumerate(board.get("members", [])):
        for key in ("name", "role", "bio"):
            if key not in member:
                errors.append(f"board.json: members[{i}] missing `{key}`")

    events = load_json(ROOT / "events.json")
    for i, event in enumerate(events.get("events", [])):
        for key in ("title", "date", "location", "description"):
            if key not in event:
                errors.append(f"events.json: events[{i}] missing `{key}`")


def check_index_bindings(errors: list[str], warnings: list[str]) -> None:
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    bindings = re.findall(r'data-cms-(text|html|link|src|alt|iframe-src|mount)="([^"]+)"', index)

    root = {key: load_json(ROOT / file_rel) for file_rel, key in CONTENT_KEY_MAP.items()}

    for kind, path in bindings:
        if kind == "mount":
            if path not in MOUNT_PATHS:
                errors.append(f"index.html: unknown data-cms-mount `{path}`")
            continue

        parts = path.split(".")
        if parts[0] not in root:
            errors.append(f"index.html: binding `{path}` — unknown root `{parts[0]}`")
            continue

        cur = root[parts[0]]
        for part in parts[1:]:
            if not isinstance(cur, dict) or part not in cur:
                errors.append(f"index.html: binding `{path}` — missing `{part}` in JSON")
                cur = None
                break
            cur = cur[part]

        if cur is None:
            continue
        if kind == "link":
            if not isinstance(cur, dict) or "label" not in cur or "href" not in cur:
                errors.append(f"index.html: binding `{path}` — link object needs label and href")
        elif kind in ("text", "html") and (cur == "" or cur is None):
            warnings.append(f"index.html: binding `{path}` resolves but value is empty")


def check_cms_file_coverage(errors: list[str]) -> None:
    collections = (ROOT / "admin/collections.yml").read_text(encoding="utf-8")
    declared = set(re.findall(r"file: ([^\s]+)", collections))
    for file_rel in declared:
        if not (ROOT / file_rel).is_file():
            errors.append(f"collections.yml references missing file `{file_rel}`")


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for file_rel in CMS_FILES:
        if not (ROOT / file_rel).is_file():
            errors.append(f"Missing CMS file `{file_rel}`")

    check_cms_file_coverage(errors)
    check_wrapped_text_objects(errors)
    check_singular_lists(errors)
    check_required_keys(errors)
    check_index_bindings(errors, warnings)

    if warnings:
        print("Warnings:")
        for w in warnings:
            print(f"  - {w}")
        print()

    if errors:
        print("Errors:")
        for e in errors:
            print(f"  - {e}")
        return 1

    print("CMS content validation passed.")
    print(f"  Checked {len(CMS_FILES)} JSON files")
    print(f"  Checked {len(SINGULAR_STRING_LISTS)} singular string lists")
    print(f"  Checked index.html CMS bindings")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
