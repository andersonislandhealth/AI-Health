#!/usr/bin/env python3
"""Merge admin header + collections into admin/config.yml for Sveltia CMS."""

from __future__ import annotations

import sys
from pathlib import Path

ADMIN = Path(__file__).resolve().parent


def main() -> int:
    env = (sys.argv[1] if len(sys.argv) > 1 else "production").strip().lower()
    if env not in {"production", "staging"}:
        print(f"Unknown environment: {env}. Use production or staging.", file=sys.stderr)
        return 1

    header_path = ADMIN / f"config.{env}.header.yml"
    collections_path = ADMIN / "collections.yml"
    output_path = ADMIN / "config.yml"

    if not header_path.is_file():
        print(f"Missing {header_path}", file=sys.stderr)
        return 1
    if not collections_path.is_file():
        print(f"Missing {collections_path}", file=sys.stderr)
        return 1

    header = header_path.read_text(encoding="utf-8").rstrip()
    collections = collections_path.read_text(encoding="utf-8").rstrip()
    output_path.write_text(f"{header}\n\n{collections}\n", encoding="utf-8")
    print(f"Wrote {output_path} ({env})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
