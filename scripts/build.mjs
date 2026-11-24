#!/usr/bin/env node
// Turns data/*.json into the page data (docs/data.js), the full list (GRAVEYARD.md)
// and the tables inside README.md. No npm dependencies.
// Usage: node scripts/build.mjs [--date 2026-11-24]
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f, d) => existsSync(join(root, f)) ? JSON.parse(readFileSync(join(root, f), 'utf8')) : d
const arg = (name, def) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : def }
const today = arg('--date', new Date().toISOString().slice(0, 10))
const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000)

const repos = read('data/repos.json', [])
const curated = read('data/curated.json', { hosted: [], epitaphs: {} })
const sites = read('data/sites.json', {})

// ---- status -----------------------------------------------------------------
// Days since the last push decide where a repository lies.
const STATUS = [
  { key: 'alive', label: 'Alive', max: 45, icon: '🫀' },
  { key: 'coughing', label: 'Coughing', max: 180, icon: '🤒' },
  { key: 'flatlined', label: 'Flatlined', max: 365, icon: '📉' },
  { key: 'buried', label: 'Buried', max: Infinity, icon: '🪦' },
]
const EMBALMED = { key: 'embalmed', label: 'Embalmed', icon: '🏺' } // archived by its owner
const statusOf = (r) => r.archived ? EMBALMED : STATUS.find((s) => r.silent_days <= s.max)

// ---- pulse score ------------------------------------------------------------
// 0 to 100. 40 points for how recently anything was pushed, 40 for stars on a log
// scale (1,000 stars is full marks), 20 for how long the project was worked on.
const pulse = (r) => {
  const recency = Math.max(0, 1 - r.silent_days / 365)
  const stars = Math.min(1, Math.log10(r.stars + 1) / 3)
  const stamina = Math.min(1, r.lifespan_days / 365)
  return Math.round(40 * recency + 40 * stars + 20 * stamina)
}

// ---- epitaphs ---------------------------------------------------------------
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
const pick = (r, list) => list[hash(r.repo) % list.length]
const month = (d) => new Date(d + 'T00:00:00Z').toLocaleString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const epitaph = (r) => {
  const own = curated.epitaphs[r.repo]
  if (own) return own
  if (r.archived) return 'Archived by its own maker. A dignified exit, which is rare here.'
  if (r.status === 'alive') {
    if (r.lifespan_days === 0) return 'One day old in commit terms. Too early to call; the statistics are not encouraging.'
    if (r.lifespan_days > 365) return pick(r, ['More than a year of commits. Does not belong here and knows it.', 'Still maintained after a year. Visiting, not residing.'])
    return pick(r, ['Still breathing. We check again next week.', 'Pulse present. No flowers yet.', 'Alive at the time of writing, which is all anyone can say.'])
  }
  if (r.lifespan_days === 0) return pick(r, ['Born and abandoned on the same day.', 'Lived for one afternoon.', 'Created and last pushed on the same date.', 'One prompt, one push, eternal rest.'])
  if (r.lifespan_days <= 3) return pick(r, ['Lived for a long weekend.', 'Shipped on Friday, forgotten by Monday.', 'Three days from "initial commit" to silence.'])
  if (r.lifespan_days <= 14) return pick(r, ['Two weeks of enthusiasm.', 'Lasted about as long as a free trial.'])
  if (r.lifespan_days <= 45) return pick(r, ['Survived roughly one billing cycle of API credits.', 'A month of commits, then the next idea arrived.'])
  if (r.status === 'coughing') return pick(r, [`Last seen pushing in ${month(r.last_push)}. Faint pulse.`, `Quiet since ${month(r.last_push)}. Could still be a long holiday.`])
  return pick(r, [`Silent since ${month(r.last_push)}.`, `Gone since ${month(r.last_push)}, still indexed.`, `Worked on for ${r.lifespan_days} days, resting since ${month(r.last_push)}.`])
}

