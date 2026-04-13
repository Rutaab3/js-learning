import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "notes.md");
const outputRoot = path.join(projectRoot, "notes.live");
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

if (!fs.existsSync(sourceRoot)) {
  throw new Error(`Source folder not found: ${sourceRoot}`);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function humanizeSlug(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripMarkdown(value) {
  return value
    .replace(/\[\[([^\]]+)\]\(([^)]+)\)\]/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(markdown, fallback) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    const quoteStripped = line.replace(/^>\s?/, "");
    const htmlHeadingMatch = quoteStripped.match(/^<h([1-6])[^>]*>(.*)$/i);

    if (htmlHeadingMatch) {
      const clean = stripMarkdown(htmlHeadingMatch[2]);
      if (clean) {
        return clean;
      }
    }

    const markdownHeadingMatch = quoteStripped.match(/^#{1,6}\s+(.+)$/);
    if (markdownHeadingMatch) {
      const clean = stripMarkdown(markdownHeadingMatch[1]);
      if (clean) {
        return clean;
      }
    }
  }

  return fallback;
}

function extractExcerpt(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const bucket = [];
  let inCode = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }

    if (inCode || !line) {
      continue;
    }

    const quoteStripped = line.replace(/^>\s?/, "");

    if (/^<h[1-6]/i.test(quoteStripped) || /^#{1,6}\s/.test(quoteStripped)) {
      continue;
    }

    bucket.push(stripMarkdown(quoteStripped));

    if (bucket.join(" ").length > 180) {
      break;
    }
  }

  const text = bucket.join(" ").replace(/\s+/g, " ").trim();
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}...` : text;
}

function convertLinkTarget(target) {
  if (
    /^(https?:|mailto:|tel:|#)/i.test(target) ||
    target.startsWith("javascript:")
  ) {
    return target;
  }

  const [pathname, hash = ""] = target.split("#");
  const htmlPath = pathname.endsWith(".md")
    ? pathname.replace(/\.md$/i, ".html")
    : pathname;

  return hash ? `${htmlPath}#${hash}` : htmlPath;
}

function renderLink(label, target) {
  return `<a href="${escapeAttribute(convertLinkTarget(target))}">${renderInline(
    label,
    { allowLinks: false },
  )}</a>`;
}

