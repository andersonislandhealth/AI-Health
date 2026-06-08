# Anderson Island Healthcare Advocates (AIHA)  
## Visual style guide for advocates & communications

**Purpose:** This guide summarizes how the public website at [andersonislandhealth.org](https://www.andersonislandhealth.org/) looks and feels so flyers, social posts, slide decks, and partner materials stay visually aligned with our brand.

**Print tip:** In your browser or PDF app, choose **Print → Save as PDF** or print on letter/A4. Margins of about 0.5 in (12 mm) work well.

---

## 1. Brand in one sentence

**Warm, coastal-community healthcare access**—trustworthy blues and teals, soft sunrise corals and peaches, generous white space, and rounded “pill” shapes that feel approachable rather than clinical.

---

## 2. Typography

### Headlines and titles (H1–H6)

| Role | Font names (in order) | Where it comes from |
|------|------------------------|----------------------|
| **Headings** | **Congenial** (web kit loads it as **“Congenial Regular”** / **“Congenial”**) | **Adobe Fonts** (formerly Typekit). The site loads kit `siy6qpg` from `use.typekit.net`. Font files and licensing are managed by **Adobe**; use is governed by [Adobe’s Typekit / Fonts terms](https://www.adobe.com/products/eulas/tou_typekit). |

**If Congenial is not available** (e.g. a Word template without Adobe Fonts): use **Helvetica Neue**, then **Helvetica**, then **Arial**—same order as the website’s fallback stack.

### Body copy (paragraphs, lists, navigation labels)

| Role | Font | Source |
|------|------|--------|
| **Body text** | **Helvetica Neue**, **Helvetica**, **Arial**, sans-serif | **System fonts** on macOS and Windows (no separate download on the website). |

### Typographic habits on the site

- **Base size:** Slightly larger than default—the root font size is about **115%**, so body copy reads a bit more open and accessible.
- **Line height:** Body text uses comfortable line spacing (**about 1.65**).
- **Section labels** (e.g. “Our Purpose”, “Phase 1”): **ALL CAPS**, **wide letter-spacing**, **medium weight**, dark blue—see “Section captions” below.

**Licensing note for designers:** Congenial is a **commercial web font** served through **Adobe Fonts**. For **new websites or apps**, use an Adobe Fonts–connected project or another properly licensed copy. For **print-only** pieces, confirm your font license covers print (Adobe Fonts plans differ); when in doubt, use the Helvetica/Arial fallbacks for internal drafts.

---

## 3. Color palette

Colors below are the **exact values** from the live site stylesheet. Use them for backgrounds, text, buttons, and accents.

### Core blues & teals (trust, water, care)

| Name (CSS token) | Hex | When to use |
|------------------|-----|--------------|
| **Primary** | `#0c7bbd` | Links, key UI accents, browser theme color; “main” brand blue |
| **Primary dark** | `#0a4f8a` | Deep blue for emphasis, gradients, caption text |
| **Primary bright** | `#18a6df` | Hero gradients, brighter highlights |
| **Primary teal** | `#036474` | **H2** headings on light backgrounds; nav hover/active underline |
| **Dark teal** | `#00323a` | **Volunteer** actions (buttons, floating control)—distinct from donate |
| **Donate teal** | `#006378` | **Donate** primary buttons and floating “Donate today” |
| **Navy** | `#16324f` | **H1/H3–H6** on light backgrounds, footer background, contact band cards |
| **Slate** | `#2d3a4a` | Alternate dark neutral (e.g. some hero variants) |

### Supporting accents (warmth & island light)

| Name (CSS token) | Hex | When to use |
|------------------|-----|--------------|
| **Accent coral** | `#f5a8c1` | Secondary CTAs, rose gradients, warmth |
| **Sunrise coral** | `#e19ab5` | Gradients, timeline accents |
| **Peach light** | `#f3c6b1` | Soft borders and timeline accents |
| **Evergreen teal** | `#59a889` | Nature / progress accents |
| **Accent teal** | `#58c0d9` | Sky-water highlights, list bullets, bars |
| **Accent sand** | `#f4f0ea` | Soft section backgrounds |
| **Accent sky** | `#dff1fb` | Light panels, pills, footer headings on dark |

### Text & surfaces

| Name (CSS token) | Hex | When to use |
|------------------|-----|--------------|
| **Dark text** | `#253049` | Primary body text color on light backgrounds |
| **Muted text** | `#5d6983` | Supporting paragraphs, captions |
| **Light text** | `#ffffff` | Text on dark blue hero or navy footer |
| **Page background** | `#fdfefe` | Off-white page “paper” |
| **Border** | `#d7dee3` | Dividers, light borders |

### Quick “do this” summary

- **Headlines on white:** Navy (`#16324f`) for most headings; **H2** specifically uses **primary teal** (`#036474`).
- **Donate vs volunteer:** **Donate** = **donate teal** `#006378`. **Volunteer** = **dark teal** `#00323a` (darker, separate from donate so the two never look identical).
- **Links:** Primary blue `#0c7bbd` (underline on hover on the site).

---

## 4. Signature design details (“this looks like AIHA”)

Use these together—they are as important as the logo for recognition.

### Rounded “pill” geometry

- **Large rounded corners:** Buttons and many panels use a **~38 px** corner radius (very rounded pills, not sharp squares).
- **Floating actions:** “Donate today” and “Volunteer” fixed buttons use **fully pill-shaped** (999 px radius) capsules.

### Gradients (not flat blocks)

- **Hero:** Diagonal gradient about **135°** from **primary bright** to **primary dark** blue.
- **Primary buttons:** “Ocean” gradient from strong blue into deeper blue.
- **Secondary (coral) buttons:** Rose / coral gradient.
- **Mission panel:** Very soft blend of **light sky blue** and **sand** (`linear-gradient` feel—airy, not heavy).
- **Events / callouts:** Gentle mix of **teal** and **soft coral** at low opacity—community warmth without clutter.

### Section captions (small labels above headlines)

- **Uppercase**, **generous letter-spacing**, **medium weight**, **primary dark** color.
- **Accent rule:** A **short horizontal bar** (~58 px wide, 3 px tall, fully rounded) under the label, filled with a **blue-to-teal** gradient.

If you replicate this in Canva or PowerPoint: small caps label + thin gradient underline = on-brand.

### Cards & shadows

- White cards with **very soft shadow** (large blur, low opacity—think “floating paper,” not harsh drop shadow).
- Thin borders using **transparent teal** tints (e.g. `rgba(0,152,187,0.12)` style)—barely there but crisp.

### Imagery

- **Real island life:** The site uses **full-width photography** (e.g. ferry at sunset) with a **peach-tinted top border** on wide bands—suggests horizon/sky warmth.
- **Giving section photos:** **Square crop**, **large rounded corners** (~38 px style) for a friendly, album-like feel—not sharp rectangles.

### Content tone in layout

- **Generous padding** around sections; content is centered in a **wide but readable** column (~1200 px max on web).
- **Two-column grids** on desktop for mission + side panel; stacks on mobile—prefer **clear stacking** over cramming columns on small screens.

### Icons & illustration

- Custom or partner graphics (e.g. **mobile van** illustration) use **soft drop shadows** and sit on **white phase cards**—clean, informational, not playful-cartoon.

### Footer & “dark theme” blocks

- **Navy** background (`#16324f`), **soft sky** (`#dff1fb`) for footer subheadings, body links **light gray-white** with **sky** on hover.

---

## 5. Buttons & calls to action (match the site)

| Type | Look | Use for |
|------|------|---------|
| **Primary / ocean** | Blue gradient, white text, soft shadow | General “learn more,” main actions in hero |
| **Secondary / rose** | Coral–pink gradient, white text | Alternate emphasis (e.g. “Our Purpose” in hero) |
| **Outline** | Transparent fill, **primary dark** text, blue border | Low-competition actions (“Read FAQs”) |
| **Donate primary** | **Solid donate teal** `#006378`, white text | All **donation** CTAs |
| **Volunteer** | **Solid dark teal** `#00323a`, white text | **Volunteer** only |

**Letter-spacing:** Buttons use **slightly opened** tracking (~0.02em) and **bold** weight for clarity at a glance.

---

## 6. Logo & wordmarks

- **Primary mark:** `assets/AI Health Custom Logo v9.png` (navbar and typical placements).
- **Favicon / social preview:** Under `assets/favicon/` (including `web-app-manifest-512x512.png` for sharing).
- **Credit:** Footer notes site and logo design by **Kolbi Christianson, AI Design Tech**—keep that relationship accurate in credits if you adapt layouts derived from the site.

**Do not** stretch the logo, change colors arbitrarily, or place low-contrast versions on busy photos without a solid backing shape.

---

## 7. Official names & web presence

- **Full name:** Anderson Island Healthcare Advocates  
- **Short forms:** AIHA; also referenced in structured data as Anderson Island Health, AI Health (verify context before using shorthand).  
- **Website:** https://www.andersonislandhealth.org/  
- **General email:** info@andersonislandhealth.org  

---

## 8. Checklist before publishing

- [ ] Headlines: **Congenial** (or Helvetica Neue / Arial fallback).  
- [ ] Body: **Helvetica Neue** or **Arial**.  
- [ ] Colors: **Navy + teal blues** for structure; **coral/peach** only as accent—not overwhelming.  
- [ ] **Donate** and **Volunteer** use **different** teal shades (donate lighter `#006378`, volunteer darker `#00323a`).  
- [ ] Corners: **Pills / large radius**, not sharp 90° everywhere.  
- [ ] Whitespace: **Airy** sections, not dense blocks.  
- [ ] Logo: **Correct file**, **clear contrast**, **not distorted**.  

---

*This document reflects the design tokens and patterns in `style.css` and typography loading in `index.html` as of the guide’s creation. If the site is updated, ask the web team to refresh this file.*