// ---- repositories -----------------------------------------------------------
const hostedRepos = new Set(curated.hosted.map((h) => (h.repo || '').toLowerCase()).filter(Boolean))
const list = repos.map((r) => {
  const e = { ...r }
  e.lifespan_days = Math.max(0, days(r.created, r.last_push))
  e.silent_days = Math.max(0, days(r.last_push, today))
  const s = statusOf(e)
  e.status = s.key
  e.pulse = pulse(e)
  e.one_day = e.lifespan_days === 0
  e.kind = /\bmcp\b/i.test(`${r.repo} ${r.description}`) ? 'mcp' : 'repo'
  const site = r.homepage && sites[r.homepage]
  if (site) e.site_status = site.status
  e.epitaph = epitaph(e)
  return e
}).sort((a, b) => b.pulse - a.pulse || b.stars - a.stars || a.repo.localeCompare(b.repo))
list.forEach((e, i) => { e.rank = i + 1 })

// ---- hosted and commercial tools ---------------------------------------------
// A site that is down is buried (or coughing on a 5xx). A site that is up is judged
// like a repository: by the days since its page was last edited, when the page says.
// 401, 403 and 429 mean a server answered and turned a robot away: the site is up.
const up = (c) => (c >= 200 && c < 400) || [401, 403, 429].includes(c)
const hosted = curated.hosted.map((h) => {
  const site = sites[h.url]
  const repo = h.repo && list.find((r) => r.repo.toLowerCase() === h.repo.toLowerCase())
  // The newest date we have: what the page reports, what a person read on it, or the repository's last push.
  const dates = [site && site.modified, h.last_edit, repo && repo.last_push].filter(Boolean).sort()
  const edited = dates.length ? dates[dates.length - 1] : null
  const source = !edited ? null : edited === (site && site.modified) ? site.modified_source : edited === h.last_edit ? (h.last_edit_note || 'read on the page') : 'last push to its repository'
  let status = 'unknown'
  if (h.no_site) status = 'unknown'
  else if (site && !up(site.status)) status = site.status >= 500 ? 'coughing' : 'buried'
  else if (edited) status = STATUS.find((x) => Math.max(0, days(edited, today)) <= x.max).key
  else if (site) status = 'alive'
  const sign = h.no_site ? h.last_sign_note
    : edited ? `page last edited ${edited} (${source})`
    : site ? `site answered on ${site.checked}, edit date not published` : h.last_sign_note
  return { ...h, status, edited, sign, site_status: site && !up(site.status) ? site.status : null, checked: site ? site.checked : null,
    stars: repo ? repo.stars : null, last_push: repo ? repo.last_push : null }
})

// ---- numbers for the gate ------------------------------------------------------
const count = (k) => list.filter((r) => r.status === k).length
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0 }
const settled = list.filter((r) => r.status !== 'alive')
const stats = {
  built: today,
  total: list.length,
  hosted: hosted.length,
  alive: count('alive'), coughing: count('coughing'), flatlined: count('flatlined'),
  buried: count('buried'), embalmed: count('embalmed'),
  one_day: list.filter((r) => r.one_day).length,
  one_week: list.filter((r) => r.lifespan_days <= 7).length,
  median_lifespan: median(list.map((r) => r.lifespan_days)),
  median_lifespan_settled: median(settled.map((r) => r.lifespan_days)),
  zero_stars: list.filter((r) => r.stars === 0).length,
  mcp: list.filter((r) => r.kind === 'mcp').length,
  by_year: Object.fromEntries([...new Set(list.map((r) => r.created.slice(0, 4)))].sort().map((y) => [y, list.filter((r) => r.created.startsWith(y)).length])),
}
const pct = (n) => stats.total ? Math.round((100 * n) / stats.total) : 0

writeFileSync(join(root, 'docs/data.js'),
  `// Generated by scripts/build.mjs. Do not edit.\nwindow.GRAVEYARD = ${JSON.stringify({ stats, hosted, repos: list })};\n`)

