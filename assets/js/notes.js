(function () {
    function parseJsonScript(id) {
        const el = document.getElementById(id);
        if (!el) {
            return null;
        }

        try {
            return JSON.parse(el.textContent || '{}');
        } catch (error) {
            console.error(`Unable to parse ${id}`, error);
            return null;
        }
    }

    function decodeBase64Utf8(value) {
        const binary = window.atob(value);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    function setActiveSidebarLink() {
        const pageType = document.body.dataset.pageType || '';
        const currentSlug = document.body.dataset.currentSlug || '';

        document.querySelectorAll('[data-topic-link]').forEach(link => {
            const isOverview = pageType === 'lesson' && link.dataset.kind === 'lesson-index';
            const isCurrentTopic = pageType === 'topic' && link.dataset.slug === currentSlug;
            const isActive = isOverview || isCurrentTopic;

            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function buildSidebarMarkup(sidebarData) {
        const topicsMarkup = (sidebarData.topics || [])
            .map(topic => `
                <a href="${topic.href}" class="sidebar-topic-link" data-topic-link data-slug="${topic.slug}">
                    <span class="sidebar-topic-label">${escapeHtml(topic.title)}</span>
                </a>
            `)
            .join('');

        return `
            <section class="sidebar-card">
                <div class="sidebar-intro">
                    <div class="lesson-badge">Lesson ${escapeHtml(sidebarData.lessonNumber)}</div>
                    <h2>${escapeHtml(sidebarData.lessonTitle)}</h2>
                    <p>${escapeHtml(sidebarData.topicCount)} topics connected in one collapsible lesson sidebar.</p>
                </div>
                <div class="sidebar-action-row">
                    <a href="${sidebarData.notesHomeHref}" class="btn btn-outline notes-mini-btn">NOTES Home</a>
                </div>
                <nav class="sidebar-topic-nav" aria-label="${escapeHtml(sidebarData.lessonTitle)} topics">
                    <a href="${sidebarData.lessonIndexHref}" class="sidebar-topic-link sidebar-topic-overview" data-topic-link data-kind="lesson-index">
                        <span class="sidebar-topic-label">Lesson Overview</span>
                    </a>
                    <div class="sidebar-topic-list">
                        ${topicsMarkup}
                    </div>
                </nav>
            </section>
        `;
    }

    function renderSidebar() {
        const sidebarData = parseJsonScript('notes-sidebar-data');
        if (!sidebarData) {
            return;
        }

        const desktopHost = document.querySelector('[data-sidebar-desktop]');
        const mobileHost = document.querySelector('[data-sidebar-mobile]');
        const markup = buildSidebarMarkup(sidebarData);

        if (desktopHost) {
            desktopHost.innerHTML = markup;
        }

        if (mobileHost) {
            mobileHost.innerHTML = markup;
        }

        setActiveSidebarLink();
    }

    function enhanceRenderedContent(container) {
        container.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href') || '';
            if (/^https?:\/\//i.test(href)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noreferrer noopener');
            }
        });
    }

    function renderMarkdownNote() {
        const noteData = parseJsonScript('notes-page-data');
        const container = document.getElementById('noteContent');
        if (!noteData || !container) {
            return;
        }

        const markdown = decodeBase64Utf8(noteData.markdownBase64 || '');

        if (!window.marked || typeof window.marked.parse !== 'function') {
            container.innerHTML = `<pre class="notes-fallback-pre">${escapeHtml(markdown)}</pre>`;
            return;
        }

        window.marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: false,
            mangle: false
        });

        container.innerHTML = window.marked.parse(markdown);
        enhanceRenderedContent(container);
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderSidebar();
        renderMarkdownNote();
    });
})();
