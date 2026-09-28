import type { Block, Doc } from "./docs"

type Section = { id: string; title: string; blocks: Block[] }
const p = (text: string): Block => ({ t: "p", text })
const ul = (...items: string[]): Block => ({ t: "ul", items })
const steps = (...items: [string, string][]): Block => ({ t: "steps", items: items.map(([title, desc]) => ({ title, desc })) })
const image = (src: string, alt: string, caption: string): Block => ({ t: "image", src: `docs/${src}.png`, alt, caption })
const callout = (title: string, text: string, tone: "info" | "warn" = "info"): Block => ({ t: "callout", title, text, tone })
const table = (head: string[], rows: string[][]): Block => ({ t: "table", head, rows })
function doc(slug: string, group: string, title: string, subtitle: string, sections: Section[]): Doc {
  return {
    slug, group, title, subtitle,
    toc: sections.map(({ id, title: label }) => ({ id, label })),
    blocks: sections.flatMap(({ id, title: text, blocks }) => [{ t: "h2", id, text } as Block, ...blocks]),
  }
}

export const DOCS_EN: Doc[] = [
  doc("intro", "Get started", "Introduction", "A guide to CC Usage, from installation to everyday use.", [
    { id: "overview", title: "Overview", blocks: [
      p("CC Usage is a desktop AI usage monitor for Windows, macOS, and Linux. The desktop island shows usage at a glance, while the dashboard provides statistics, request logs, and connection management. It supports Claude, Codex, Gemini, Grok, Zcode, Trae, Qoder, and Workbuddy. Each platform shows only data that can actually be obtained, and collected usage stays on your device."),
    ] },
    { id: "capabilities", title: "What it does", blocks: [ul(
      "Keep quotas visible in a desktop island that snaps to any edge, expands on double-click, and docks as a slim strip.",
      "Read each tool's real local session, usage, cache, or credit source incrementally and deduplicate records.",
      "Explore today, this week, this month, all time, or a custom range using linked charts and paginated request logs.",
      "Query supported coding-plan quotas from Zhipu GLM, Kimi, MiniMax, ZenMux, OpenCode Go, Volcengine Ark, and Grok.",
    )] },
    { id: "stack", title: "Technology", blocks: [
      p("The desktop app uses Tauri 2. Rust handles windows, the tray, session collection, and local SQLite storage. The interface uses React 19, TypeScript, Vite, and Tailwind CSS 4. Windows has a Chinese NSIS installer; other systems have their own packages."),
      callout("Ready to start?", "Get a package from the download page, or read Installation and running for source builds."),
    ] },
  ]),
  doc("features", "Get started", "Features and support", "Understand the desktop entry points, data sources, and current limits. Preview figures are examples.", [
    { id: "desktop", title: "Desktop entry points", blocks: [table(["Entry", "Available features"], [
      ["Desktop island", "Collapse or expand, view the current connection and quota, running sessions and today's tokens, switch connections, snap to edges, dock, and remember position."],
      ["System tray", "Left-click to open the dashboard; right-click for windows, connections, position, and preferences; hover for a quota summary."],
      ["Dashboard", "Switch among eight platforms; inspect connections, subscription quotas, local statistics, trends, logs, and settings. Background collection continues when it closes."],
    ])] },
    { id: "platforms", title: "Platforms and connections", blocks: [
      p("Available fields differ by platform. Claude and Codex cover local sessions, tokens, cache, and official subscription quotas. Gemini reads local CLI sessions; Grok can read local OAuth credits. Zcode, Qoder, and Workbuddy show the usage, cache, credits, or sessions available in their local sources. Trae supports local source detection and connection management. Capability badges do not promise that every account supplies every field."),
      ul("Manage connections by adding, discovering local credentials, authorizing a CLI, checking, enabling, disconnecting, editing, or removing them. Invalid, offline, and expired states are distinct.",
        "Official Auth and API keys are separate. Subscription quota windows do not apply to an API key; balances appear only when the provider returns them.",
        "Coding-plan lookups support Zhipu GLM, Kimi, MiniMax, ZenMux, OpenCode Go, Volcengine Ark, and Grok. Some providers require extra query credentials.",
        "Supported Claude Code or Codex CLI settings change only after you explicitly enable a connection; a backup is made first."),
    ] },
    { id: "usage", title: "Quotas and statistics", blocks: [table(["Feature", "What is shown"], [
      ["Quotas and balances", "Actual 5-hour, 7-day, or monthly windows and reset times where available. Balance states distinguish available, unauthorized, unsupported, failed, and unknown; alert thresholds are configurable."],
      ["Local statistics", "Today, week, month, all time, and custom dates, with input, output, cache creation and hits, request count, cache hit rate, and estimated cost."],
      ["Trends", "Token and estimated-cost time buckets with a shared timeline. Model and time filters also apply to logs."],
      ["Collection", "Incremental, deduplicated reads from actual platform files or databases. Missing values stay unknown; tokens, credits, money, and context usage are not converted into one another."],
    ])] },
    { id: "logs", title: "Logs and proxy", blocks: [ul(
      "Request logs include time, billed model, reasoning effort, input and output tokens, estimated cost, duration, first-token latency, and status where trustworthy. Pagination and jump-to-page are available.",
      "The optional local proxy can time CLI gateway traffic. It restores direct configuration after repeated unavailability. Official subscription traffic does not use this proxy.",
    )] },
    { id: "settings", title: "Settings and data", blocks: [table(["Category", "Controls"], [
      ["Desktop island", "Visibility, always-on-top, size, opacity, do not disturb, dock edge, and refresh feedback."],
      ["General and appearance", "Launch at login, whether to open the dashboard at startup, 1/5/15/30-minute auto-refresh, and light/dark/system theme."],
      ["Data", "Deduplicated JSON import, ranged export, history retention and cleanup preview. Exports exclude connections and credentials."],
      ["Updates", "Download, install, and restart from the app after a new version is found."],
    ])] },
    { id: "demo", title: "About the preview", blocks: [callout("Numbers are examples", "This website cannot read visitors' local files, credentials, or quotas. The home page embeds the real desktop frontend with built-in example data. The desktop app displays sources it can verify on your device.")] },
  ]),
  doc("installation", "Get started", "Installation and running", "Pick the right package, launch the app, or run it from source.", [
    { id: "prereq", title: "Requirements", blocks: [ul(
      "Windows 10+ x64, macOS on Apple Silicon or Intel, or Linux x64.",
      "Windows needs WebView2; the installer provides setup guidance.",
      "Local token records require an existing session in the corresponding AI tool. Quota lookups also require a supported login or coding-plan connection.",
      "Source builds require Rust and pnpm. A frontend-only preview does not require Rust.",
    )] },
    { id: "installer", title: "Install a package (recommended)", blocks: [
      steps(
        ["Choose your package", "On the free download page, match your operating system and processor: Windows EXE, an architecture-specific macOS DMG, or a Linux AppImage or DEB."],
        ["Install", "Run the Windows EXE; open the macOS DMG and move the app to Applications; install the Linux DEB or make the AppImage executable and run it."],
        ["Launch and check", "Open CC Usage from a desktop shortcut or app list. Manual launch shows a loading window before the dashboard; the tray and island keep running in the background. If data is empty, follow First-time setup."],
      ),
      image("panel-overview", "CC Usage dashboard with platform, connection, and quota controls", "The dashboard after installation. Values shown are examples, not your account's quotas."),
      callout("Login startup differs from manual launch", "With silent startup enabled, logging in does not open the dashboard. Clicking the shortcut again activates the running app instead of starting another process."),
    ] },
    { id: "source", title: "Run from source", blocks: [
      p("Run these commands from the cc-usage repository root. The frontend-only preview uses sample usage and quota data; it cannot read this computer's sessions."),
      { t: "code", label: "Terminal · frontend only", lines: [
        { cmd: "pnpm --dir frontend install", comment: "# install frontend dependencies" },
        { cmd: "pnpm --dir frontend dev", comment: "# http://localhost:5173" },
      ] },
      p("The full desktop app also needs the Rust toolchain and the Tauri build dependencies for your system. On Windows, install rustup, reopen the terminal, and check rustc --version. The first build downloads and compiles dependencies."),
      { t: "code", label: "Terminal · desktop app", lines: [
        { cmd: "pnpm install", comment: "# install Tauri CLI at repository root" },
        { cmd: "pnpm tauri dev", comment: "# start Vite, compile Rust, and open the app" },
      ] },
    ] },
    { id: "faq", title: "Common installation issues", blocks: [table(["Symptom", "What to do"], [
      ["'tauri' is not recognized", "Run pnpm install at the repository root to install the Tauri CLI."],
      ["rustc: not installed", "Install Rust, then reopen your terminal."],
      ["The first pnpm tauri dev takes a long time", "The initial Rust build compiles many dependencies and can take several minutes."],
      ["EACCES when binding a port", "Windows may reserve port ranges. Inspect them with netsh interface ipv4 show excludedportrange protocol=tcp. Change both frontend/vite.config.ts server.port and backend/tauri.conf.json devUrl to the same available port."],
      ["No usage after installation", "Complete a real session in the target CLI and select that platform in the dashboard. Quota lookups also need a valid connection."],
    ])] },
  ]),
  doc("first-run", "Get started", "First-time setup", "Choose a platform, check data sources, add a connection, and position the island.", [
    { id: "platform", title: "Choose a platform", blocks: [
      steps(
        ["Open the dashboard", "After the first installation, the dashboard opens in the center of the screen. Later, left-click the CC Usage tray icon to restore it to its previous position."],
        ["Select the platform to inspect", "Use the top-right selector for Claude, Codex, Gemini, Grok, Zcode, Trae, Qoder, or Workbuddy. This changes the dashboard view, not the island's platform."],
        ["Check data sources", "Read each card's source and status. Statistics can be empty without local sessions. A quota without a queryable account or plan appears unknown or unsupported."],
      ),
      image("panel-overview", "Dashboard platform selector and connection controls", "Choose a platform at the top right; connection selection and Add connection appear above the overview. Figures are examples."),
    ] },
    { id: "connection", title: "Add a connection", blocks: [
      steps(
        ["Open connection management", "Go to Settings → Connections to see connections per platform, or use Add connection from the overview."],
        ["Choose a source", "Claude and Codex distinguish official Auth from API connections. Other platforms offer their supported local, official, or coding-plan sources. Local token statistics do not require an invented API key."],
        ["Check status", "Look for connected, expired, or no quota source. Only quota windows actually returned by a provider show a level. Select the active connection before checking the island."],
      ),
      image("panel-settings", "Connection management and Add connection in Settings", "Connection management is the first Settings group. The screenshot shows an example empty state."),
      callout("What permission is needed to read credentials?", "Local source discovery reads the selected tool's configuration or data files. Remote checks send credentials only to that platform or the service URL you configured, never to a CC Usage server."),
    ] },
    { id: "island", title: "Enable the desktop island", blocks: [
      steps(
        ["Show the island", "On first install it appears near the top center for five seconds, then docks to the top edge. Dragging it during the introduction cancels automatic docking. Later, control visibility in Settings → Island or the tray menu."],
        ["Select its platform", "Choose the platform or connection shown by the island in Island settings. This is separate from the platform currently inspected in the dashboard."],
        ["Position it", "Double-click to expand or collapse. Drag it to a screen edge to snap; the dock position is remembered."],
      ),
      image("island-expanded", "Expanded island showing quota, sessions, and tokens", "The expanded view shows available quota windows, running sessions, and today's tokens. Figures are examples."),
    ] },
  ]),
  doc("panel", "User guide", "Dashboard", "Find each area, switch platforms, and understand window behavior.", [
    { id: "overview", title: "Overview", blocks: [
      image("panel-overview", "Dashboard layout and quota cards", "The overview arranges platform selection, connections, quota cards, and local statistics. Figures are examples."),
      ul("The connection row shows the current platform and connection, with controls to add or switch.",
        "Subscription quota cards show used percentages, progress, and reset countdowns for available 5-hour and 7-day windows, with a source label.",
        "Local token statistics break down input, output, cache creation, and cache hits, alongside request count and cache hit rate.",
        "Today, week, month, all-time, and custom-date filters apply to statistics, trends, and logs."),
      steps(["Choose platform and connection", "Select the platform at the top right and confirm its active connection. Local token consumption is different from an account's remaining quota."],
        ["Choose a time range", "Switch among today, week, month, all time, or a custom range. Statistics, chart, and logs update together."],
        ["Inspect a request", "Scroll to Request logs and compare time, model, status, and duration when investigating a problem."]),
      image("panel-stats", "Token breakdown and time filters", "Statistics distinguish input, output, and cache values. Values in this image are examples."),
    ] },
    { id: "settings", title: "Settings", blocks: [
      p("Open Settings at the top of the dashboard, then choose Connections, Coding plans, Island, General, Proxy, Appearance, or Data. Connections manage sources; Island controls its platform, size, and position; General controls login startup and refresh interval; Data shows the database path and import, export, and cleanup tools. Follow each control's save prompt."),
      image("panel-settings", "Dashboard settings navigation", "Choose a Settings category before changing an item."),
    ] },
    { id: "window", title: "Window behavior", blocks: [
      p("The dashboard opens centered on first install. Clicking the tray icon after minimizing restores its position. Closing the dashboard destroys its window but keeps CC Usage, its tray, island, and background collection running. Left-click the tray icon to reopen it at the last position and size; if that monitor is unavailable, it returns to a visible area. Use Quit in the tray menu to exit completely."),
    ] },
  ]),
  doc("island", "User guide", "Desktop island", "Collapse, expand, dock, and view usage from real connection sources.", [
    { id: "forms", title: "Display modes", blocks: [
      image("island-collapsed", "Collapsed desktop island", "The compact view keeps the current connection and essential quota levels visible."),
      ul("Collapsed by default: a single capsule with the current platform and quota bars.",
        "Expanded on double-click: available quota, token, or credit details for that platform.",
        "Docked strip: a slim edge-attached view with the essential levels."),
      image("island-expanded", "Expanded desktop island", "Double-click to see connection quotas, running sessions, and today's tokens. Figures are examples."),
    ] },
    { id: "drag", title: "Drag and snap", blocks: [
      p("Drag from the island's draggable area toward any screen edge to snap. Dock position is remembered. If it disappears, check visibility in Settings → Island and the tray menu, then reset window positions if necessary."),
    ] },
    { id: "refresh", title: "Refresh feedback", blocks: [
      p("Refreshing updates quota levels and today's usage delta. Choose an auto-refresh interval in Settings → General. Do not disturb pauses delta prompts, quota color alerts, and notifications while collection and statistics continue."),
      callout("Tray shortcut", "The tray menu can hide or restore the island without opening Settings."),
      image("tray-menu", "Tray menu with island visibility and reset-window-position controls", "Right-click the tray icon to change visibility, reset positions, or quit the app."),
    ] },
  ]),
  doc("connections", "User guide", "Connections and quotas", "Add a connection and distinguish local sessions, official subscription quotas, and coding-plan quotas.", [
    { id: "methods", title: "Connection methods", blocks: [
      image("panel-settings", "Connection management in Settings", "Go to Settings → Connections, choose a platform, then Add connection."),
      table(["Goal", "What you need", "Where to see it"], [
        ["Local tokens and sessions", "Produce a session in the corresponding CLI or desktop tool; no made-up API key is needed.", "Local statistics, trends, and request logs in the overview."],
        ["Official subscription quota", "A supported, verified official Auth connection.", "Actual quota windows in quota cards and the island."],
        ["API or coding-plan quota", "A provider URL and key, sometimes with an extra quota-query credential.", "Balances or windows returned by the provider; otherwise unknown."],
      ]),
      steps(["Choose a platform", "In Settings → Connections, choose Claude, Codex, or another target. Connections are listed per platform; the overview shows the current one."],
        ["Add or discover", "Use Add connection for official Auth, local discovery, or API access. If your CLI is already signed in, start with its local source."],
        ["Verify and enable", "Check status and quota source. CLI configuration changes only when you explicitly enable a supported connection, and a backup is made first."],
        ["Check the result", "Return to the overview and inspect the quota source, window, and reset time. The app does not invent a percentage when no quota API responds."]),
    ] },
    { id: "platforms", title: "Supported platforms", blocks: [table(["Platform", "Current sources"], [
      ["Claude", "Official subscription, API, local sessions, tokens, cache, and quotas."],
      ["Codex", "Official subscription, API, local sessions, tokens, cache, and quotas."],
      ["Gemini", "Local Gemini CLI sessions and usage; no claim of an online subscription quota."],
      ["Grok", "Local OAuth credit quota; no claim of local session collection."],
      ["Zcode", "Local sessions, usage, and cache; account balance is not assumed."],
      ["Trae", "Local source detection and connection management."],
      ["Qoder", "Local sessions, tokens, and credits from domestic or international editions."],
      ["Workbuddy", "Local sessions, usage, cache, and credits."],
    ])] },
    { id: "providers", title: "Supported quota providers", blocks: [
      p("Supported coding-plan connections identify the provider by base_url and use the implemented quota endpoint for that provider. Returned fields vary, so accounts do not necessarily have the same windows."),
      table(["Provider", "Connection type"], [
        ["Official Claude / Codex", "Auth connection with direct account quota lookup."],
        ["Zhipu GLM", "Personal, international, or team plan."],
        ["Kimi", "Coding plan."], ["MiniMax", "Coding plan."], ["ZenMux", "Coding plan."],
        ["OpenCode Go", "Coding plan."], ["Volcengine Ark", "Coding plan."], ["Grok", "Coding plan."],
      ]),
    ] },
    { id: "windows", title: "Quota windows", blocks: [
      p("Actual 5-hour, weekly, or monthly windows returned by a provider appear in the quota card and island with used percentage and reset time. If a platform has no public or verified quota source, the UI explains that limit instead of filling a default value or presenting stale data as freshly synced."),
      image("panel-overview", "5-hour and 7-day quota cards", "Check the source label before reading percentages and reset countdowns. Figures are examples."),
      callout("Local tokens but no quota?", "These are separate data paths. Local usage comes from session files; quota data needs an official account or provider API. Check connection type, verification state, and quota source before diagnosing collection.", "warn"),
    ] },
  ]),
  doc("stats", "User guide", "Statistics and request logs", "Filter local tokens by platform and time, then inspect trends and individual requests.", [
    { id: "ranges", title: "Statistics scope", blocks: [
      steps(["Choose a platform", "Use the top-right overview selector for the tool you used. Claude and Codex usage is not automatically mixed."],
        ["Choose time and model", "Select today, week, month, all time, or custom dates. Filter by model when investigating one model."],
        ["Check the source", "Read whether a card comes from local sessions, proxy requests, or another source. Filter changes apply to charts and logs together."]),
      p("Tokens are measured separately as new input, output, cache creation, and cache hits. Total consumption includes cached rereads, while the island's today delta emphasizes newly added tokens. Do not subtract these different measures. Costs are estimates from known prices, not final provider bills."),
      image("panel-stats", "Token breakdown and time range", "Check the time range and source before reading the token categories. Figures are examples."),
    ] },
    { id: "chart", title: "Trend chart", blocks: [
      p("The chart groups data by hour or day. Tokens appear above estimated cost on the same timeline. Changing range or model refreshes both chart and request log."),
    ] },
    { id: "logs", title: "Request logs", blocks: [
      image("panel-logs", "Request log columns for model, tokens, duration, and status", "Use time, model, duration, and status to investigate. Missing fields may appear as a dash."),
      table(["Column", "Meaning"], [
        ["Time", "Request completion time, to the second."], ["Billed model", "Model billed for this request."],
        ["Reasoning effort", "Extended-thinking setting such as low, medium, or high."],
        ["Input / output", "Token counts for this request."], ["Total cost", "Estimated from known prices."],
        ["Duration / first token", "Total duration and time to first token."],
        ["Status", "Actual HTTP result such as 200, 429, or 500 where trustworthy; otherwise unknown."],
      ]),
      callout("Linked filters", "Custom date and model filters apply to the trend chart and request log together, using the same underlying records."),
      callout("Why is duration shown as a dash?", "Local session records do not always contain duration or first-token timing. The optional proxy can add network timing only if you enable it and traffic passes through it. Missing is not zero."),
    ] },
  ]),
  doc("data-sources", "Data and privacy", "Data sources", "Learn where local statistics come from and why fields vary across platforms.", [
    { id: "dirs", title: "Local collection sources", blocks: [
      p("CC Usage reads session files or local databases already written by your tools. Installing CC Usage does not create historical sessions; first use the relevant account or CLI in its own application."),
      ul("Claude, Codex, and Gemini: local CLI sessions and authorization sources.",
        "Zcode, Qoder, and Workbuddy: their actual task, session, or native database sources.",
        "Grok: local OAuth credit source. Trae: local source detection.",
        "Domestic and international Qoder editions are collected separately."),
    ] },
    { id: "dedupe", title: "Incremental collection and deduplication", blocks: [
      p("Collection follows each platform's format. Appended JSONL, updated snapshots, and native SQLite sources retain cursors and stable identifiers so repeated events are counted once. Tokens, credits, money, and context usage keep their own units. Collection is read-only and does not alter third-party data."),
      table(["Figure", "Main source", "Extra connection?"], [
        ["Local sessions / tokens", "CLI session file or local database.", "Usually no quota connection, but an actual session is required."],
        ["Subscription quota / reset", "Supported official account API.", "Valid Auth or account source."],
        ["Coding-plan quota / API balance", "Configured provider quota API.", "Provider must support and return the data."],
      ]),
      callout("Preview data", "The website's dashboard figures are design examples. The installed desktop app displays local statistics from your own device.", "warn"),
    ] },
  ]),
  doc("storage", "Data and privacy", "Local storage", "Find the data directory and manage exports, imports, and history cleanup.", [
    { id: "location", title: "Storage location", blocks: [
      p("Usage records are stored in usage.db in the local application data directory; preferences and some query settings live in configuration files alongside it. Paths differ by operating system and installation method. Open Settings → Data to view the database path and open its directory. Do not edit SQLite files while the app is running."),
    ] },
    { id: "backup", title: "Import, export, and cleanup", blocks: [steps(
      ["Back up statistics", "In Settings → Data, choose an export range and location. The JSON contains usage records and session titles, not connection credentials."],
      ["Import old records", "Choose a previous JSON export. Stable identifiers prevent duplicates. Then check the platform and time range in the overview."],
      ["Clean history", "Preview the deletion first, then set a retention period. Nothing is deleted automatically by default. Collection offsets remain so old logs do not return after a rescan."],
    )] },
    { id: "migration", title: "Schema migrations", blocks: [
      p("The app migrates its own SQLite schema when it starts. For a restorable copy before an upgrade, quit fully from the tray and copy the data directory shown in Settings. A JSON usage export alone does not back up connections and preferences."),
    ] },
  ]),
  doc("privacy", "Data and privacy", "Privacy", "Separate local storage, online quota lookups, and the optional local proxy.", [
    { id: "no-upload", title: "No usage uploads", blocks: [
      p("CC Usage has no account service or session-upload service of its own. Sessions, usage statistics, and settings stay local. Quota lookups contact the relevant platform or your configured provider, and app updates contact the release source. Local storage does not mean these optional online features make no network requests."),
    ] },
    { id: "read-only", title: "Read-only collection", blocks: [
      p("Local session collection is read-only and does not modify third-party session files. Connection switching and the local proxy are separate actions. Supported CLI configuration changes happen only after explicit enablement and a backup; without enabling the proxy, normal requests are not intercepted."),
    ] },
    { id: "audit", title: "Open-source audit", blocks: [
      p("The project is open source under the MIT License. These behaviors can be checked in the source code; community review and feedback are welcome."),
    ] },
  ]),
  doc("troubleshooting", "Help", "Troubleshooting", "Check platform, connection, data source, and window state for common issues.", [
    { id: "empty-stats", title: "No local statistics", blocks: [steps(
      ["Check platform", "Choose the tool you actually use at the top right of the overview. Usage from different platforms is not automatically combined."],
      ["Check for sessions", "Complete a real session in that CLI or desktop tool. Installing CC Usage does not itself generate past usage."],
      ["Check the time range", "Try All time and clear model filters. Today's view can be empty when sessions are older."],
      ["Check the source", "Read the source label on the statistics card. Some tools do not expose a locally readable usage source; the platform should state this limit."],
    )] },
    { id: "unknown-quota", title: "Quota shows unknown", blocks: [
      p("Local tokens can be present even when an official quota cannot be queried. In Settings → Connections, check whether the current connection is official Auth, API, or a local source, whether it has expired, and whether that source has a quota API. For coding plans, check base_url and any extra query credential required by the provider."),
      callout("Do not present old data as a current quota", "When a lookup fails, permission is missing, or a provider offers no window, keep quota unknown. Retry later or check the account; local tokens cannot be converted into remaining quota.", "warn"),
    ] },
    { id: "missing-island", title: "Cannot find the island", blocks: [
      steps(["Check visibility", "Right-click the tray icon and confirm Show island is enabled. The same switch is in Settings."],
        ["Reset window position", "If it is still missing, choose Reset window position in the tray menu, especially after changing displays or resolution."],
        ["Check always-on-top", "If another window covers the island, check always-on-top. Do not disturb pauses alerts, not collection."]),
      image("tray-menu", "Tray visibility and reset-position controls", "Right-click the tray icon to check Show island and Reset window position."),
    ] },
    { id: "missing-fields", title: "Fields missing from logs", blocks: [
      p("A local session may contain model, tokens, and time but no reliable HTTP status, duration, or first-token latency. The UI shows a dash or unknown. Extra network timing is possible only if you enable the local proxy and the request passes through it. Costs are estimates; use the provider bill as the source of truth."),
    ] },
    { id: "updates", title: "Updates and exit", blocks: [table(["Situation", "What to do"], [
      ["App still runs after closing the dashboard", "This is tray behavior. Left-click the tray icon to reopen the dashboard; use Quit in its right-click menu to exit completely."],
      ["Clicking the shortcut again", "The running instance is activated instead of launching another one. This also opens the dashboard after silent login startup."],
      ["New version found", "Click the green update notice in the dashboard, wait for the package download and signature check, then click Install. Retry if the download fails."],
    ])] },
  ]),
]