// The page asks for data.js by build date, so browsers do not pair a new page with old data.
const pageFile = join(root, 'docs/index.html')
writeFileSync(pageFile, readFileSync(pageFile, 'utf8').replace(/src="data\.js[^"]*"/, `src="data.js?v=${today}"`))

// ---- markdown ---------------------------------------------------------------
const icon = (k) => (k === 'embalmed' ? EMBALMED : STATUS.find((s) => s.key === k) || { icon: '❔', label: 'Unknown' })
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
const short = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s)
const repoRow = (r) => `| ${r.rank} | [${cell(r.repo)}](https://github.com/${r.repo}) | ${icon(r.status).icon} ${icon(r.status).label} | ${r.pulse} | ${r.stars} | ${r.created} | ${r.last_push} | ${r.lifespan_days} d | ${cell(r.epitaph)} |`
const repoHead = '| # | Repository | Status | Pulse | ★ | Born | Last push | Worked on | Epitaph |\n|--:|---|---|--:|--:|---|---|--:|---|'
const hostedRow = (h) => {
  const st = h.status === 'unknown' ? '❔ No site of its own' : `${icon(h.status).icon} ${icon(h.status).label}${h.site_status ? ` (HTTP ${h.site_status})` : ''}`
  return `| [${cell(h.name)}](${h.url}) | ${h.kind} | ${st} | ${cell(h.sign)} | ${cell(h.epitaph)} |`
}
const statsBlock = [
  `**${stats.total}** repositories and **${stats.hosted}** hosted or commercial tools, as of **${today}**.`,
  '',
  `| | Count | Share |`, `|---|--:|--:|`,
  ...['alive', 'coughing', 'flatlined', 'buried', 'embalmed'].map((k) => `| ${icon(k).icon} ${icon(k).label} | ${stats[k]} | ${pct(stats[k])}% |`),
  '',
  `- **${stats.one_day}** (${pct(stats.one_day)}%) were created and last pushed on the same date.`,
  `- **${stats.one_week}** (${pct(stats.one_week)}%) were worked on for a week or less.`,
  `- Median time between creation and last push: **${stats.median_lifespan} day${stats.median_lifespan === 1 ? '' : 's'}**.`,
  `- **${stats.zero_stars}** (${pct(stats.zero_stars)}%) have no stars at all. The author did not star it either.`,
  `- **${stats.mcp}** (${pct(stats.mcp)}%) are MCP servers.`,
  `- Born per year: ${Object.entries(stats.by_year).map(([y, n]) => `${y}: ${n}`).join(', ')}.`,
].join('\n')

const section = (name, body) => (text) => {
  const a = `<!-- ${name}:start -->`, b = `<!-- ${name}:end -->`
  const i = text.indexOf(a), j = text.indexOf(b)
  return i < 0 || j < 0 ? text : text.slice(0, i + a.length) + '\n' + body + '\n' + text.slice(j)
}
const readmeFile = join(root, 'README.md')
if (existsSync(readmeFile)) {
  let t = readFileSync(readmeFile, 'utf8')
  t = section('stats', statsBlock)(t)
  t = section('hosted', '| Tool | Kind | Status | Last sign of life | Epitaph |\n|---|---|---|---|---|\n' + hosted.map(hostedRow).join('\n'))(t)
  t = section('top', repoHead + '\n' + list.slice(0, 30).map(repoRow).join('\n'))(t)
  const oneDay = list.filter((r) => r.one_day && r.status !== 'alive').sort((a, b) => b.stars - a.stars).slice(0, 10)
  t = section('oneday', '| Repository | ★ | The day | What it promised |\n|---|--:|---|---|\n' + oneDay.map((r) => `| [${cell(r.repo)}](https://github.com/${r.repo}) | ${r.stars} | ${r.created} | ${cell(short(r.description || '(no description)', 110))} |`).join('\n'))(t)
  writeFileSync(readmeFile, t)
}

writeFileSync(join(root, 'GRAVEYARD.md'), [
  '# The full register', '',
  `Generated by \`scripts/build.mjs\` on ${today}. Sorted by pulse score, highest first. The [page](https://oripka.github.io/pcap-ai-graveyard/) has the same list with search and filters.`, '',
  repoHead, ...list.map(repoRow), '',
].join('\n'))

console.log(`${stats.total} repositories: ${stats.alive} alive, ${stats.coughing} coughing, ${stats.flatlined} flatlined, ${stats.buried} buried, ${stats.embalmed} embalmed; ${stats.one_day} one-day projects; ${stats.hosted} hosted tools`)