function renderInline(text, options = {}) {
  const stash = [];
  const token = (html) => {
    const key = `\u0000${stash.length}\u0000`;
    stash.push(html);
    return key;
  };

  let output = text;

  output = output.replace(/<br\s*\/?>/gi, () => token("<br>"));

  if (options.allowLinks !== false) {
    output = output.replace(
      /\[\[([^\]]+)\]\(([^)]+)\)\]/g,
      (_, label, target) => token(renderLink(label, target)),
    );

    output = output.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, label, target) => token(renderLink(label, target)),
    );
  }

  output = output.replace(/`([^`]+)`/g, (_, code) =>
    token(`<code>${escapeHtml(code)}</code>`),
  );

  output = escapeHtml(output);

  output = output
    .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/_([^_\n]+)_/g, "<em>$1</em>");

  return output.replace(/\u0000(\d+)\u0000/g, (_, index) => stash[Number(index)]);
}

function renderCodeBlock(lines, language) {
  const langClass = language ? ` language-${escapeAttribute(language)}` : "";
  return `<pre class="note-code"><code class="${langClass.trim()}">${escapeHtml(
    lines.join("\n"),
  )}</code></pre>`;
}

function renderHeading(level, text) {
  const clean = stripMarkdown(text);
  return `<h${level}>${renderInline(clean, {
    allowLinks: false,
  })}</h${level}>`;
}

function parseBlocks(lines, startIndex = 0) {
  const html = [];
  let index = startIndex;

  const isBlank = (line) => !line.trim();
  const isFence = (line) => line.trimStart().startsWith("```");
  const isBlockquote = (line) => line.trimStart().startsWith(">");
  const isOrderedList = (line) => /^\s*\d+\.\s+/.test(line);
  const isUnorderedList = (line) => /^\s*[-*]\s+/.test(line);
  const isHtmlHeading = (line) =>
    /^>\s*<h[1-6][^>]*>/i.test(line.trimStart()) ||
    /^<h[1-6][^>]*>/i.test(line.trimStart());
  const isMarkdownHeading = (line) => /^>?\s*#{1,6}\s+/.test(line.trimStart());
  const isRule = (line) => /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line);

  while (index < lines.length) {
    const rawLine = lines[index];

    if (isBlank(rawLine)) {
      index += 1;
      continue;
    }

    if (isFence(rawLine)) {
      const language = rawLine.trim().slice(3).trim();
      const codeLines = [];
      index += 1;

      while (index < lines.length && !isFence(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      html.push(renderCodeBlock(codeLines, language));
      continue;
    }

    if (isHtmlHeading(rawLine)) {
      const normalized = rawLine.replace(/^>\s?/, "").trim();
      const match = normalized.match(/^<h([1-6])[^>]*>(.*)$/i);
      if (match) {
        html.push(renderHeading(match[1], match[2]));
        index += 1;
        continue;
      }
    }

    if (isMarkdownHeading(rawLine)) {
      const normalized = rawLine.replace(/^>\s?/, "").trim();
      const match = normalized.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        html.push(renderHeading(match[1].length, match[2]));
        index += 1;
        continue;
      }
    }

    if (isBlockquote(rawLine)) {
      const quoteLines = [];

      while (index < lines.length && isBlockquote(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }

      const { html: quoteHtml } = parseBlocks(quoteLines, 0);
      html.push(`<blockquote class="note-quote">${quoteHtml}</blockquote>`);
      continue;
    }

    if (isOrderedList(rawLine) || isUnorderedList(rawLine)) {
      const listType = isOrderedList(rawLine) ? "ol" : "ul";
      const matcher = listType === "ol" ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*]\s+(.*)$/;
      const items = [];

      while (
        index < lines.length &&
        !isBlank(lines[index]) &&
        ((listType === "ol" && isOrderedList(lines[index])) ||
          (listType === "ul" && isUnorderedList(lines[index])))
      ) {
        const match = lines[index].match(matcher);
        if (match) {
          items.push(`<li>${renderInline(match[1])}</li>`);
        }
        index += 1;
      }

      html.push(`<${listType}>${items.join("")}</${listType}>`);
      continue;
    }

    if (isRule(rawLine)) {
      html.push('<hr class="note-rule">');
      index += 1;
      continue;
    }

    const paragraphLines = [];

    while (index < lines.length) {
      const line = lines[index];
      if (
        isBlank(line) ||
        isFence(line) ||
        isBlockquote(line) ||
        isOrderedList(line) ||
        isUnorderedList(line) ||
        isHtmlHeading(line) ||
        isMarkdownHeading(line) ||
        isRule(line)
      ) {
        break;
      }

      paragraphLines.push(line);
      index += 1;
    }

    const paragraphText = renderInline(paragraphLines.join("\n")).replace(
      /\n/g,
      "<br>\n",
    );

    html.push(`<p>${paragraphText}</p>`);
  }

  return { html: html.join("\n"), index };
}

function renderMarkdown(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  return parseBlocks(normalized.split("\n")).html;
}

function lessonDisplayName(lessonFolderName) {
  const number = lessonFolderName.match(/\d+/)?.[0];
  return number ? `Lesson ${number}` : lessonFolderName;
}

function getSitePaths(depthToSiteRoot) {
  const toSiteRoot = depthToSiteRoot === 0 ? "" : "../".repeat(depthToSiteRoot);

  return {
    toSiteRoot,
    styles: `${toSiteRoot}assets/css/styles.css`,
    appScript: `${toSiteRoot}assets/js/app.js`,
    fonts: `${toSiteRoot}../libraries/google_fonts.css`,
    icons: `${toSiteRoot}../libraries/material_symbols.css`,
    gsap: `${toSiteRoot}../libraries/gsap.min.js`,
  };
}

