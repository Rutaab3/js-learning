[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceLandingPath = Join-Path $projectRoot 'index.html'
$sourceNotesRoot = Join-Path $projectRoot 'notes'
$outputRoot = Join-Path $projectRoot 'NOTES'

$lessonConfigs = @{
    lesson1 = @{
        Number = 1
        Title = 'Variables and Scope'
        Description = 'Foundational rules for declarations, hoisting, the temporal dead zone, and the scoping rules that make beginner code click.'
        HeroTitle = 'Variables, scope, and declarations without the guesswork.'
        HeroCopy = 'Use one focused lesson to revisit `var`, `let`, `const`, hoisting, the temporal dead zone, and scope behavior with the original note wording preserved.'
        Order = @('variable', 'reassign-redeclare', 'hosting', 'tdz', 'scopes')
    }
    lesson2 = @{
        Number = 2
        Title = 'Types and JS Behavior'
        Description = 'A lesson focused on values, dynamic typing, truthy and falsy checks, type coercion, and the quirks that make JavaScript feel surprising.'
        HeroTitle = 'Types, coercion, and JavaScript quirks in one responsive lesson hub.'
        HeroCopy = 'Open the exact note content for data types, dynamic typing, truthy and falsy values, type coercion, and the unusual outputs that are worth memorizing.'
        Order = @('datatypes', 'dynamic-typing', 'typeof-operator', 'truthy-and-falsy-values', 'type-coercion', 'quirks-in-js')
    }
    lesson3 = @{
        Number = 3
        Title = 'Operators'
        Description = 'Expressions, comparisons, logical rules, unary behavior, and operator patterns collected into a lesson with quick navigation between every topic.'
        HeroTitle = 'Operator notes that stay structured from overview to deep dive.'
        HeroCopy = 'Jump between arithmetic, assignment, comparison, logical, unary, ternary, `typeof`, and `instanceof` topics while keeping the original source wording intact.'
        Order = @('operators', 'arithmetic', 'assignment', 'comparison', 'logical', 'unary', 'ternary', 'typeof', 'instanceof')
    }
}

function Escape-Html {
    param([AllowNull()][string]$Value)

    if ($null -eq $Value) {
        return ''
    }

    return [System.Net.WebUtility]::HtmlEncode($Value)
}

function ConvertTo-Base64Utf8 {
    param([AllowNull()][string]$Value)

    if ($null -eq $Value) {
        $Value = ''
    }

    return [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($Value))
}

function ConvertTo-HtmlSafeJson {
    param([Parameter(Mandatory)][object]$Value)

    $json = $Value | ConvertTo-Json -Depth 12 -Compress
    $json = $json.Replace('<', '\u003c').Replace('>', '\u003e').Replace('&', '\u0026')
    return $json
}

function Apply-Replacements {
    param(
        [Parameter(Mandatory)][string]$Template,
        [Parameter(Mandatory)][hashtable]$Values
    )

    $result = $Template
    foreach ($key in $Values.Keys) {
        $result = $result.Replace("{{${key}}}", [string]$Values[$key])
    }

    return $result
}

function Get-TitleFromSlug {
    param([Parameter(Mandatory)][string]$Slug)

    $specialWords = @{
        js = 'JS'
        tdz = 'TDZ'
        typeof = 'typeof'
        instanceof = 'instanceof'
    }

    $parts = $Slug -split '-'
    $words = foreach ($part in $parts) {
        $lower = $part.ToLowerInvariant()
        if ($specialWords.ContainsKey($lower)) {
            $specialWords[$lower]
            continue
        }

        $culture = [System.Globalization.CultureInfo]::InvariantCulture
        $culture.TextInfo.ToTitleCase($lower)
    }

    return ($words -join ' ')
}

function Get-HeadingText {
    param(
        [AllowNull()][string]$Line,
        [Parameter(Mandatory)][string]$Fallback
    )

    if ([string]::IsNullOrWhiteSpace($Line)) {
        return $Fallback
    }

    $text = $Line -replace '^\s*>\s*', ''
    $text = $text -replace '^\s*#+\s*', ''
    $text = $text -replace '<br\s*/?>', ' '
    $text = $text -replace '<[^>]+>', ' '
    $text = $text -replace '[*_`]', ''
    $text = [System.Net.WebUtility]::HtmlDecode($text)
    $text = $text -replace '\s+', ' '
    $text = $text.Trim(" `t:-")

    if ([string]::IsNullOrWhiteSpace($text)) {
        return $Fallback
    }

    return $text
}

function Get-FirstHeading {
    param(
        [Parameter(Mandatory)][string]$Content,
        [Parameter(Mandatory)][string]$Fallback
    )

    $lines = $Content -split "`r?`n"
    foreach ($line in $lines) {
        if ($line -match '^\s*>?\s*<h1\b' -or $line -match '^\s*#\s+') {
            return Get-HeadingText -Line $line -Fallback $Fallback
        }
    }

    return $Fallback
}

function Get-PlainTextLine {
    param([AllowNull()][string]$Line)

    if ([string]::IsNullOrWhiteSpace($Line)) {
        return ''
    }

    $text = $Line -replace '^\s*>\s*', ''
    $text = $text -replace '^\s*[-*+]\s*', ''
    $text = $text -replace '^\s*\d+\.\s*', ''
    $text = $text -replace '<br\s*/?>', ' '
    $text = [regex]::Replace($text, '!\[([^\]]*)\]\(([^)]+)\)', '$1')
    $text = [regex]::Replace($text, '\[\[([^\]]+)\]\(([^)]+)\)\]', '$1')
    $text = [regex]::Replace($text, '\[([^\]]+)\]\(([^)]+)\)', '$1')
    $text = $text -replace '<[^>]+>', ' '
    $text = $text -replace '[*_`#|]', ' '
    $text = [System.Net.WebUtility]::HtmlDecode($text)
    $text = $text -replace '\s+', ' '
    return $text.Trim()
}

function Get-Excerpt {
    param(
        [Parameter(Mandatory)][string]$Content,
        [Parameter(Mandatory)][string]$Fallback
    )

    $inFence = $false
    $buffer = New-Object System.Collections.Generic.List[string]

    foreach ($line in ($Content -split "`r?`n")) {
        if ($line -match '^\s*```+') {
            $inFence = -not $inFence
            continue
        }

        if ($inFence) {
            continue
        }

        if ($line -match '^\s*\|') {
            continue
        }

        $plain = Get-PlainTextLine -Line $line
        if ([string]::IsNullOrWhiteSpace($plain)) {
            continue
        }

        if ($plain -eq $Fallback) {
            continue
        }

        $buffer.Add($plain)
        $joined = ($buffer -join ' ')
        if ($joined.Length -ge 150) {
            break
        }
    }

    if ($buffer.Count -eq 0) {
        return $Fallback
    }

    $excerpt = ($buffer -join ' ')
    if ($excerpt.Length -gt 170) {
        $excerpt = $excerpt.Substring(0, 167).TrimEnd() + '...'
    }

    return $excerpt
}

function Resolve-TopicLink {
    param(
        [Parameter(Mandatory)][string]$Link,
        [Parameter(Mandatory)][hashtable]$SlugLookup
    )

    $trimmed = $Link.Trim()
    $anchor = ''
    $query = ''

    if ($trimmed -match '#') {
        $hashIndex = $trimmed.IndexOf('#')
        $anchor = $trimmed.Substring($hashIndex)
        $trimmed = $trimmed.Substring(0, $hashIndex)
    }

    if ($trimmed -match '\?') {
        $queryIndex = $trimmed.IndexOf('?')
        $query = $trimmed.Substring($queryIndex)
        $trimmed = $trimmed.Substring(0, $queryIndex)
    }

    $fileName = [System.IO.Path]::GetFileName($trimmed)
    $lookupKey = $fileName.ToLowerInvariant()
    if ($SlugLookup.ContainsKey($lookupKey)) {
        return ($SlugLookup[$lookupKey] + $query + $anchor)
    }

    if ($trimmed -match '\.md$') {
        $trimmed = [System.IO.Path]::GetFileNameWithoutExtension($trimmed) + '.html'
    }

    return ($trimmed + $query + $anchor)
}

function Normalize-MarkdownContent {
    param(
        [Parameter(Mandatory)][string]$Content,
        [Parameter(Mandatory)][hashtable]$SlugLookup
    )

    $normalized = $Content -replace "`r`n?", "`n"

    $normalized = [regex]::Replace(
        $normalized,
        '\[\[([^\]]+)\]\(([^)]+?\.md(?:[#?][^)]+)?)\)\]',
        {
            param($match)
            $label = $match.Groups[1].Value
            $resolved = Resolve-TopicLink -Link $match.Groups[2].Value -SlugLookup $SlugLookup
            return "[$label]($resolved)"
        }
    )

    $normalized = [regex]::Replace(
        $normalized,
        '(?<!\!)\[([^\]]+)\]\(([^)]+?\.md(?:[#?][^)]+)?)\)',
        {
            param($match)
            $label = $match.Groups[1].Value
            $resolved = Resolve-TopicLink -Link $match.Groups[2].Value -SlugLookup $SlugLookup
            return "[$label]($resolved)"
        }
    )

    $lines = $normalized -split "`n"
    $repairedLines = New-Object System.Collections.Generic.List[string]

    foreach ($line in $lines) {
        if ($line -match '^\s*````+\s*$') {
            $repairedLines.Add('```')
            continue
        }

        $repairedLines.Add($line)
    }

    return ($repairedLines -join "`n").Trim()
}

function Get-SortedTopics {
    param(
        [Parameter(Mandatory)][object[]]$Topics,
        [Parameter(Mandatory)][string[]]$PreferredOrder
    )

    $orderLookup = @{}
    for ($index = 0; $index -lt $PreferredOrder.Count; $index++) {
        $orderLookup[$PreferredOrder[$index]] = $index
    }

    return $Topics |
        Sort-Object @{
            Expression = {
                if ($orderLookup.ContainsKey($_.Slug)) {
                    return $orderLookup[$_.Slug]
                }

                return 1000
            }
        }, @{
            Expression = { $_.Slug }
        }
}

function Write-GeneratedFile {
    param(
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][string]$Content
    )

    $directory = Split-Path -Parent $Path
    if (-not (Test-Path -LiteralPath $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8
}

function Get-TrackedNoteFiles {
    param([Parameter(Mandatory)][string]$TrackedFolder)

    $repoPaths = & git ls-tree -r --name-only HEAD $TrackedFolder
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to list tracked note files for $TrackedFolder"
    }

    $files = foreach ($repoPath in $repoPaths) {
        if ([string]::IsNullOrWhiteSpace($repoPath) -or -not $repoPath.EndsWith('.md')) {
            continue
        }

        $fullPath = Join-Path $projectRoot ($repoPath -replace '/', '\')
        [pscustomobject]@{
            RepoPath = $repoPath
            FullName = $fullPath
            Name = [System.IO.Path]::GetFileName($repoPath)
        }
    }

    return @($files | Sort-Object Name)
}

function Get-NoteContent {
    param([Parameter(Mandatory)][pscustomobject]$NoteFile)

    if (Test-Path -LiteralPath $NoteFile.FullName) {
        return Get-Content -LiteralPath $NoteFile.FullName -Raw
    }

    $rawLines = & git show "HEAD:$($NoteFile.RepoPath)"
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read tracked note content for $($NoteFile.RepoPath)"
    }

    return ($rawLines -join "`n")
}

function Get-TemplateFragments {
    param([Parameter(Mandatory)][string]$LandingHtml)

    $decorativeBlock = ''
    $decorativeMatch = [regex]::Match($LandingHtml, '(?s)(<div>\s*<center>.*?</div>)\s*<!-- Required MD3 Footer')
    if ($decorativeMatch.Success) {
        $decorativeBlock = $decorativeMatch.Groups[1].Value
    }

    $footerBlock = @'
    <!-- Required MD3 Footer matching Google specs -->
    <footer>
        <span>Made by <a href="https://github.com/Rutaab3" target="_blank">Rutaab3</a></span>
    </footer>
'@

    $footerMatch = [regex]::Match($LandingHtml, '(?s)(<!-- Required MD3 Footer matching Google specs -->\s*<footer>.*?</footer>)')
    if ($footerMatch.Success) {
        $footerBlock = $footerMatch.Groups[1].Value
    }

    return @{
        DecorativeBlock = $decorativeBlock
        FooterBlock = $footerBlock
    }
}

function Get-SharedPageHtml {
    param(
        [Parameter(Mandatory)][string]$PageTitle,
        [Parameter(Mandatory)][string]$MetaDescription,
        [Parameter(Mandatory)][string]$RelativePrefix,
        [Parameter(Mandatory)][string]$NotesHomeHref,
        [Parameter(Mandatory)][string]$HeroEyebrow,
        [Parameter(Mandatory)][string]$HeroTitle,
        [Parameter(Mandatory)][string]$HeroCopy,
        [Parameter(Mandatory)][string]$HeroActions,
        [Parameter(Mandatory)][string]$HeroMetrics,
        [Parameter(Mandatory)][string]$MainContent,
        [Parameter(Mandatory)][string]$DecorativeBlock,
        [Parameter(Mandatory)][string]$FooterBlock,
        [Parameter(Mandatory)][string]$PageType,
        [Parameter(Mandatory)][string]$LessonKey,
        [Parameter(Mandatory)][AllowEmptyString()][string]$CurrentSlug,
        [Parameter(Mandatory)][string]$BodyClass,
        [Parameter(Mandatory)][string]$ExtraScripts
    )

    $template = @'
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{PAGE_TITLE}}</title>
    <meta name="description" content="{{META_DESCRIPTION}}">
    <link rel="shortcut icon" href="{{RELATIVE_PREFIX}}images/logo.ico" type="image/x-icon" sizes="36x36">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link href="{{RELATIVE_PREFIX}}libraries/google_fonts.css" rel="stylesheet">
    <link href="{{RELATIVE_PREFIX}}libraries/material_symbols.css" rel="stylesheet">
    <link rel="stylesheet" href="{{RELATIVE_PREFIX}}assets/style.css">
</head>
<body class="{{BODY_CLASS}}" data-page-type="{{PAGE_TYPE}}" data-lesson-key="{{LESSON_KEY}}" data-current-slug="{{CURRENT_SLUG}}">
    <div id="smooth-wrapper">
        <div id="smooth-content">
            <div class="page-shell">
                <nav class="project-nav reveal-up">
                    <a class="navbar-brand" href="{{NOTES_HOME_HREF}}" aria-label="JS Learning Notes home">
                        <img src="{{RELATIVE_PREFIX}}images/logo.webp" alt="JS Learning Notes logo" class="brand-logo"
                            onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'36\' height=\'36\'><circle cx=\'18\' cy=\'18\' r=\'18\' fill=\'%231A73E8\'/></svg>'">
                        <span>JS Learning Notes</span>
                    </a>
                    <button id="themeToggle" class="theme-toggle" type="button" aria-label="Toggle color theme">
                        <span id="themeIcon" class="material-symbols-rounded">light_mode</span>
                    </button>
                </nav>

                <header class="hero-section" id="top">
                    <div class="hero-bg">
                        <img src="{{RELATIVE_PREFIX}}images/hero.webp" alt="JavaScript learning illustration">
                        <div class="hero-overlay"></div>
                    </div>

                    <div class="container hero-content-wrapper hero__title-wrapper" style="position: relative; z-index: 2;">
                        <div style="max-width: 860px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center;">
                            <div class="eyebrow reveal-up">{{HERO_EYEBROW}}</div>
                            <h1 class="hero-title hero__title reveal-up">{{HERO_TITLE}}</h1>

                            <div class="hero-dots reveal-up" aria-hidden="true" style="justify-content: center;">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <p class="hero-copy reveal-up" style="margin-left: auto; margin-right: auto;">
                                {{HERO_COPY}}
                            </p>

                            <div class="hero-actions reveal-up" style="justify-content: center;">
                                {{HERO_ACTIONS}}
                            </div>

                            <div class="layout-grid reveal-up" style="margin-top: 16px; width: 100%;">
                                {{HERO_METRICS}}
                            </div>
                        </div>
                    </div>
                </header>

                <main class="notes-main">
{{MAIN_CONTENT}}
                </main>
            </div>
        </div>
    </div>

{{DECORATIVE_BLOCK}}

{{FOOTER_BLOCK}}

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{RELATIVE_PREFIX}}assets/logic.js"></script>
{{EXTRA_SCRIPTS}}
</body>
</html>
'@

    return Apply-Replacements -Template $template -Values @{
        PAGE_TITLE = Escape-Html $PageTitle
        META_DESCRIPTION = Escape-Html $MetaDescription
        RELATIVE_PREFIX = $RelativePrefix
        NOTES_HOME_HREF = $NotesHomeHref
        HERO_EYEBROW = Escape-Html $HeroEyebrow
        HERO_TITLE = Escape-Html $HeroTitle
        HERO_COPY = Escape-Html $HeroCopy
        HERO_ACTIONS = $HeroActions
        HERO_METRICS = $HeroMetrics
        MAIN_CONTENT = $MainContent
        DECORATIVE_BLOCK = $DecorativeBlock
        FOOTER_BLOCK = $FooterBlock
        PAGE_TYPE = Escape-Html $PageType
        LESSON_KEY = Escape-Html $LessonKey
        CURRENT_SLUG = Escape-Html $CurrentSlug
        BODY_CLASS = Escape-Html $BodyClass
        EXTRA_SCRIPTS = $ExtraScripts
    }
}

