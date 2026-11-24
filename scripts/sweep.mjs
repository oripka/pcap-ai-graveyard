#!/usr/bin/env node
// Sweeps GitHub for AI-era packet analysis repositories and refreshes data/repos.json.
// Needs the gh CLI, logged in (or GH_TOKEN set). No npm dependencies.
// Usage: node scripts/sweep.mjs [--since 2023-01-01]
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const arg = (name, def) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : def }
const since = arg('--since', '2023-01-01')
const today = new Date().toISOString().slice(0, 10)
const lines = (file) => existsSync(file)
  ? readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  : []

const queries = lines(join(root, 'scripts/queries.txt'))
const ignored = new Set(lines(join(root, 'data/ignored.txt')).map((l) => l.toLowerCase()))
const forced = new Set(lines(join(root, 'data/always.txt')).map((l) => l.toLowerCase()))
const reposFile = join(root, 'data/repos.json')
const previous = existsSync(reposFile) ? JSON.parse(readFileSync(reposFile, 'utf8')) : []
const firstSeen = new Map(previous.map((r) => [r.repo.toLowerCase(), r.first_seen]))

// A repository belongs here when it talks about captures AND about AI.
const CAPTURE = /pcap|wireshark|tshark|packet[ -]?(capture|analy[sz]|sniff|inspect|forensic)|scapy|network[ -]forensic/i
const AI = /(^|[^a-z])(ai|llms?|gpt[-0-9a-z.]*|mcp|claude|gemini|ollama|agents?|agentic|copilot|openai|chatgpt|genai|rag|deepseek|langchain|llama[0-9]*|groq|mistral)([^a-z]|$)|natural[ -]language|chatbot|plain english/i
// "Wireshark for X" projects borrow the name but do not read captures.
const NOT_OURS = /wireshark[- ]?(like|style)? (for|of) (mcp|ai|llm|agents?|the|your|docker|k8s|kubernetes)|like wireshark,? (but )?for|packet ?tracer|portfolio|coursework|homework|\bctf writeups?\b/i

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
const gh = (args) => JSON.parse(execFileSync('gh', ['api', ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))

const found = new Map()
for (const q of queries) {
  for (const page of [1, 2]) {
    let res
    try {
      res = gh(['-X', 'GET', 'search/repositories', '-f', `q=${q} created:>=${since} fork:false`,
        '-f', 'sort=updated', '-f', 'per_page=100', '-f', `page=${page}`])
    } catch (e) {
      console.error(`query failed: ${q} (page ${page})`); sleep(20000); continue
    }
    for (const r of res.items) found.set(r.full_name.toLowerCase(), r)
    sleep(2200) // the search API allows 30 requests a minute
    if (res.items.length < 100) break
  }
}

// Repositories listed in data/always.txt are fetched even when no query finds them.
for (const name of forced) {
  if (found.has(name)) continue
  try { found.set(name, gh([`repos/${name}`])) } catch { console.error(`not found: ${name}`) }
}

const repos = []
for (const [key, r] of found) {
  if (ignored.has(key)) continue
  // Topics may supply one of the two halves, never both: a repository whose own
  // name and description mention neither captures nor AI is a stranger.
  const own = `${r.name} ${r.description || ''}`
  const text = `${own} ${(r.topics || []).join(' ')}`
  const fits = CAPTURE.test(text) && AI.test(text) && (CAPTURE.test(own) || AI.test(own)) && !NOT_OURS.test(text)
  if (!forced.has(key) && !fits) continue
  repos.push({
    repo: r.full_name,
    description: (r.description || '').replace(/\s+/g, ' ').trim(),
    stars: r.stargazers_count,
    topics: r.topics || [],
    language: r.language || '',
    homepage: r.homepage && !/github\.com/.test(r.homepage) ? r.homepage : '',
    created: r.created_at.slice(0, 10),
    last_push: r.pushed_at.slice(0, 10),
    archived: !!r.archived,
    first_seen: firstSeen.get(key) || today,
  })
}
repos.sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo))
writeFileSync(reposFile, JSON.stringify(repos, null, 1) + '\n')

const fresh = repos.filter((r) => !firstSeen.has(r.repo.toLowerCase()))
console.log(`${repos.length} repositories listed, ${fresh.length} new since the last sweep`)
for (const r of fresh.slice(0, 200)) console.log(`  + ${r.repo} (${r.stars}★, born ${r.created}) ${r.description.slice(0, 90)}`)
