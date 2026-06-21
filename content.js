/* Homepage content from content/*.json — updates index.html in place (Sveltia CMS). */

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

function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getPath(root, path) {
    if (!path) return undefined;
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), root);
}

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

function renderInlineBold(text) {
    return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
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

function renderInlineBlock(text) {
    if (!text) return '';
    return renderInlineMarkdown(text).replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
}

function renderBlockHtml(text) {
    if (!text) return '';
    if (text.includes('\n\n')) {
        return text
            .split(/\n\n+/)
            .map((block) => `<p>${renderInlineMarkdown(block).replace(/\n/g, '<br>')}</p>`)
            .join('');
    }
    return renderInlineBlock(text);
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

function renderPlansTimeline(plans) {
    if (!plans) return '';
    const cards = plans.cards || [];
    const heroCard = cards.find((c) => c.placement === 'hero');
    const timelineCards = cards.filter((c) => c.placement !== 'hero');
    const graphic = plans.graphic || {};

    const heroWrap = heroCard
        ? `<div class="plan-hero-wrap">
                    <img class="plan-hero-graphic" src="${escapeHtml(graphic.src || '')}" alt="${escapeHtml(graphic.alt || '')}" loading="lazy">
                    ${renderPlanCard(heroCard)}
                </div>`
        : '';

    return `${heroWrap}
                ${timelineCards.map(renderPlanCard).join('\n                ')}`;
}

function renderMissionParagraphs(paragraphs) {
    return listTextItems(paragraphs)
        .map((p) => `<p>${renderInlineMarkdown(p)}</p>`)
        .join('\n                        ');
}

function renderFaqItems(items) {
    return (items || [])
        .map(
            (item) => `<article class="phase-card">
                    <h3>${escapeHtml(item.question || '')}</h3>
                    <p>${renderInlineMarkdown(item.answer || '')}</p>
                </article>`
        )
        .join('\n                ');
}

function renderContactCards(cards) {
    return (cards || [])
        .map(
            (card) => `<div class="contact-card">
                    <h3>${escapeHtml(card.heading || '')}</h3>
                    <p>${renderInlineMarkdown(card.body || '')}</p>
                </div>`
        )
        .join('\n                ');
}

const MOUNT_RENDERERS = {
    'hero.actions': (root, el) => {
        const actions = getPath(root, 'hero.actions');
        if (actions?.length) el.innerHTML = renderHeroActions(actions);
    },
    'mission.leftColumn.paragraphs': (root, el) => {
        const paragraphs = getPath(root, 'mission.leftColumn.paragraphs');
        if (paragraphs?.length) el.innerHTML = renderMissionParagraphs(paragraphs);
    },
    'plans.pills': (root, el) => {
        const pills = getPath(root, 'plans.pills');
        if (pills?.length) {
            el.innerHTML = listTextItems(pills)
                .map((pill) => `<li class="pill">${escapeHtml(pill)}</li>`)
                .join('\n                        ');
        }
    },
    'plans.timeline': (root, el) => {
        const plans = getPath(root, 'plans');
        const html = renderPlansTimeline(plans);
        if (html.trim()) el.innerHTML = html;
    },
    'giving.impactItems': (root, el) => {
        const items = getPath(root, 'giving.impactItems');
        if (items?.length) {
            el.innerHTML = listTextItems(items)
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join('\n                        ');
        }
    },
    'giving.actions': (root, el) => {
        const actions = getPath(root, 'giving.actions');
        if (actions?.length) {
            el.innerHTML = actions.map(renderGivingAction).join('\n                        ');
        }
    },
    'faqs.items': (root, el) => {
        const items = getPath(root, 'faqs.items');
        if (items?.length) el.innerHTML = renderFaqItems(items);
    },
    'contact.cards': (root, el) => {
        const cards = getPath(root, 'contact.cards');
        if (cards?.length) el.innerHTML = renderContactCards(cards);
    },
    'footer.principles.items': (root, el) => {
        const items = getPath(root, 'footer.principles.items');
        if (items?.length) {
            el.innerHTML = listTextItems(items)
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join('\n                    ');
        }
    },
};

function applySiteMeta(root) {
    const data = root.siteMeta;
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
}

function applyBindings(root) {
    document.querySelectorAll('[data-cms-text]').forEach((el) => {
        const value = getPath(root, el.dataset.cmsText);
        if (value == null) return;
        el.textContent = value;
        if (el.classList.contains('floating-donate')) {
            el.setAttribute('aria-label', value);
        }
    });

    document.querySelectorAll('[data-cms-html]').forEach((el) => {
        const value = getPath(root, el.dataset.cmsHtml);
        if (value == null) return;

        if (el.dataset.cmsHtml === 'footer.organization.credit') {
            el.innerHTML = renderInlineBlock(value).replace(
                'AI Design Tech',
                '<br>AI Design Tech'
            );
            return;
        }

        if (el.tagName === 'P' || el.classList.contains('mail-donate')) {
            el.innerHTML = renderInlineBlock(value);
        } else {
            el.innerHTML = renderBlockHtml(value);
        }
    });

    document.querySelectorAll('[data-cms-link]').forEach((el) => {
        const link = getPath(root, el.dataset.cmsLink);
        if (!link) return;
        if (link.label) el.textContent = link.label;
        if (link.href) el.setAttribute('href', link.href);
    });

    document.querySelectorAll('[data-cms-src]').forEach((el) => {
        const value = getPath(root, el.dataset.cmsSrc);
        if (value) el.setAttribute('src', value);
    });

    document.querySelectorAll('[data-cms-alt]').forEach((el) => {
        const value = getPath(root, el.dataset.cmsAlt);
        if (value) el.setAttribute('alt', value);
    });

    document.querySelectorAll('[data-cms-iframe-src]').forEach((el) => {
        const value = getPath(root, el.dataset.cmsIframeSrc);
        if (value) el.setAttribute('src', value);
    });

    document.querySelectorAll('[data-cms-mount]').forEach((el) => {
        const key = el.dataset.cmsMount;
        const render = MOUNT_RENDERERS[key];
        if (render) render(root, el);
    });
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

        const root = Object.fromEntries(entries);
        applySiteMeta(root);
        applyBindings(root);
    } catch (err) {
        console.error('Could not initialize homepage content', err);
    }
}