function Get-HeroMetricCardHtml {
    param(
        [Parameter(Mandatory)][string]$Value,
        [Parameter(Mandatory)][string]$Label
    )

    $template = @'
<div class="grid-third">
    <div class="metric-card">
        <strong>{{VALUE}}</strong>
        <span>{{LABEL}}</span>
    </div>
</div>
'@

    return Apply-Replacements -Template $template -Values @{
        VALUE = Escape-Html $Value
        LABEL = Escape-Html $Label
    }
}

function Get-LessonSidebarData {
    param(
        [Parameter(Mandatory)][hashtable]$LessonConfig,
        [Parameter(Mandatory)][object[]]$Topics
    )

    $topicItems = foreach ($topic in $Topics) {
        @{
            slug = $topic.Slug
            title = $topic.Title
            href = $topic.RelativeTopicHref
        }
    }

    return @{
        lessonKey = $LessonConfig.Key
        lessonNumber = $LessonConfig.Number
        lessonTitle = $LessonConfig.Title
        notesHomeHref = '../index.html'
        lessonIndexHref = 'index.html'
        topicCount = $Topics.Count
        topics = $topicItems
    }
}

function Get-LessonCardsHtml {
    param([Parameter(Mandatory)][object[]]$Topics)

    $cards = New-Object System.Collections.Generic.List[string]
    $delay = 50

    foreach ($topic in $Topics) {
        $card = @'
<div class="col-12 col-md-6">
    <article class="lesson-card topic-card reveal-up" style="animation-delay: {{DELAY}}ms;">
        <div class="lesson-badge">Topic {{POSITION}}</div>
        <h3>{{TITLE}}</h3>
        <p>{{EXCERPT}}</p>
        <ul class="lesson-list">
            <li>Source: {{SOURCE_FILE}}</li>
            <li>HTML page: {{OUTPUT_FILE}}</li>
        </ul>
        <div class="topic-card-actions">
            <a href="{{TOPIC_HREF}}" class="btn btn-tonal">
                Open Topic
                <span class="material-symbols-rounded icon-sm">arrow_forward</span>
            </a>
        </div>
    </article>
</div>
'@

        $cards.Add(
            (Apply-Replacements -Template $card -Values @{
                DELAY = [string]$delay
                POSITION = [string]$topic.Position
                TITLE = Escape-Html $topic.Title
                EXCERPT = Escape-Html $topic.Excerpt
                SOURCE_FILE = Escape-Html $topic.SourceFileName
                OUTPUT_FILE = Escape-Html $topic.OutputFileName
                TOPIC_HREF = $topic.RelativeTopicHref
            })
        )

        $delay += 75
    }

    return ($cards -join "`n")
}

