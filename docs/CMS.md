# Content editor (Sveltia CMS)

Board members and staff with GitHub access can update **board bios**, **events**, and **fundraising numbers** through a web form—no code editor required.

**Admin URL:** [https://www.andersonislandhealth.org/admin/](https://www.andersonislandhealth.org/admin/)

This URL is not linked from the public site. Bookmark it if you edit content regularly.

---

## Who can access it

You must be a **GitHub collaborator** on the `andersonislandhealth/AI-Health` repository with **Write** access (or higher). Sign in with your **GitHub account** when prompted.

Sveltia CMS does not use Netlify Identity or email/password login. If someone is not invited as a collaborator, they cannot save changes.

To add an editor, an org admin should:

1. Open the repo on GitHub → **Settings** → **Collaborators** (or **Manage access**).
2. **Invite** the person by GitHub username or email.
3. Grant **Write** role.
4. Share this doc and the admin URL above.

If a board member does not have GitHub, they can create a free account at [github.com](https://github.com) and accept the invite.

---

## One-time setup (org admin / developer)

These steps are done once per site, not by every editor.

### 1. Confirm repository

- Repo: **`andersonislandhealth/AI-Health`** on GitHub.
- Netlify must deploy from this org repo (not an old fork).
- CMS config lives in [`admin/config.yml`](../admin/config.yml) — update `backend.repo` if the repo name changes.

### 2. GitHub OAuth app

1. GitHub org → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Register and copy the **Client ID** and **Client Secret**.

See [Sveltia GitHub backend — Using Netlify](https://sveltiacms.app/en/docs/backends/github).

### 3. Netlify OAuth provider

1. Netlify site dashboard → **Project configuration** → **Access & security** → **OAuth**.
2. **Install provider** → **GitHub**.
3. Paste the Client ID and Client Secret from step 2.
4. Save.

Use **Access & security**, not **Identity** (Identity / Git Gateway is deprecated and not supported by Sveltia).

### 4. Deploy

Push commits that include the `admin/` folder and `netlify.toml`. After deploy, open `/admin/` and sign in with a collaborator account to confirm login works.

---

## What you can edit

| CMS section | File updated | Appears on site |
|-------------|--------------|-----------------|
| **Board Members** | `board.json` | [Board section](https://www.andersonislandhealth.org/#board) — names, roles, bios |
| **Events** | `events.json` | [Events section](https://www.andersonislandhealth.org/#events) — upcoming and past lists |
| **Fundraising Progress** | `giving-progress.json` | Donate section thermometers / goal labels |

### Board members

- **Name** and **Role** always show on the board grid.
- **Biography:** leave empty until ready. Members **without** a bio do not get the expand arrow on the website.
- **Photo path:** optional; photos are not displayed on the site yet.

Members are sorted **alphabetically by name** on the live site.

### Events

- **Date** is required (`YYYY-MM-DD`). The site automatically puts today/future events under **Upcoming** and older dates under **Past events**.
- **Display date** is optional (e.g. `April 29, 2026`).

### Fundraising

- Updates **goal** and **current** amounts shown in the site thermometers.
- Zeffy’s embedded form may show its own live totals; keep this file in sync when you update public numbers manually.

---

## Saving changes

1. Open [https://www.andersonislandhealth.org/admin/](https://www.andersonislandhealth.org/admin/).
2. Sign in with **GitHub**.
3. Choose **Site Content** → Board Members, Events, or Fundraising Progress.
4. Edit fields and click **Save** (or **Publish**).
5. Sveltia commits to the `main` branch on GitHub.
6. Netlify rebuilds the site (usually **1–2 minutes**).
7. Hard refresh the public homepage to see updates (`Cmd+Shift+R` / `Ctrl+Shift+R`).

---

## Important rules

- **One editor at a time.** If two people edit the same file at once, the last save wins. Coordinate by email or chat.
- **Do not edit the same JSON files in GitHub’s web editor** while someone is using the CMS—pick one workflow.
- **Layout, design, FAQs, and mission copy** are still in `index.html` and require a developer to change.
- **Donations (Zeffy)** and the **volunteer form (Google)** are not managed in the CMS.

To undo a mistake, an admin can revert a commit on GitHub or restore an earlier version from **History** in the CMS.

---

## Local testing (developers)

The CMS needs HTTP and GitHub auth. For local work:

1. Run a static server from the repo root: `python3 -m http.server 8080`
2. Open `http://127.0.0.1:8080/admin/`
3. Sign in with GitHub (OAuth still goes through Netlify’s proxy when configured for the production site)

For offline config testing without saving to GitHub, see [Sveltia local development](https://sveltiacms.app/en/docs/start) and optional `local_backend` in the docs.

---

## Files reference

| Path | Purpose |
|------|---------|
| `admin/index.html` | CMS shell (loads Sveltia from CDN) |
| `admin/config.yml` | Collections, fields, GitHub backend |
| `board.json` | Board roster and bios |
| `events.json` | Event list |
| `giving-progress.json` | Fundraising goal numbers |

Optional: `board.csv` can still be used offline to collect bios before pasting into the CMS—it is not the live source of truth.

---

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| Login fails | Confirm Netlify OAuth provider is installed with correct GitHub OAuth app credentials |
| Save fails / permission denied | Confirm your GitHub user is a repo collaborator with Write access |
| Changes not on site | Wait for Netlify deploy to finish; hard refresh the homepage |
| Wrong repo | Check `repo:` in `admin/config.yml` matches GitHub and Netlify’s connected repo |

For CMS product questions, see [Sveltia CMS documentation](https://sveltiacms.app/en/docs).
