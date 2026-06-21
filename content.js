/* Homepage content loaded from content/*.json (editable in Sveltia CMS). */

const CONTENT_FILES = {
    hero: 'content/hero.json',
    mission: 'content/mission.json',
    plans: 'content/plans.json',
    giving: 'content/giving.json',
    charityDisclosure: 'content/charity-disclosure.json',
    boardSection: 'content/board-section.json',
    faqs: 'content/faqs.json',
    eventsSection: 'content/events-section.json',
    contact: 'content/contact.json',
    footer: 'content/footer.json',
    volunteerModal: 'content/volunteer-modal.json',
    siteMeta: 'content/site-meta.json',
};

function listTextItems(items) {
    return (items || [])
        .map((item) => {
            if (typeof item === 'string') return item;
            if (item && typeof item === 'object') {
                return item.text ?? item.paragraph ?? item.label ?? item.name ?? '';
            }
            return '';
        })
        .filter(Boolean);
}

function renderInlineMarkdown(text) {
    if (!text) return '';

    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let result = '';
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(text)) !== null) {
        result += renderInlineBold(text.slice(lastIndex, match.index));
        const label = escapeHtml(match[1]);
        const href = match[2].trim();
        const safeHref = /^(https?:|mailto:|#|\/)/.test(href) ? href : '#';
        const external = /^https?:/.test(safeHref);
        result += `<a href="${escapeHtml(safeHref)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
        lastIndex = match.index + match[0].length;
    }

    result += renderInlineBold(text.slice(lastIndex));
    return result;
}

function renderInlineBold(text) {
    return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function renderRichText(text) {
    if (!text) return '';
    return text
        .split(/\n\n+/)
        .map((block) => `<p>${renderInlineMarkdown(block).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function heroActionClass(variant) {
    switch (variant) {
        case 'secondary':
            return 'cta-button-secondary';
        case 'outline':
            return 'cta-button-outline';
        case 'volunteer':
            return 'cta-button volunteer-trigger volunteer-cta';
        case 'primary':
        default:
            return 'cta-button donate-primary';
    }
}

function renderHeroActions(actions) {
    return (actions || [])
        .map((action) => {
            const cls = heroActionClass(action.variant);
            const aria = action.variant === 'volunteer' ? ' aria-label="Volunteer"' : '';
            return `<a class="${cls}" href="${escapeHtml(action.href || '#')}"${aria}>${escapeHtml(action.label || '')}</a>`;
        })
        .join('\n                    ');
}

function renderGivingAction(action) {
    const cls = action.variant === 'outline' ? 'cta-button-outline' : 'cta-button donate-primary';
    const external = action.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a class="${cls}" href="${escapeHtml(action.href || '#')}"${external}>${escapeHtml(action.label || '')}</a>`;
}

function renderPlanCard(card) {
    const variant = card.variant === 'future' ? 'future' : 'in-progress';
    const link = card.link
        ? `<a class="link-arrow" href="${escapeHtml(card.link.href)}"${card.link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(card.link.label)}</a>`
        : '';
    return `<article class="phase-card ${variant}">
                    <span class="status">${escapeHtml(card.status || '')}</span>
                    <p>${renderInlineMarkdown(card.body || '')}</p>
                    ${link}
                </article>`;
}

function applySiteMeta(data) {
    if (!data) return;
    if (data.pageTitle) document.title = data.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.metaDescription) metaDesc.setAttribute('content', data.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && data.pageTitle) ogTitle.setAttribute('content', data.pageTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && data.metaDescription) ogDesc.setAttribute('content', data.metaDescription);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && data.pageTitle) twTitle.setAttribute('content', data.pageTitle);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && data.metaDescription) twDesc.setAttribute('content', data.metaDescription);

    document.querySelectorAll('.floating-donate.donate-primary').forEach((el) => {
        if (data.floatingDonateLabel) {
            el.textContent = data.floatingDonateLabel;
            el.setAttribute('aria-label', data.floatingDonateLabel);
        }
    });
    document.querySelectorAll('.floating-donate.volunteer-trigger').forEach((el) => {
        if (data.floatingVolunteerLabel) {
            el.textContent = data.floatingVolunteerLabel;
            el.setAttribute('aria-label', data.floatingVolunteerLabel);
        }
    });
}

function applyHero(data) {
    const mount = document.querySelector('[data-content-hero]');
    if (!mount || !data) return;

    mount.innerHTML = `
                <h1>${escapeHtml(data.headlineLine1 || '')}<br>
                ${escapeHtml(data.headlineLine2 || '')}</h1>
                <p class="hero-tagline">${escapeHtml(data.tagline || '')}</p>
                <div class="hero-actions">
                    ${renderHeroActions(data.actions)}
                </div>`;
}

function applyMission(data) {
    const mount = document.querySelector('[data-content-mission]');
    if (!mount || !data) return;

    const left = data.leftColumn || {};
    const right = data.rightColumn || {};
    const leftParagraphs = listTextItems(left.paragraphs)
        .map((p) => `<p>${renderInlineMarkdown(p)}</p>`)
        .join('\n                    ');
    const leftLink = left.link
        ? `<p><a class="link-arrow" href="${escapeHtml(left.link.href || '#')}">${escapeHtml(left.link.label || '')}</a></p>`
        : '';
    const rightCta = right.cta
        ? `<a class="cta-button donate-primary" href="${escapeHtml(right.cta.href || '#giving')}">${escapeHtml(right.cta.label || 'Donate today')}</a>`
        : '';

    mount.innerHTML = `
            <p class="section-caption mission-purpose-lead">${escapeHtml(data.sectionCaption || '')}</p>
            <div class="grid-2-col reverse-mobile mission-purpose-grid">
                <div class="mission-purpose-col">
                    <h2>${escapeHtml(left.heading || '')}</h2>
                    ${leftParagraphs}
                    ${leftLink}
                </div>
                <div class="mission-purpose-col cta-panel">
                    <h2>${escapeHtml(right.heading || '')}</h2>
                    ${renderRichText(right.body || '')}
                    ${rightCta}
                </div>
            </div>`;
}

function applyPlans(data) {
    const mount = document.querySelector('[data-content-plans]');
    if (!mount || !data) return;

    const pills = listTextItems(data.pills)
        .map((pill) => `<li class="pill">${escapeHtml(pill)}</li>`)
        .join('\n                        ');
    const cards = data.cards || [];
    const heroCard = cards.find((c) => c.placement === 'hero');
    const timelineCards = cards.filter((c) => c.placement !== 'hero');
    const graphic = data.graphic || {};

    const heroWrap = heroCard
        ? `<div class="plan-hero-wrap">
                    <img class="plan-hero-graphic" src="${escapeHtml(graphic.src || '')}" alt="${escapeHtml(graphic.alt || '')}" loading="lazy">
                    ${renderPlanCard(heroCard)}
                </div>`
        : '';

    mount.innerHTML = `
            <div class="plan-header">
                <p class="section-caption">${escapeHtml(data.sectionCaption || '')}</p>
                <h2>${escapeHtml(data.heading || '')}</h2>
                ${renderRichText(data.intro || '')}
                <ul class="pill-list">
                        ${pills}
                    </ul>
                <br>
            </div>
            <div class="timeline">
                ${heroWrap}
                ${timelineCards.map(renderPlanCard).join('\n                ')}
            </div>`;
}

function applyGiving(data) {
    const mount = document.querySelector('[data-content-giving]');
    if (!mount || !data) return;

    const impactItems = listTextItems(data.impactItems)
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('\n                        ');
    const actions = (data.actions || []).map(renderGivingAction).join('\n                        ');
    const sidebar = data.sidebar || {};
    const photo = data.photo || {};

    mount.innerHTML = `
            <p class="section-caption">${escapeHtml(data.sectionCaption || '')}</p>
            <div class="grid-2-col reverse-mobile">
                <div>
                    <h2>${escapeHtml(data.heading || '')}</h2>
                    <p>${escapeHtml(data.intro || '')}</p>
                    <ul class="impact-list">
                        ${impactItems}
                    </ul>
                    <p style="margin-top:8px;">${renderInlineMarkdown(data.givingNote || '')}</p>
                    <div class="giving-photo">
                        <img src="${escapeHtml(photo.src || '')}" alt="${escapeHtml(photo.alt || '')}" loading="lazy">
                    </div>
                    <div class="giving-actions">
                        ${actions}
                    </div>
                </div>
                <div class="giving-side">
                    <div class="zeffy-embed-card">
                        <h4>${escapeHtml(sidebar.progressHeading || 'Live goal progress')}</h4>
                        <iframe src="${escapeHtml(sidebar.zeffyUrl || '')}" title="Zeffy donation form" allowfullscreen></iframe>
                        <p class="zeffy-note">${escapeHtml(sidebar.zeffyNote || '')}</p>
                        <div class="mail-donate">
                            ${renderInlineMarkdown(sidebar.mailDonate || '')}
                        </div>
                    </div>
                </div>
            </div>`;
}

function applyCharityDisclosure(data) {
    const mount = document.querySelector('[data-content-charity-disclosure]');
    if (!mount || !data) return;
    mount.innerHTML = `<p>${renderInlineMarkdown(data.body || '')}</p>`;
}

function applyBoardSection(data) {
    const caption = document.querySelector('[data-board-caption]');
    const heading = document.querySelector('[data-board-heading]');
    const footnote = document.querySelector('[data-board-footnote]');
    if (caption && data?.sectionCaption) caption.textContent = data.sectionCaption;
    if (heading && data?.heading) heading.textContent = data.heading;
    if (footnote && data?.footnote) footnote.textContent = data.footnote;
}

function applyFaqs(data) {
    const mount = document.querySelector('[data-content-faqs]');
    if (!mount || !data) return;

    const items = (data.items || [])
        .map(
            (item) => `<article class="phase-card">
                    <h3>${escapeHtml(item.question || '')}</h3>
                    <p>${renderInlineMarkdown(item.answer || '')}</p>
                </article>`
        )
        .join('\n                ');

    mount.innerHTML = `
            <p class="section-caption">${escapeHtml(data.sectionCaption || '')}</p>
            <h2>${escapeHtml(data.heading || '')}</h2>
            <div class="timeline">
                ${items}
            </div>`;
}

function applyEventsSection(data) {
    const caption = document.querySelector('[data-events-caption]');
    const heading = document.querySelector('[data-events-heading]');
    const intro = document.querySelector('[data-events-intro]');
    const pastLabel = document.querySelector('[data-past-events-label]');
    if (caption && data?.sectionCaption) caption.textContent = data.sectionCaption;
    if (heading && data?.heading) heading.textContent = data.heading;
    if (intro && data?.intro) intro.textContent = data.intro;
    if (pastLabel && data?.pastEventsLabel) pastLabel.textContent = data.pastEventsLabel;
}

function applyContact(data) {
    const mount = document.querySelector('[data-content-contact]');
    if (!mount || !data) return;

    const cards = (data.cards || [])
        .map(
            (card) => `<div class="contact-card">
                    <h3>${escapeHtml(card.heading || '')}</h3>
                    <p>${renderInlineMarkdown(card.body || '')}</p>
                </div>`
        )
        .join('\n                ');

    mount.innerHTML = `<div class="grid-2-col">${cards}</div>`;
}

function applyFooter(data) {
    if (!data) return;

    const org = data.organization || {};
    const principles = data.principles || {};
    const contact = data.contact || {};

    const orgHeading = document.querySelector('[data-footer-org-heading]');
    const orgTagline = document.querySelector('[data-footer-org-tagline]');
    const orgCredit = document.querySelector('[data-footer-org-credit]');
    const principlesHeading = document.querySelector('[data-footer-principles-heading]');
    const principlesList = document.querySelector('[data-footer-principles-list]');
    const contactHeading = document.querySelector('[data-footer-contact-heading]');
    const contactGeneral = document.querySelector('[data-footer-contact-general]');
    const contactAddress = document.querySelector('[data-footer-contact-address]');
    const copyrightName = document.querySelector('[data-footer-copyright-name]');

    if (orgHeading && org.heading) orgHeading.textContent = org.heading;
    if (orgTagline && org.tagline) orgTagline.textContent = org.tagline;
    if (orgCredit && org.credit) orgCredit.innerHTML = org.credit.replace('AI Design Tech', '<br>AI Design Tech');
    if (principlesHeading && principles.heading) principlesHeading.textContent = principles.heading;
    if (principlesList) {
        principlesList.innerHTML = listTextItems(principles.items)
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join('');
    }
    if (contactHeading && contact.heading) contactHeading.textContent = contact.heading;
    if (contactGeneral && contact.generalLine) contactGeneral.innerHTML = renderInlineMarkdown(contact.generalLine);
    if (contactAddress && contact.addressLine) contactAddress.innerHTML = renderInlineMarkdown(contact.addressLine);
    if (copyrightName && data.copyrightName) copyrightName.textContent = data.copyrightName;
}

function applyVolunteerModal(data) {
    if (!data) return;
    const heading = document.querySelector('[data-volunteer-heading]');
    const intro = document.querySelector('[data-volunteer-intro]');
    const iframe = document.querySelector('[data-volunteer-iframe]');
    if (heading && data.heading) heading.textContent = data.heading;
    if (intro && data.intro) intro.textContent = data.intro;
    if (iframe && data.formUrl) iframe.setAttribute('src', data.formUrl);
}

async function fetchContentFile(path, skip) {
    if (skip) return null;
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path} fetch failed: ${res.status}`);
    return res.json();
}

async function initContent(skip) {
    try {
        const entries = await Promise.all(
            Object.entries(CONTENT_FILES).map(async ([key, path]) => {
                try {
                    const data = await fetchContentFile(path, skip);
                    return [key, data];
                } catch (err) {
                    console.warn(`Could not load ${path}`, err);
                    return [key, null];
                }
            })
        );
        const content = Object.fromEntries(entries);

        applySiteMeta(content.siteMeta);
        applyHero(content.hero);
        applyMission(content.mission);
        applyPlans(content.plans);
        applyGiving(content.giving);
        applyCharityDisclosure(content.charityDisclosure);
        applyBoardSection(content.boardSection);
        applyFaqs(content.faqs);
        applyEventsSection(content.eventsSection);
        applyContact(content.contact);
        applyFooter(content.footer);
        applyVolunteerModal(content.volunteerModal);
    } catch (err) {
        console.error('Could not initialize homepage content', err);
    }
}