function Get-LessonPageHtml {
    param(
        [Parameter(Mandatory)][hashtable]$LessonConfig,
        [Parameter(Mandatory)][object[]]$Topics,
        [Parameter(Mandatory)][string]$DecorativeBlock,
        [Parameter(Mandatory)][string]$FooterBlock
    )

    $heroActions = @'
<a href="{{FIRST_TOPIC_HREF}}" class="btn btn-ext-fab">
    Open First Topic
    <span class="material-symbols-rounded icon-sm">arrow_forward</span>
</a>
<a href="../index.html" class="btn btn-outline">Back to NOTES Home</a>
'@
    $heroActions = Apply-Replacements -Template $heroActions -Values @{
        FIRST_TOPIC_HREF = $Topics[0].RelativeTopicHref
    }

    $heroMetrics = @(
        Get-HeroMetricCardHtml -Value ([string]$LessonConfig.Number) -Label 'Lesson number'
        Get-HeroMetricCardHtml -Value ([string]$Topics.Count) -Label 'Topics available'
        Get-HeroMetricCardHtml -Value '100%' -Label 'Original note wording'
    ) -join "`n"

    $sidebarDataJson = ConvertTo-HtmlSafeJson (Get-LessonSidebarData -LessonConfig $LessonConfig -Topics $Topics)
    $topicCardsHtml = Get-LessonCardsHtml -Topics $Topics

    $mainContent = @'
                    <section class="section-space" id="lesson-overview">
                        <div class="container">
                            <div class="section-head text-center reveal-up">
                                <span class="section-kicker">Lesson Dashboard</span>
                                <h2>{{SECTION_TITLE}}</h2>
                                <p>{{SECTION_COPY}}</p>
                                <div class="linear-progress" aria-hidden="true"></div>
                            </div>

                            <div class="notes-mobile-toolbar d-lg-none reveal-up">
                                <button class="btn btn-tonal notes-mobile-sidebar-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#notesSidebar" aria-controls="notesSidebar">
                                    Browse Lesson Topics
                                    <span class="material-symbols-rounded icon-sm">menu</span>
                                </button>
                            </div>

                            <div class="row g-4 notes-layout">
                                <div class="col-12 col-lg-4 col-xl-3 d-none d-lg-block">
                                    <div class="notes-sidebar-host reveal-up" data-sidebar-desktop></div>
                                </div>
                                <div class="col-12 col-lg-8 col-xl-9">
                                    <section class="note-surface reveal-up">
                                        <div class="notes-toolbar">
                                            <div class="note-chip-group">
                                                <span class="note-chip">Lesson {{LESSON_NUMBER}}</span>
                                                <span class="note-chip">{{TOPIC_COUNT}} Topics</span>
                                                <span class="note-chip">Responsive Sidebar</span>
                                            </div>
                                        </div>
                                        <div class="row g-4">
{{TOPIC_CARDS}}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="section-space" id="lesson-next">
                        <div class="container">
                            <div class="cta-panel reveal-scale">
                                <div class="layout-grid cta-wrapper">
                                    <div class="grid-seven-twelfths">
                                        <div class="section-head reveal-up" style="margin-bottom: 0;">
                                            <span class="section-kicker">Keep Moving</span>
                                            <h2>Open a topic, read the exact note content, and move through the lesson with the sidebar.</h2>
                                            <p style="margin-bottom: 32px;">Each topic page keeps the original markdown wording, rewrites internal note links to `.html`, and stays tied into this lesson's navigation.</p>
                                            <div class="hero-actions" style="margin-bottom: 0;">
                                                <a href="{{FIRST_TOPIC_HREF}}" class="btn btn-tonal">Start This Lesson</a>
                                                <a href="../index.html#lessons" class="btn btn-outline">Back to Lesson List</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-five-twelfths">
                                        <div class="cta-image-wrap reveal-up" style="animation-delay: 200ms;">
                                            <img src="../../images/cta.webp" alt="JavaScript study visual" class="cta-image" style="min-height: 250px; background: var(--md-sys-color-surface-dim); object-fit: cover;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="offcanvas offcanvas-start notes-offcanvas" tabindex="-1" id="notesSidebar" aria-labelledby="notesSidebarLabel">
                        <div class="offcanvas-header">
                            <h2 class="offcanvas-title" id="notesSidebarLabel">{{LESSON_TITLE}}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body" data-sidebar-mobile></div>
                    </div>

                    <script id="notes-sidebar-data" type="application/json">{{SIDEBAR_DATA}}</script>
'@

    $mainContent = Apply-Replacements -Template $mainContent -Values @{
        SECTION_TITLE = Escape-Html ("Every topic in {0}." -f $LessonConfig.Title)
        SECTION_COPY = Escape-Html $LessonConfig.Description
        LESSON_NUMBER = [string]$LessonConfig.Number
        TOPIC_COUNT = [string]$Topics.Count
        TOPIC_CARDS = $topicCardsHtml
        FIRST_TOPIC_HREF = $Topics[0].RelativeTopicHref
        LESSON_TITLE = Escape-Html $LessonConfig.Title
        SIDEBAR_DATA = $sidebarDataJson
    }

    $extraScripts = @'
    <script src="../../assets/notes.js"></script>
'@

    return Get-SharedPageHtml `
        -PageTitle ("Lesson {0}: {1}" -f $LessonConfig.Number, $LessonConfig.Title) `
        -MetaDescription $LessonConfig.Description `
        -RelativePrefix '../../' `
        -NotesHomeHref '../index.html' `
        -HeroEyebrow ("Lesson {0}" -f $LessonConfig.Number) `
        -HeroTitle $LessonConfig.HeroTitle `
        -HeroCopy $LessonConfig.HeroCopy `
        -HeroActions $heroActions `
        -HeroMetrics $heroMetrics `
        -MainContent $mainContent `
        -DecorativeBlock $DecorativeBlock `
        -FooterBlock $FooterBlock `
        -PageType 'lesson' `
        -LessonKey $LessonConfig.Key `
        -CurrentSlug '' `
        -BodyClass 'notes-generated-page notes-lesson-page' `
        -ExtraScripts $extraScripts
}

function Get-TopicNavigationHtml {
    param(
        [AllowNull()][pscustomobject]$PreviousTopic,
        [AllowNull()][pscustomobject]$NextTopic
    )

    $actions = New-Object System.Collections.Generic.List[string]

    if ($null -ne $PreviousTopic) {
        $actions.Add(
            ('<a href="{0}" class="btn btn-outline">Previous: {1}</a>' -f $PreviousTopic.RelativeTopicHref, (Escape-Html $PreviousTopic.Title))
        )
    }

    if ($null -ne $NextTopic) {
        $actions.Add(
            ('<a href="{0}" class="btn btn-tonal">Next: {1}</a>' -f $NextTopic.RelativeTopicHref, (Escape-Html $NextTopic.Title))
        )
    }

    if ($actions.Count -eq 0) {
        $actions.Add('<a href="index.html" class="btn btn-outline">Back to Lesson Overview</a>')
    }

    return ($actions -join "`n")
}