function renderSidebar(lesson, activeSlug) {
  return `
    <div class="offcanvas-lg offcanvas-start sidebar-shell" tabindex="-1" id="lessonSidebar" aria-labelledby="lessonSidebarLabel">
      <div class="offcanvas-header border-0 pb-0 d-lg-none">
        <div>
          <p class="sidebar-kicker mb-1">Topics</p>
          <h2 class="offcanvas-title h5 mb-0" id="lessonSidebarLabel">${lesson.displayName}</h2>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#lessonSidebar" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body p-0">
        <div class="sidebar-panel">
          <a class="sidebar-home" href="../index.html">
            <span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
            All lessons
          </a>
          <div class="sidebar-header">
            <p class="sidebar-kicker">${lesson.displayName}</p>
            <h2 class="sidebar-title">${lesson.title}</h2>
            <p class="sidebar-copy">${lesson.topicCount} topic${lesson.topicCount === 1 ? "" : "s"} converted from markdown.</p>
          </div>
          <nav class="topic-nav" aria-label="${lesson.displayName} topics">
            <a class="sidebar-link ${activeSlug === "__overview__" ? "is-active" : ""}" href="index.html">
              <span class="material-symbols-rounded" aria-hidden="true">dashboard</span>
              Lesson overview
            </a>
            ${lesson.topics
              .map(
                (topic) => `
                  <a class="sidebar-link ${
                    activeSlug === topic.slug ? "is-active" : ""
                  }" href="${topic.htmlFileName}">
                    <span class="material-symbols-rounded" aria-hidden="true">article</span>
                    <span>${escapeHtml(topic.title)}</span>
                  </a>
                `,
              )
              .join("")}
          </nav>
        </div>
      </div>
    </div>
  `;
}

