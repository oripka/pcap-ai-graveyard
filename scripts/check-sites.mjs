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

const hostedUrls = new Set(curated.hosted.filter((h) => !h.no_site).map((h) => h.url))
const urls = new Set([...curated.hosted.filter((h) => !h.no_site).map((h) => h.url), ...repos.map((r) => r.homepage)]
  .filter((u) => /^https?:\/\//.test(u || '') && !/127\.0\.0\.1|localhost/.test(u)))

const UA = 'Mozilla/5.0 (compatible; pcap-ai-graveyard; +https://github.com/oripka/pcap-ai-graveyard)'
const day = (v) => { const t = Date.parse(v); return Number.isFinite(t) && t > Date.parse('2015-01-01') && t < Date.now() + 86400000 ? new Date(t).toISOString().slice(0, 10) : null }

// When was this page last edited? In order: a date the page prints or declares,
// the Last-Modified header (unless it is simply "now"), the newest entry in the sitemap.
const editDate = async (res, html, url) => {
  const meta = /(?:article:modified_time|og:updated_time|dateModified|last-modified)["'][^>]*?content=["']([^"']+)|"dateModified"\s*:\s*"([^"]+)"/i.exec(html)
  if (meta && day(meta[1] || meta[2])) return [day(meta[1] || meta[2]), 'declared by the page']
  const printed = /(?:last\s+updated|updated\s+on|last\s+modified)\s*:?\s*(?:<[^>]+>\s*)*([A-Z][a-z]+\.? \d{1,2},? \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2} [A-Z][a-z]+ \d{4})/i.exec(html)
  if (printed && day(printed[1] + ' UTC')) return [day(printed[1] + ' UTC'), 'printed on the page']
  const lm = res.headers.get('last-modified')
  if (lm && day(lm) && Date.now() - Date.parse(lm) > 10 * 60 * 1000) return [day(lm), 'Last-Modified header']
  try {
    const sm = await fetch(new URL('/sitemap.xml', url), { signal: AbortSignal.timeout(15000), headers: { 'user-agent': UA } })
    if (sm.ok) {
      const all = [...(await sm.text()).matchAll(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/g)].map((m) => day(m[1])).filter(Boolean).sort()
      if (all.length) return [all[all.length - 1], 'newest sitemap entry']
    }
  } catch {}
  return [null, null]
}

const check = async (url) => {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': UA } })
    const out = { status: res.status, final: res.url !== url ? res.url : undefined }
    if (res.ok && hostedUrls.has(url)) {
      const [modified, source] = await editDate(res, (await res.text()).slice(0, 600000), res.url)
      if (modified) { out.modified = modified; out.modified_source = source }
    }
    return out
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
    // 401, 403 and 429 mean a server answered and turned a robot away: the site is up.
    const ok = (r.status >= 200 && r.status < 400) || [401, 403, 429].includes(r.status)
    // A page that hid its date today keeps the one it showed before.
    if (!r.modified && was && was.modified) { r.modified = was.modified; r.modified_source = was.modified_source }
    sites[url] = { ...r, checked: today, last_up: ok ? today : (was && (was.last_up || undefined)) }
    console.log(`${String(r.status).padStart(3)} ${url}${r.error ? ' ' + r.error : ''}`)
  }))
}
for (const url of Object.keys(sites)) if (!urls.has(url)) delete sites[url]
writeFileSync(join(root, 'data/sites.json'), JSON.stringify(sites, null, 1) + '\n')