function Get-TopicPageHtml {
    param(
        [Parameter(Mandatory)][hashtable]$LessonConfig,
        [Parameter(Mandatory)][pscustomobject]$Topic,
        [AllowNull()][pscustomobject]$PreviousTopic,
        [AllowNull()][pscustomobject]$NextTopic,
        [Parameter(Mandatory)][object[]]$Topics,
        [Parameter(Mandatory)][string]$DecorativeBlock,
        [Parameter(Mandatory)][string]$FooterBlock
    )

    $topicPosition = [string]$Topic.Position
    $heroActions = @'
<a href="index.html" class="btn btn-ext-fab">
    Back to Lesson
    <span class="material-symbols-rounded icon-sm">arrow_back</span>
</a>
{{SECONDARY_ACTION}}
'@

    $secondaryAction = '<a href="../index.html" class="btn btn-outline">Back to NOTES Home</a>'
    if ($null -ne $NextTopic) {
        $secondaryAction = ('<a href="{0}" class="btn btn-outline">Next Topic</a>' -f $NextTopic.RelativeTopicHref)
    }

    $heroActions = Apply-Replacements -Template $heroActions -Values @{
        SECONDARY_ACTION = $secondaryAction
    }

    $heroMetrics = @(
        Get-HeroMetricCardHtml -Value ("{0}/{1}" -f $topicPosition, $Topics.Count) -Label 'Topic position'
        Get-HeroMetricCardHtml -Value ('Lesson {0}' -f $LessonConfig.Number) -Label 'Current lesson'
        Get-HeroMetricCardHtml -Value 'HTML' -Label 'Rendered from markdown'
    ) -join "`n"

    $sidebarDataJson = ConvertTo-HtmlSafeJson (Get-LessonSidebarData -LessonConfig $LessonConfig -Topics $Topics)
    $noteDataJson = ConvertTo-HtmlSafeJson @{
        title = $Topic.Title
        markdownBase64 = $Topic.MarkdownBase64
    }

    $navigationActions = Get-TopicNavigationHtml -PreviousTopic $PreviousTopic -NextTopic $NextTopic

    $mainContent = @'
                    <section class="section-space" id="topic-note">
                        <div class="container">
                            <div class="section-head text-center reveal-up">
                                <span class="section-kicker">Topic View</span>
                                <h2>{{SECTION_TITLE}}</h2>
                                <p>{{SECTION_COPY}}</p>
                                <div class="linear-progress" aria-hidden="true"></div>
                            </div>

                            <div class="notes-mobile-toolbar d-lg-none reveal-up">
                                <button class="btn btn-tonal notes-mobile-sidebar-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#notesSidebar" aria-controls="notesSidebar">
                                    Browse Lesson Topics
                                    <span class="material-symbols-rounded icon-sm">menu</span>
                                </button>
                            </div>

                            <div class="row g-4 notes-layout">
                                <div class="col-12 col-lg-4 col-xl-3 d-none d-lg-block">
                                    <div class="notes-sidebar-host reveal-up" data-sidebar-desktop></div>
                                </div>
                                <div class="col-12 col-lg-8 col-xl-9">
                                    <article class="note-surface reveal-up">
                                        <div class="notes-toolbar">
                                            <div class="note-chip-group">
                                                <span class="note-chip">Lesson {{LESSON_NUMBER}}</span>
                                                <span class="note-chip">Topic {{TOPIC_POSITION}}</span>
                                                <span class="note-chip">{{TOPIC_FILE}}</span>
                                            </div>
                                        </div>
                                        <div class="notes-breadcrumb">
                                            <a href="../index.html">NOTES</a>
                                            <span>/</span>
                                            <a href="index.html">{{LESSON_TITLE}}</a>
                                            <span>/</span>
                                            <span>{{TOPIC_TITLE}}</span>
                                        </div>
                                        <div class="note-render-surface note-markdown" id="noteContent">
                                            <div class="notes-loading">Rendering note content...</div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="section-space" id="topic-navigation">
                        <div class="container">
                            <div class="cta-panel reveal-scale">
                                <div class="layout-grid cta-wrapper">
                                    <div class="grid-seven-twelfths">
                                        <div class="section-head reveal-up" style="margin-bottom: 0;">
                                            <span class="section-kicker">Keep Revising</span>
                                            <h2>Move between topics in the same lesson without losing the current theme.</h2>
                                            <p style="margin-bottom: 32px;">The sidebar stays lesson-scoped, internal markdown note links resolve to `.html`, and the theme toggle keeps working across pages.</p>
                                            <div class="hero-actions" style="margin-bottom: 0;">
{{NAVIGATION_ACTIONS}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-five-twelfths">
                                        <div class="cta-image-wrap reveal-up" style="animation-delay: 200ms;">
                                            <img src="../../images/cta.webp" alt="JavaScript study visual" class="cta-image" style="min-height: 250px; background: var(--md-sys-color-surface-dim); object-fit: cover;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="offcanvas offcanvas-start notes-offcanvas" tabindex="-1" id="notesSidebar" aria-labelledby="notesSidebarLabel">
                        <div class="offcanvas-header">
                            <h2 class="offcanvas-title" id="notesSidebarLabel">{{LESSON_TITLE}}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body" data-sidebar-mobile></div>
                    </div>

                    <script id="notes-sidebar-data" type="application/json">{{SIDEBAR_DATA}}</script>
                    <script id="notes-page-data" type="application/json">{{NOTE_DATA}}</script>
'@

    $mainContent = Apply-Replacements -Template $mainContent -Values @{
        SECTION_TITLE = Escape-Html ("Read {0} inside the generated NOTES site." -f $Topic.Title)
        SECTION_COPY = Escape-Html $Topic.Excerpt
        LESSON_NUMBER = [string]$LessonConfig.Number
        TOPIC_POSITION = [string]$Topic.Position
        TOPIC_FILE = Escape-Html $Topic.SourceFileName
        LESSON_TITLE = Escape-Html $LessonConfig.Title
        TOPIC_TITLE = Escape-Html $Topic.Title
        NAVIGATION_ACTIONS = $navigationActions
        SIDEBAR_DATA = $sidebarDataJson
        NOTE_DATA = $noteDataJson
    }

    $extraScripts = @'
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="../../assets/notes.js"></script>
'@

    return Get-SharedPageHtml `
        -PageTitle ("{0} | Lesson {1}" -f $Topic.Title, $LessonConfig.Number) `
        -MetaDescription $Topic.Excerpt `
        -RelativePrefix '../../' `
        -NotesHomeHref '../index.html' `
        -HeroEyebrow ("Lesson {0} Topic" -f $LessonConfig.Number) `
        -HeroTitle $Topic.Title `
        -HeroCopy $Topic.Excerpt `
        -HeroActions $heroActions `
        -HeroMetrics $heroMetrics `
        -MainContent $mainContent `
        -DecorativeBlock $DecorativeBlock `
        -FooterBlock $FooterBlock `
        -PageType 'topic' `
        -LessonKey $LessonConfig.Key `
        -CurrentSlug $Topic.Slug `
        -BodyClass 'notes-generated-page notes-topic-page' `
        -ExtraScripts $extraScripts
}

function Get-NotesLandingHtml {
    param(
        [Parameter(Mandatory)][string]$SourceLandingHtml,
        [Parameter(Mandatory)][hashtable]$LessonConfigs,
        [Parameter(Mandatory)][int]$TopicCount
    )

    $landingHtml = $SourceLandingHtml

    $landingHtml = $landingHtml -replace 'href="./images/', 'href="../images/'
    $landingHtml = $landingHtml -replace 'href="images/', 'href="../images/'
    $landingHtml = $landingHtml -replace 'src="images/', 'src="../images/'
    $landingHtml = $landingHtml -replace 'href="libraries/', 'href="../libraries/'
    $landingHtml = $landingHtml -replace 'src="libraries/', 'src="../libraries/'
    $landingHtml = $landingHtml -replace 'href="assets/', 'href="../assets/'
    $landingHtml = $landingHtml -replace 'src="assets/', 'src="../assets/'

    $landingHtml = [regex]::Replace(
        $landingHtml,
        '(?m)^\s*<link rel="stylesheet" href="\.\./assets/style\.css">\s*$',
        @'
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/style.css">
'@
    )

    $landingHtml = [regex]::Replace(
        $landingHtml,
        '(?m)^\s*<script src="\.\./assets/logic\.js"></script>\s*$',
        @'
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/logic.js"></script>
'@
    )

    $landingHtml = $landingHtml.Replace('href="notes/Lesson1/variable.md"', 'href="lesson1/variable.html"')
    $landingHtml = $landingHtml.Replace('href="README.md"', 'href="../README.md"')
    $landingHtml = $landingHtml.Replace('<strong>15+</strong>', ('<strong>{0}</strong>' -f $TopicCount))

    foreach ($lessonKey in $LessonConfigs.Keys | Sort-Object) {
        $lesson = $LessonConfigs[$lessonKey]
        $injectionPattern = '(?s)(<div class="lesson-badge">Lesson {0}</div>.*?<ul class="lesson-list">.*?</ul>)' -f $lesson.Number
        $injectionHtml = @'
$1
                                        <div class="topic-card-actions">
                                            <a href="{{LESSON_HREF}}" class="btn btn-outline notes-card-action">Open Lesson {{LESSON_NUMBER}}</a>
                                        </div>
'@
        $injectionHtml = Apply-Replacements -Template $injectionHtml -Values @{
            LESSON_HREF = ('lesson{0}/index.html' -f $lesson.Number)
            LESSON_NUMBER = [string]$lesson.Number
        }

        $landingHtml = [regex]::Replace($landingHtml, $injectionPattern, $injectionHtml, 1)
    }

    return $landingHtml
}

$sourceLandingHtml = Get-Content -LiteralPath $sourceLandingPath -Raw
$templateFragments = Get-TemplateFragments -LandingHtml $sourceLandingHtml

if (Test-Path -LiteralPath $outputRoot) {
    Remove-Item -LiteralPath $outputRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null

$linkLookup = @{}
$allTopics = New-Object System.Collections.Generic.List[object]
$topicsByLesson = @{}

foreach ($lessonKey in $lessonConfigs.Keys | Sort-Object) {
    $lessonConfigs[$lessonKey].Key = $lessonKey
    $lessonConfigs[$lessonKey].TrackedFolder = 'notes/Lesson{0}' -f $lessonConfigs[$lessonKey].Number

    $lessonTopics = New-Object System.Collections.Generic.List[object]
    $noteFiles = Get-TrackedNoteFiles -TrackedFolder $lessonConfigs[$lessonKey].TrackedFolder

    foreach ($noteFile in $noteFiles) {
        $slug = [System.IO.Path]::GetFileNameWithoutExtension($noteFile.Name)
        $fallbackTitle = Get-TitleFromSlug -Slug $slug
        $rawContent = Get-NoteContent -NoteFile $noteFile
        $firstHeading = Get-FirstHeading -Content $rawContent -Fallback $fallbackTitle
        $excerpt = Get-Excerpt -Content $rawContent -Fallback $lessonConfigs[$lessonKey].Description

        $topic = [pscustomobject]@{
            LessonKey = $lessonKey
            LessonNumber = $lessonConfigs[$lessonKey].Number
            Slug = $slug
            Title = $firstHeading
            Excerpt = $excerpt
            SourcePath = $noteFile.FullName
            SourceFileName = $noteFile.Name
            OutputFileName = '{0}.html' -f $slug
            RelativeTopicHref = '{0}.html' -f $slug
            RawContent = $rawContent
        }

        $lessonTopics.Add($topic)
        $allTopics.Add($topic)
        $linkLookup[$noteFile.Name.ToLowerInvariant()] = '{0}.html' -f $slug
    }

    $topicsByLesson[$lessonKey] = @(Get-SortedTopics -Topics $lessonTopics.ToArray() -PreferredOrder $lessonConfigs[$lessonKey].Order)
    for ($index = 0; $index -lt $topicsByLesson[$lessonKey].Count; $index++) {
        $topicsByLesson[$lessonKey][$index] | Add-Member -NotePropertyName Position -NotePropertyValue ($index + 1)
    }
}

foreach ($lessonKey in $topicsByLesson.Keys) {
    foreach ($topic in $topicsByLesson[$lessonKey]) {
        $normalizedMarkdown = Normalize-MarkdownContent -Content $topic.RawContent -SlugLookup $linkLookup
        $topic | Add-Member -NotePropertyName NormalizedMarkdown -NotePropertyValue $normalizedMarkdown
        $topic | Add-Member -NotePropertyName MarkdownBase64 -NotePropertyValue (ConvertTo-Base64Utf8 -Value $normalizedMarkdown)
    }
}

$landingOutput = Join-Path $outputRoot 'index.html'
$landingHtml = Get-NotesLandingHtml -SourceLandingHtml $sourceLandingHtml -LessonConfigs $lessonConfigs -TopicCount $allTopics.Count
Write-GeneratedFile -Path $landingOutput -Content $landingHtml

$generatedHtmlFiles = New-Object System.Collections.Generic.List[string]
$generatedHtmlFiles.Add($landingOutput) | Out-Null

foreach ($lessonKey in $lessonConfigs.Keys | Sort-Object) {
    $lesson = $lessonConfigs[$lessonKey]
    $lessonOutputFolder = Join-Path $outputRoot $lessonKey
    New-Item -ItemType Directory -Path $lessonOutputFolder -Force | Out-Null

    $lessonPageHtml = Get-LessonPageHtml `
        -LessonConfig $lesson `
        -Topics $topicsByLesson[$lessonKey] `
        -DecorativeBlock $templateFragments.DecorativeBlock `
        -FooterBlock $templateFragments.FooterBlock

    $lessonIndexPath = Join-Path $lessonOutputFolder 'index.html'
    Write-GeneratedFile -Path $lessonIndexPath -Content $lessonPageHtml
    $generatedHtmlFiles.Add($lessonIndexPath) | Out-Null

    for ($index = 0; $index -lt $topicsByLesson[$lessonKey].Count; $index++) {
        $topic = $topicsByLesson[$lessonKey][$index]
        $previousTopic = $null
        $nextTopic = $null

        if ($index -gt 0) {
            $previousTopic = $topicsByLesson[$lessonKey][$index - 1]
        }

        if ($index -lt ($topicsByLesson[$lessonKey].Count - 1)) {
            $nextTopic = $topicsByLesson[$lessonKey][$index + 1]
        }

        $topicPageHtml = Get-TopicPageHtml `
            -LessonConfig $lesson `
            -Topic $topic `
            -PreviousTopic $previousTopic `
            -NextTopic $nextTopic `
            -Topics $topicsByLesson[$lessonKey] `
            -DecorativeBlock $templateFragments.DecorativeBlock `
            -FooterBlock $templateFragments.FooterBlock

        $topicOutputPath = Join-Path $lessonOutputFolder $topic.OutputFileName
        Write-GeneratedFile -Path $topicOutputPath -Content $topicPageHtml
        $generatedHtmlFiles.Add($topicOutputPath) | Out-Null
    }
}

Write-Host ('Generated {0} HTML files in {1}' -f $generatedHtmlFiles.Count, $outputRoot)
