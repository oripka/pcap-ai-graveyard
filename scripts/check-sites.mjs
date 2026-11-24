#!/usr/bin/env node
// Checks whether the websites of listed tools still answer, and writes data/sites.json.
// Covers the hosted tools in data/curated.json and every repository homepage in data/repos.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f, d) => existsSync(join(root, f)) ? JSON.parse(readFileSync(join(root, f), 'utf8')) : d
const curated = read('data/curated.json', { hosted: [] })
const repos = read('data/repos.json', [])
const sites = read('data/sites.json', {})
const today = new Date().toISOString().slice(0, 10)

const urls = new Set([...curated.hosted.map((h) => h.url), ...repos.map((r) => r.homepage)]
  .filter((u) => /^https?:\/\//.test(u || '') && !/127\.0\.0\.1|localhost/.test(u)))

const check = async (url) => {
  try {
    const res = await fetch(url, {
      redirect: 'follow', signal: AbortSignal.timeout(20000),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; pcap-ai-graveyard; +https://github.com/oripka/pcap-ai-graveyard)' },
    })
    return { status: res.status, final: res.url !== url ? res.url : undefined }
  } catch (e) {
    return { status: 0, error: (e.cause && e.cause.code) || e.name }
  }
}

const list = [...urls]
for (let i = 0; i < list.length; i += 8) {
  await Promise.all(list.slice(i, i + 8).map(async (url) => {
    const r = await check(url)
    const was = sites[url]
    // Keep the date a site was last seen answering, so a dead one shows when it died.
    const ok = r.status >= 200 && r.status < 400
    sites[url] = { ...r, checked: today, last_up: ok ? today : (was && (was.last_up || (was.status < 400 && was.status > 0 ? was.checked : undefined))) }
    console.log(`${String(r.status).padStart(3)} ${url}${r.error ? ' ' + r.error : ''}`)
  }))
}
for (const url of Object.keys(sites)) if (!urls.has(url)) delete sites[url]
writeFileSync(join(root, 'data/sites.json'), JSON.stringify(sites, null, 1) + '\n')
