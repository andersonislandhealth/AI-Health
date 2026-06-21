# Anderson Island Health — Simple CMS Guide

This guide is for board members and staff who update website **words, numbers, board bios, and events**. You do not need to know code.

---

## Before you start

### You need

1. A **GitHub account** ([github.com](https://github.com) — free to create).
2. An **invitation** to the website repository from an AIHA admin (Write access).
3. A **bookmarked link** to the editor (see below).

### Sign in

1. Open the editor link (staging or production — see next section).
2. Click to sign in with **GitHub**.
3. Approve access if GitHub asks.

If login fails, contact your site admin — they may need to add you as a collaborator or fix the login setup.

---

## Two editors: test vs live

There are **two separate editors**. Always know which one you are using.

| | **Test site (staging)** | **Live site (production)** |
|---|-------------------------|----------------------------|
| **Editor link** | [incredible-cannoli-8dd540.netlify.app/admin/](https://incredible-cannoli-8dd540.netlify.app/admin/) | [andersonislandhealth.org/admin/](https://www.andersonislandhealth.org/admin/) |
| **Public website** | [incredible-cannoli-8dd540.netlify.app](https://incredible-cannoli-8dd540.netlify.app) | [andersonislandhealth.org](https://www.andersonislandhealth.org) |
| **When to use** | Try changes here first | Only when you want the world to see the change |

**Rule:** Practice on the **test** editor. When everything looks right, either use the **live** editor for the same change, or ask your developer to publish test changes to the live site.

Changes are **not automatic** between test and live — each editor saves to its own place.

---

## How to edit and save

1. Open the editor and sign in.
2. Use the **left sidebar** to pick a section (Hero, Mission, Board, etc.).
3. Click the page or item you want to change.
4. Edit the fields on the **left** (“Edit” panel).
5. Check the **right** panel (“Preview”) to see how it will look.
6. Click **Save** (top right).
7. Wait **1–2 minutes** for the website to rebuild.
8. Open the matching public site URL and **hard refresh**:
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

If you don’t see your change, wait another minute and refresh again.

---

## What each sidebar section does

The sidebar follows the homepage from top to bottom.

| Sidebar section | What you can change |
|-----------------|---------------------|
| **Site settings** | Browser tab title, search description, floating “Donate” / “Volunteer” button labels |
| **Hero** | Top banner headline, tagline, and buttons |
| **Mission** | “Our Mission” two-column text and donate button |
| **Phase 1 plans** | Plans intro, bullet pills, timeline cards, van image path |
| **Donate & giving** | Giving section copy, impact bullets, buttons, Zeffy sidebar text |
| **Donate & giving → Fundraising numbers** | Goal amount, current amount, “last updated” label (thermometers on site) |
| **Board** | Board section headings; each member’s name, role, and biography |
| **FAQs** | FAQ section intro and each question/answer card |
| **Events** | Events section intro; each event (title, date, location, description) |
| **Contact, footer & legal** | Contact cards, footer text, volunteer popup, tax disclosure |

**Not in the CMS** (ask a developer): menu layout, colors, fonts, adding new page sections, uploading brand-new photo files to the server.

---

## Formatting text (Bold, links, images)

Many fields show a small toolbar like a word processor:

| Button | What it does |
|--------|----------------|
| **B** | Bold |
| **I** | Italic |
| Link | Turn selected text into a clickable link |
| Image | Insert a photo |

### How to format

1. **Highlight** the words you want to change.
2. Click **B**, **I**, or the link button.
3. For links, paste the URL when asked (e.g. `mailto:info@andersonislandhealth.org` or `#board` for on-page links).

**Keyboard shortcuts:** `Cmd+B` / `Ctrl+B` (bold), `Cmd+I` / `Ctrl+I` (italic).

### Adding a photo in text

1. Place your cursor where you want the image.
2. Press **Enter twice** (blank line) so the image sits **below** the paragraph, not inline with the sentence.
3. Click the **image** button and choose a file from **assets/photos**.
4. Save.

If a photo shows as a text path instead of an image on the site, contact your developer — the site may need an update.

---

## Common tasks

### Update a board member bio

1. Sidebar → **Board** → **Board members**.
2. Find the person (or click **Add Member**).
3. Fill in **Name** and **Role**.
4. **Biography:** leave **empty** until the bio is ready. Empty bios = no expand arrow on the website.
5. Save.

Members appear **alphabetically by name** on the live site.

### Add or edit an event

1. Sidebar → **Events** → **Event listings**.
2. Add or open an event.
3. **Date** is required (`YYYY-MM-DD`, e.g. `2026-04-29`). The site shows it as a full date (e.g. **April 29, 2026**). Future dates appear under **Upcoming**; past dates move to **Past events**.
4. Save.

### Update fundraising numbers

1. Sidebar → **Donate & giving** → **Fundraising numbers**.
2. Update **Goal ($)** and **Current amount ($)**.
3. Update **Last updated label** (e.g. `March 15, 2026`).
4. Save.

The Zeffy donation form may show its own live total; keep these numbers in sync with what you announce publicly.

### Change homepage headline or mission text

1. Sidebar → **Hero** or **Mission**.
2. Edit the fields. Use **+ Add Paragraph** under Mission left column for extra paragraphs.
3. Save and check the test site first.

---

## Important rules

- **One person at a time** per section if possible. If two people save the same page, the last save wins.
- **Don’t edit the same content in GitHub** while someone is using this editor.
- **Always Save** before closing the tab.
- **Use History** (clock icon on the right) to see or restore earlier versions if you make a mistake.
- **Bookmark** the correct editor link so you don’t accidentally edit the live site when you meant to test.

---

## Something wrong?

| Problem | Try this |
|---------|----------|
| Can’t log in | Confirm you accepted the GitHub invite; try a private/incognito window |
| Save button fails | You may not have permission — ask an admin to confirm your GitHub access |
| Change not visible | Wait 2 minutes; hard refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`) |
| Edited test site but live site unchanged | Expected — test and live are separate; repeat the edit on live or ask developer to publish |
| Edited live but test site unchanged | Expected — same reason |
| Empty fields in editor but text on website | Rare sync issue — contact developer |
| Board member has no expand arrow | Biography field is empty (intentional until bio is ready) |

---

## Quick checklist for every edit

- [ ] Opened the **correct** editor (test vs live)
- [ ] Signed in with GitHub
- [ ] Made edits and clicked **Save**
- [ ] Waited 1–2 minutes
- [ ] Hard-refreshed the matching public website
- [ ] Confirmed the change looks right

---

## Need help?

- **Technical / login / publishing to live site:** contact your AIHA website developer.
- **Who can get access:** an org admin adds collaborators at GitHub → repository **Settings** → **Collaborators**.

*Last updated for the Anderson Island Healthcare Advocates website content editor (Sveltia CMS).*
