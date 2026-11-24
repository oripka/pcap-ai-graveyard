#!/usr/bin/env node
// For the repositories with the longest span between creation and last push, counts the
// months in which anything was committed. A long span with three commits is not a long life.
// Writes data/activity.json. Needs the gh CLI.
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const raw = JSON.parse(readFileSync(join(root, 'data/repos.json'), 'utf8'))
const repos = Array.isArray(raw) ? raw : raw.repos
const span = (r) => (Date.parse(r.last_push) - Date.parse(r.created)) / 864e5
const TOP = 40
const out = {}
for (const r of [...repos].sort((a, b) => span(b) - span(a)).slice(0, TOP)) {
  const months = new Set(); let commits = 0
  try {
    for (let page = 1; page <= 5; page++) {
      const dates = JSON.parse(execFileSync('gh', ['api', `repos/${r.repo}/commits?per_page=100&page=${page}`, '--jq', '[.[].commit.author.date]'], { encoding: 'utf8' }))
      for (const d of dates) { months.add(d.slice(0, 7)); commits++ }
      if (dates.length < 100) break
    }
  } catch { continue }
  out[r.repo] = { active_months: months.size, commits, capped: commits >= 500 }
  console.log(`${r.repo}: ${months.size} months, ${commits} commits`)
}
writeFileSync(join(root, 'data/activity.json'), JSON.stringify({ checked: new Date().toISOString().slice(0, 10), top: TOP, repos: out }, null, 2) + '\n')
