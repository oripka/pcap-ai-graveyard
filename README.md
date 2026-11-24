<div align="center">

# 🪦 The PCAP AI Graveyard

**Every AI packet analysis tool we could find, ranked by how alive it still is.**

Each one was going to replace Wireshark. Wireshark has not noticed.

### [→ Walk the graveyard](https://oripka.github.io/pcap-ai-graveyard/)

</div>

---

Since 2023 a new "AI-powered PCAP analyzer" has appeared roughly every other day. The recipe is stable: a weekend, tshark or Scapy, an API key, a README with a rocket emoji, a post asking for feedback. Then the weekend ends.

This repository keeps the census. A script sweeps GitHub every week, a second one knocks on the websites, and a third carves the stones. Nobody here judges code. The list only reads dates.

## The numbers

<!-- stats:start -->
**557** repositories and **15** hosted or commercial tools, as of **2026-11-24**.

| | Count | Share |
|---|--:|--:|
| 🫀 Alive | 138 | 25% |
| 🤒 Coughing | 222 | 40% |
| 📉 Flatlined | 135 | 24% |
| 🪦 Buried | 61 | 11% |
| 🏺 Embalmed | 1 | 0% |

- **253** (45%) were created and last pushed on the same date.
- **351** (63%) were worked on for a week or less.
- Median time between creation and last push: **1 day**.
- **376** (68%) have no stars at all. The author did not star it either.
- **111** (20%) are MCP servers.
- Born per year: 2023: 3, 2024: 9, 2025: 91, 2026: 454.
<!-- stats:end -->

## Hosted and commercial plots

Tools with a website instead of, or next to, a repository. There are no stars to count, so the status is whether the site still answers, plus the last sign of life we could find.