function renderPageShell({
  title,
  bodyClass = "",
  depthToSiteRoot,
  sidebar = "",
  mainContent,
}) {
  const paths = getSitePaths(depthToSiteRoot);
  const homeLink = `${paths.toSiteRoot}index.html`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${paths.fonts}">
    <link rel="stylesheet" href="${paths.icons}">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="${paths.styles}">
  </head>
  <body class="${bodyClass}">
    <div class="page-backdrop" aria-hidden="true">
      <div class="backdrop-orb backdrop-orb-one"></div>
      <div class="backdrop-orb backdrop-orb-two"></div>
    </div>
    <div class="site-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <div class="topbar-brand">
            <a class="brand-mark" href="${homeLink}">JS Notes Live</a>
            <p class="brand-copy">Responsive lesson notes built from your markdown files.</p>
          </div>
          <div class="topbar-actions">
            ${
              sidebar
                ? `<button class="icon-action d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#lessonSidebar" aria-controls="lessonSidebar" aria-label="Open lesson topics">
                    <span class="material-symbols-rounded" aria-hidden="true">menu</span>
                  </button>`
                : ""
            }
            <button class="icon-action" type="button" data-theme-toggle aria-label="Toggle color theme">
              <span class="material-symbols-rounded" data-theme-icon aria-hidden="true">dark_mode</span>
            </button>
          </div>
        </div>
      </header>
      <div class="content-shell ${sidebar ? "content-shell-with-sidebar" : "content-shell-full"}">
        ${
          sidebar
            ? `<aside class="sidebar-column">${sidebar}</aside>
               <main class="main-column">${mainContent}</main>`
            : `<main class="main-column main-column-full">${mainContent}</main>`
        }
      </div>
    </div>
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script defer src="${paths.gsap}"></script>
    <script defer src="${paths.appScript}"></script>
  </body>
</html>`;
}

function renderLessonIndexPage(lesson) {
  const sidebar = renderSidebar(lesson, "__overview__");

  const topicCards = lesson.topics
    .map(
      (topic) => `
        <article class="topic-card reveal-card">
          <div class="topic-card-meta">
            <span class="topic-badge">Topic</span>
            <span class="topic-file">${escapeHtml(topic.fileName)}</span>
          </div>
          <h3 class="topic-card-title">${escapeHtml(topic.title)}</h3>
          <p class="topic-card-copy">${escapeHtml(topic.excerpt || "Open this note to read the full converted content.")}</p>
          <a class="topic-card-link" href="${topic.htmlFileName}">
            Open topic
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </a>
        </article>
      `,
    )
    .join("");

  const mainContent = `
    <section class="hero-panel reveal-card">
      <p class="hero-kicker">${lesson.displayName}</p>
      <h1 class="hero-title">${escapeHtml(lesson.title)}</h1>
      <p class="hero-copy">Every topic below is converted from the original markdown without changing the note text.</p>
      <div class="hero-stats">
        <div class="stat-pill">
          <span class="material-symbols-rounded" aria-hidden="true">library_books</span>
          ${lesson.topicCount} topics
        </div>
        <div class="stat-pill">
          <span class="material-symbols-rounded" aria-hidden="true">folder</span>
          notes.md/${lesson.folderName}
        </div>
      </div>
    </section>
    <section class="topics-grid">
      ${topicCards}
    </section>
  `;

  return renderPageShell({
    title: `${lesson.displayName} | JS Notes Live`,
    bodyClass: "lesson-page",
    depthToSiteRoot: 1,
    sidebar,
    mainContent,
  });
}

function renderTopicPage(lesson, topic, previousTopic, nextTopic) {
  const sidebar = renderSidebar(lesson, topic.slug);

  const pagerItems = [
    previousTopic
      ? `<a class="pager-link" href="${previousTopic.htmlFileName}">
           <span class="material-symbols-rounded" aria-hidden="true">west</span>
           <span>
             <small>Previous</small>
             ${escapeHtml(previousTopic.title)}
           </span>
         </a>`
      : `<span class="pager-link pager-link-disabled">
           <span class="material-symbols-rounded" aria-hidden="true">west</span>
           <span>
             <small>Previous</small>
             Start of lesson
           </span>
         </span>`,
    nextTopic
      ? `<a class="pager-link" href="${nextTopic.htmlFileName}">
           <span>
             <small>Next</small>
             ${escapeHtml(nextTopic.title)}
           </span>
           <span class="material-symbols-rounded" aria-hidden="true">east</span>
         </a>`
      : `<span class="pager-link pager-link-disabled">
           <span>
             <small>Next</small>
             End of lesson
           </span>
           <span class="material-symbols-rounded" aria-hidden="true">east</span>
         </span>`,
  ].join("");

  const mainContent = `
    <section class="topic-meta-strip reveal-card">
      <a class="crumb-link" href="../index.html">All lessons</a>
      <span class="crumb-sep">/</span>
      <a class="crumb-link" href="index.html">${lesson.displayName}</a>
      <span class="crumb-sep">/</span>
      <span class="crumb-current">${escapeHtml(topic.fileName)}</span>
    </section>
    <article class="note-card reveal-card">
      <div class="note-source">
        <span class="material-symbols-rounded" aria-hidden="true">description</span>
        notes.md/${lesson.folderName}/${topic.fileName}
      </div>
      <div class="note-prose">
        ${topic.renderedHtml}
      </div>
    </article>
    <nav class="topic-pager">
      ${pagerItems}
    </nav>
  `;

  return renderPageShell({
    title: `${topic.title} | ${lesson.displayName} | JS Notes Live`,
    bodyClass: "topic-page",
    depthToSiteRoot: 1,
    sidebar,
    mainContent,
  });
}

function renderHomePage(lessons) {
  const totalTopics = lessons.reduce((sum, lesson) => sum + lesson.topicCount, 0);

  const lessonCards = lessons
    .map(
      (lesson) => `
        <article class="lesson-card reveal-card">
          <div class="lesson-card-top">
            <p class="lesson-kicker">${lesson.displayName}</p>
            <span class="lesson-count">${lesson.topicCount} topics</span>
          </div>
          <h2 class="lesson-card-title">${escapeHtml(lesson.title)}</h2>
          <p class="lesson-card-copy">${escapeHtml(
            lesson.topics
              .slice(0, 4)
              .map((topic) => topic.title)
              .join(" • "),
          )}</p>
          <div class="lesson-card-actions">
            <a class="primary-link" href="${lesson.folderName}/index.html">
              Open lesson
              <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
        </article>
      `,
    )
    .join("");

  const mainContent = `
    <section class="landing-hero reveal-card">
      <p class="hero-kicker">Notes Live</p>
      <h1 class="hero-title">Your markdown notes, turned into a mobile-first lesson site.</h1>
      <p class="hero-copy">Bootstrap handles the responsive structure, the lesson sidebar stays collapsible on small screens, and light GSAP motion keeps the experience polished without getting in the way.</p>
      <div class="hero-stats">
        <div class="stat-pill">
          <span class="material-symbols-rounded" aria-hidden="true">folder_copy</span>
          ${lessons.length} lessons
        </div>
        <div class="stat-pill">
          <span class="material-symbols-rounded" aria-hidden="true">article</span>
          ${totalTopics} topics
        </div>
        <div class="stat-pill">
          <span class="material-symbols-rounded" aria-hidden="true">draw</span>
          Source stays in notes.md
        </div>
      </div>
    </section>
    <section class="lessons-grid">
      ${lessonCards}
    </section>
  `;

  return renderPageShell({
    title: "JS Notes Live",
    bodyClass: "home-page",
    depthToSiteRoot: 0,
    mainContent,
  });
}

function readLessons() {
  return fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => collator.compare(left.name, right.name))
    .map((lessonEntry) => {
      const lessonFolderPath = path.join(sourceRoot, lessonEntry.name);

      const topics = fs
        .readdirSync(lessonFolderPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
        .sort((left, right) => collator.compare(left.name, right.name))
        .map((fileEntry) => {
          const sourceFilePath = path.join(lessonFolderPath, fileEntry.name);
          const rawMarkdown = fs.readFileSync(sourceFilePath, "utf8");
          const slug = fileEntry.name.replace(/\.md$/i, "");
          const fallbackTitle = humanizeSlug(slug);
          const title = extractTitle(rawMarkdown, fallbackTitle);

          return {
            slug,
            fileName: fileEntry.name,
            sourceFilePath,
            title,
            excerpt: extractExcerpt(rawMarkdown),
            rawMarkdown,
            renderedHtml: renderMarkdown(rawMarkdown),
            htmlFileName: `${slug}.html`,
          };
        });

      return {
        folderName: lessonEntry.name,
        sourceFolderPath: lessonFolderPath,
        displayName: lessonDisplayName(lessonEntry.name),
        title: topics[0]?.title
          ? `${lessonDisplayName(lessonEntry.name)} Notes`
          : lessonDisplayName(lessonEntry.name),
        topicCount: topics.length,
        topics,
      };
    });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function build() {
  ensureDir(outputRoot);

  const lessons = readLessons();

  writeFile(path.join(outputRoot, "index.html"), renderHomePage(lessons));

  for (const lesson of lessons) {
    const lessonOutputDir = path.join(outputRoot, lesson.folderName);
    ensureDir(lessonOutputDir);

    writeFile(path.join(lessonOutputDir, "index.html"), renderLessonIndexPage(lesson));

    lesson.topics.forEach((topic, index) => {
      const previousTopic = lesson.topics[index - 1] ?? null;
      const nextTopic = lesson.topics[index + 1] ?? null;
      writeFile(
        path.join(lessonOutputDir, topic.htmlFileName),
        renderTopicPage(lesson, topic, previousTopic, nextTopic),
      );
    });
  }

  console.log(
    `Generated notes.live with ${lessons.length} lessons and ${lessons.reduce(
      (sum, lesson) => sum + lesson.topicCount,
      0,
    )} topics.`,
  );
}

build();