<!-- hosted:start -->
| Tool | Kind | Status | Last sign of life | Epitaph |
|---|---|---|---|---|
| [PcapAI](https://pcapai.com) | hosted | 🫀 Alive | 2026-11-24 · site up, upload form live | Alive, and charging nine dollars. That is more business model than most of this cemetery ever had. |
| [logcat.ai PCAP Analyzer](https://logcat.ai/pcap-analyzer/) | hosted | 🫀 Alive | 2026-11-24 · site up | A log analysis company that noticed packets are also logs, if you squint. |
| [NetNerve](https://netnerve.online) | hosted | 🫀 Alive | 2026-11-24 · netnerve.vercel.app redirects to netnerve.online, site up | Outgrew its vercel.app address and moved to a real domain. In this neighbourhood that counts as a dynasty. |
| [PcapAnalyzer](https://pcap-analyzer-seven.vercel.app) | self-hosted | 🫀 Alive | 2026-11-24 · demo up | The newborn. Honest about being a beta, honest about only seeing sample captures. We will be back in six months with flowers or a cake. |
| [Selector Packet Copilot](https://packetcopilot.selector.ai/) | hosted | 🤒 Coughing (HTTP 503) | 2026-11-24 · HTTP 503 on the day we checked | Answered our visit with HTTP 503 and the words 'unconditional drop overload'. Network people will appreciate the root cause being in the banner. |
| [A-Packets](https://apackets.com) | hosted | 🫀 Alive | 2026-11-24 · site up | Was here before the AI tools arrived and will be here after. Listed as the cemetery's groundskeeper. |
| [PacketSnitch](https://packetsnitch.com) | desktop | 🫀 Alive | 2026-11-21 · date printed on the site | The page says 'Last updated: November 21, 2026'. A site that states its own date of last activity. We could retire. |
| [PCAP Analyser (cloudssfdc)](https://www.producthunt.com/products/pcap-analyser) | hosted | ❔ No site of its own | Product Hunt listing only | Four followers and one review on Product Hunt, three stars. Root cause in sixty seconds, audience still pending. |
| [AuraSniff](https://www.producthunt.com/posts/aurasniff) | cli | ❔ No site of its own | Product Hunt listing only | aurasniff.com is a shop for perfume and body spray. We assume it is unrelated. It is still the best-smelling entry here. |
| [VisualEther](https://www.visualether.com) | desktop | 🫀 Alive | 2026-11-24 · site up | An elder that learned MCP. Not vibe-coded, just adapting to the climate. |
| [Cisco Meraki AI PCAP Analyzer](https://documentation.meraki.com/Platform_Management/Dashboard_Administration/Troubleshooting_and_Support/Troubleshooting/AI_PCAP_Analyzer) | vendor | ❔ No site of its own | 2026-07-30 · documentation date | Will not die. Will be renamed. |
| [GNS3 AI packet analysis](https://docs.gns3.com/docs-3.1-en/ai-tools/use-ai-packet-analysis) | vendor | ❔ No site of its own | 2026-11-24 · documentation reachable | Every product gets an AI tab eventually. This is the lab simulator's. |
| [PacketPilot AI](https://packetpilotai.com) | prompt pack | 🫀 Alive | 2026-11-24 · site up | Skipped building the tool and sells the prompts. Possibly the only one here that read the room. |
| [Fraunhofer NetCapVis](https://netcapvis.igd.fraunhofer.de/) | hosted | 🫀 Alive | 2026-11-24 · site up | Publicly funded, therefore immortal. |
| [PacketSafari](https://www.packetsafari.com/analyzer/) | hosted | 🫀 Alive | 2026-11-24 · site up | The undertaker's own plot. Reserved, not yet occupied. Judged by the same rules as everyone else; send a pull request the day it stops moving. |
<!-- hosted:end -->

## The thirty with the strongest pulse

Sorted by [pulse score](#how-this-is-measured). The complete register is in [GRAVEYARD.md](GRAVEYARD.md) and, with search and filters, on [the page](https://oripka.github.io/pcap-ai-graveyard/#register).

<!-- top:start -->
| # | Repository | Status | Pulse | ★ | Born | Last push | Worked on | Epitaph |
|--:|---|---|--:|--:|---|---|--:|---|
| 1 | [ninedter/pcap-hunter](https://github.com/ninedter/pcap-hunter) | 🫀 Alive | 89 | 176 | 2025-11-22 | 2026-11-15 | 358 d | Pulse present. No flowers yet. |
| 2 | [bx33661/Wireshark-MCP](https://github.com/bx33661/Wireshark-MCP) | 🫀 Alive | 87 | 410 | 2026-02-07 | 2026-11-01 | 267 d | 'Production-grade', says PyPI. Still pushing, so no flowers yet. |
| 3 | [khuynh22/mcp-wireshark](https://github.com/khuynh22/mcp-wireshark) | 🫀 Alive | 84 | 70 | 2025-11-04 | 2026-11-16 | 377 d | More than a year of commits. Does not belong here and knows it. |
| 4 | [NotYuSheng/TracePcap](https://github.com/NotYuSheng/TracePcap) | 🫀 Alive | 80 | 57 | 2026-01-31 | 2026-11-24 | 297 d | Pulse present. No flowers yet. |
| 5 | [mcpcap/mcpcap](https://github.com/mcpcap/mcpcap) | 🤒 Coughing | 78 | 54 | 2025-09-09 | 2026-10-06 | 392 d | Last seen pushing in October 2026. Faint pulse. |
| 6 | [sebaandrada-cell/PcapAnalyzer](https://github.com/sebaandrada-cell/PcapAnalyzer) | 🫀 Alive | 73 | 233 | 2026-10-21 | 2026-11-21 | 31 d | Still breathing. We check again next week. |
| 7 | [NormB/sipnab](https://github.com/NormB/sipnab) | 🫀 Alive | 70 | 36 | 2026-06-13 | 2026-11-24 | 164 d | Pulse present. No flowers yet. |
| 8 | [aws-samples/sample-pcap-analyzer-mcp](https://github.com/aws-samples/sample-pcap-analyzer-mcp) | 🫀 Alive | 70 | 14 | 2026-03-11 | 2026-11-23 | 257 d | Alive at the time of writing, which is all anyone can say. |
| 9 | [hvaandres/PcapAnalyzer](https://github.com/hvaandres/PcapAnalyzer) | 🤒 Coughing | 70 | 13 | 2023-12-10 | 2026-10-05 | 1030 d | Last seen pushing in October 2026. Faint pulse. |
| 10 | [A-G-U-P-T-A/wireshark-mcp](https://github.com/A-G-U-P-T-A/wireshark-mcp) | 🤒 Coughing | 66 | 25 | 2025-03-31 | 2026-07-29 | 485 d | Last seen pushing in July 2026. Faint pulse. |
| 11 | [MuthoniGathiithi/Network-Security-AI-agent](https://github.com/MuthoniGathiithi/Network-Security-AI-agent) | 🤒 Coughing | 66 | 6 | 2025-01-16 | 2026-10-07 | 629 d | Quiet since October 2026. Could still be a long holiday. |
| 12 | [RainbowCloudLabs/omcipcap](https://github.com/RainbowCloudLabs/omcipcap) | 🫀 Alive | 63 | 10 | 2026-02-24 | 2026-10-17 | 235 d | Still breathing. We check again next week. |
| 13 | [MoShouSecurity/Easy_Analyzer](https://github.com/MoShouSecurity/Easy_Analyzer) | 🫀 Alive | 60 | 31 | 2026-09-30 | 2026-11-04 | 35 d | Pulse present. No flowers yet. |
| 14 | [Guang84/Network-Analyzer](https://github.com/Guang84/Network-Analyzer) | 🤒 Coughing | 59 | 2 | 2024-05-02 | 2026-09-16 | 867 d | Quiet since September 2026. Could still be a long holiday. |
| 15 | [Anthrasaxx/pcap-alert-pipeline](https://github.com/Anthrasaxx/pcap-alert-pipeline) | 🫀 Alive | 59 | 0 | 2025-06-25 | 2026-11-18 | 511 d | More than a year of commits. Does not belong here and knows it. |
| 16 | [RomainRicord/WireMCP-rs](https://github.com/RomainRicord/WireMCP-rs) | 🫀 Alive | 58 | 3 | 2026-03-05 | 2026-10-26 | 235 d | Alive at the time of writing, which is all anyone can say. |
| 17 | [zombat/sonic](https://github.com/zombat/sonic) | 🫀 Alive | 58 | 1 | 2026-03-04 | 2026-11-19 | 260 d | Pulse present. No flowers yet. |
| 18 | [CyberHorizon-be/sleuthline](https://github.com/CyberHorizon-be/sleuthline) | 🫀 Alive | 57 | 15 | 2026-10-18 | 2026-11-18 | 31 d | Still breathing. We check again next week. |
| 19 | [Gurjas2112/Wireshark_PCAP_Anomaly_Detection](https://github.com/Gurjas2112/Wireshark_PCAP_Anomaly_Detection) | 🫀 Alive | 57 | 0 | 2025-05-29 | 2026-10-31 | 520 d | Still maintained after a year. Visiting, not residing. |
| 20 | [ClementG91/MCP-FlowSentinel](https://github.com/ClementG91/MCP-FlowSentinel) | 🫀 Alive | 56 | 1 | 2026-04-11 | 2026-11-23 | 226 d | Still breathing. We check again next week. |
| 21 | [SyntheticSovereign/Azure-SOC-AI-Enhanced-Homelab](https://github.com/SyntheticSovereign/Azure-SOC-AI-Enhanced-Homelab) | 🫀 Alive | 56 | 1 | 2025-12-29 | 2026-10-19 | 294 d | Pulse present. No flowers yet. |
| 22 | [sergsrgsg/rock-star-skills](https://github.com/sergsrgsg/rock-star-skills) | 🫀 Alive | 55 | 0 | 2025-02-20 | 2026-10-13 | 600 d | More than a year of commits. Does not belong here and knows it. |
| 23 | [bhat-shubham/NetNerve_V0_Demo](https://github.com/bhat-shubham/NetNerve_V0_Demo) | 🤒 Coughing | 53 | 6 | 2025-05-15 | 2026-06-14 | 395 d | Last seen pushing in June 2026. Faint pulse. |
| 24 | [daniissac/framecite](https://github.com/daniissac/framecite) | 🤒 Coughing | 52 | 0 | 2025-02-28 | 2026-09-10 | 559 d | Quiet since September 2026. Could still be a long holiday. |
| 25 | [Kaichera/sniff](https://github.com/Kaichera/sniff) | 🫀 Alive | 52 | 0 | 2025-12-09 | 2026-10-14 | 309 d | Alive at the time of writing, which is all anyone can say. |
| 26 | [nlink-jp/cybersecurity-series](https://github.com/nlink-jp/cybersecurity-series) | 🫀 Alive | 52 | 0 | 2026-03-27 | 2026-11-14 | 232 d | Pulse present. No flowers yet. |
| 27 | [Veer-Parikh/fyp](https://github.com/Veer-Parikh/fyp) | 🤒 Coughing | 52 | 0 | 2025-11-30 | 2026-10-09 | 313 d | Quiet since October 2026. Could still be a long holiday. |
| 28 | [dngames/wirebuddy](https://github.com/dngames/wirebuddy) | 🫀 Alive | 51 | 5 | 2026-10-26 | 2026-11-17 | 22 d | Alive at the time of writing, which is all anyone can say. |
| 29 | [Garasimba/WireMCP-rs](https://github.com/Garasimba/WireMCP-rs) | 🫀 Alive | 51 | 1 | 2026-03-17 | 2026-10-13 | 210 d | Pulse present. No flowers yet. |
| 30 | [w-index-m/syslog-analyzer](https://github.com/w-index-m/syslog-analyzer) | 🫀 Alive | 51 | 1 | 2026-06-30 | 2026-11-19 | 142 d | Still breathing. We check again next week. |
<!-- top:end -->

## One-day wonders

Created and last pushed on the same date. Sorted by the stars collected on the way down.

<!-- oneday:start -->
| Repository | ★ | The day | What it promised |
|---|--:|---|---|
| [krantikumara/-kranti-sip-pcap-analyzer](https://github.com/krantikumara/-kranti-sip-pcap-analyzer) | 133 | 2026-04-18 | AI-powered SIP PCAP analyzer with call flow, hold/resume detection, and GPT-4o chat |
| [tuliperis/SharkMCP](https://github.com/tuliperis/SharkMCP) | 35 | 2025-06-14 | A tshark MCP server for packet capture and analysis |
| [0xhackerfren/Pcap-Analysis-MCP](https://github.com/0xhackerfren/Pcap-Analysis-MCP) | 8 | 2025-12-04 | MCP implementation of PCAP file analysis tools to bring functionality to SOC and DFIR AI agents. |
| [Cyphercoda/LLM-Packet-Analyzer](https://github.com/Cyphercoda/LLM-Packet-Analyzer) | 8 | 2025-04-07 | LLM Packet Analyzer is a Python tool that converts PCAP files into structured JSON data and leverages a local… |
| [pkbythebay29/wireshark-local-rag-analyst](https://github.com/pkbythebay29/wireshark-local-rag-analyst) | 7 | 2025-06-01 | A fully local, self-learning Retrieval-Augmented Generation (RAG) pipeline for analyzing Wireshark `.pcap` lo… |
| [tasselx/wireshark-mcp](https://github.com/tasselx/wireshark-mcp) | 3 | 2026-06-15 | A Model Context Protocol (MCP) server that empowers AI agents with Wireshark/tshark capabilities for deep pac… |
| [Amaze-with-AI/PCAP-Analyzer](https://github.com/Amaze-with-AI/PCAP-Analyzer) | 3 | 2025-10-02 | AI-powered PCAP analyzer with MCP: natural-language flow analysis, QUIC/TCP/UDP detection, and threat insight… |
| [devpal-singh-anand/pcap-analyzer](https://github.com/devpal-singh-anand/pcap-analyzer) | 2 | 2026-05-09 | AI-powered PCAP network traffic analyzer — upload a capture file and get a full forensics dashboard with thre… |
| [wgthomas/wireshark-mcp](https://github.com/wgthomas/wireshark-mcp) | 2 | 2026-02-02 | Network analysis via tshark -- MCP server with 20 tools for capture, analysis, device identification, securit… |
| [privatefound/AI-PCAP-Analyzer](https://github.com/privatefound/AI-PCAP-Analyzer) | 2 | 2025-12-12 | AI PCAP Analyzer revolutionizes network forensics by combining a modern, ultra-wide interface with a Local AI… |
<!-- oneday:end -->

## How this is measured

| | |
|---|---|
| **Who gets in** | Repositories created since 2023 whose name, description or topics mention captures (pcap, Wireshark, tshark, Scapy) *and* AI (LLM, GPT, MCP, agent and friends). Forks are skipped. |
| **Status** | Days since the last push to any branch. Up to 45: 🫀 alive. Up to 180: 🤒 coughing. Up to 365: 📉 flatlined. More: 🪦 buried. Archived by the owner: 🏺 embalmed. |
| **Pulse score** | 0 to 100. 40 points for how recent the last push is, 40 for stars on a log scale (1,000 stars is full marks), 20 for how long the project was worked on, capped at one year. |
| **Worked on** | Days between repository creation and the last push. Zero means it all happened on one date. |
| **Epitaphs** | Generated from the dates. A few are written by hand, in [`data/curated.json`](data/curated.json), where a tool earned it. |

What the numbers cannot tell:

- **"Vibe-coded" is a genre label, not an accusation.** Nobody can see from the outside how a repository was written, and this list does not claim to. Some entries are careful work that simply stopped. Some are finished and need no more commits.
- **A last push is not the last activity.** Issues, releases from another repository or a private rewrite do not show up. A dependabot merge does.
- **Keyword search misses things** and lets strangers in. The first is fixed in [`scripts/queries.txt`](scripts/queries.txt) and [`data/always.txt`](data/always.txt), the second in [`data/ignored.txt`](data/ignored.txt).
- **Hosted tools have no public history.** For them the list says what was seen on the day of the check and nothing more.

## Run it yourself

Needs Node 20 or newer and the [GitHub CLI](https://cli.github.com/), logged in. No packages to install.

```bash
node scripts/sweep.mjs        # search GitHub, refresh data/repos.json, print the newcomers (about 4 minutes)
node scripts/check-sites.mjs  # see which websites still answer, refresh data/sites.json
node scripts/build.mjs        # rebuild docs/data.js, GRAVEYARD.md and the tables in this README
```

A [workflow](.github/workflows/sweep.yml) does the same every Monday and commits the result.

| File | What it holds |
|---|---|
| `scripts/queries.txt` | The GitHub search queries, one per line |
| `data/repos.json` | Every repository found, with stars, dates and the day it was first seen |
| `data/curated.json` | Hosted tools and hand-written epitaphs |
| `data/sites.json` | Result of the last website check |
| `data/always.txt` | Repositories listed even when the search misses them |
| `data/ignored.txt` | Repositories the keywords catch that are not packet tools |
| `docs/` | The page, served by GitHub Pages |

## Resurrections, corrections, removals

- **Your tool is alive?** Push a commit. The next sweep moves you up without anyone's help.
- **Your tool is missing?** Add it to `data/always.txt`, or a hosted tool to `data/curated.json`, and open a pull request. New graves are free.
- **Something is wrong?** Open an issue with the correct date or link.
- **You want out?** Open an issue or add the repository to `data/ignored.txt`. Requests from authors are honoured without discussion.

## Disclosure

This list is kept by the maker of [PacketSafari](https://www.packetsafari.com/), which sells AI packet analysis and is therefore a future resident. It is listed above and judged by the same rules. Pull requests to bury it are accepted the day the dates say so.

## Further viewing

- Chris Greer, [Can AI Analyze Pcaps? The Results Surprised Me!](https://www.youtube.com/@ChrisGreer) (October 2025)
- John Capobianco's [Packet Buddy](https://github.com/automateyournetwork/packet_buddy), where most of this started
- APNIC blog, [PCAP-LM: Helping AI assistants read network traffic](https://blog.apnic.net/2026/11/06/pcap-lm-helping-ai-assistants-read-network-traffic/) (November 2026)

## License

Scripts and page: [MIT](LICENSE). The data is facts from public APIs; do what you like with it.

<sub>No tools were harmed in the making of this list. Most were already like this when we found them.</sub>
