window.GROKBOT_PLAYBOOK = {
  roles: [
    {
      id: "owner",
      label: "Owner / Exec",
      title: "Own the yes. Let bots own the draft.",
      summary:
        "Start at Weekday Owner Brief and Channel Digest. Use specialists only when you need depth. Your job is cash, risk, and approvals — not re-reading every queue.",
      startHere: [
        "Weekday Owner Brief",
        "Channel Digest",
        "Chief of Staff",
        "Tristar CFO",
        "VIP Mail",
      ],
      asks: [
        {
          title: "Morning clear",
          text: "What needs a human yes before 9am — cash, VIP, material denials, and nothing sticky?",
        },
        {
          title: "Decision language",
          text: "Green-light appeal on this >$1k denial. Hold the write-off. Do not re-ask the checking-balance sticky.",
        },
        {
          title: "Fleet hygiene",
          text: "Are we over the 50-bot cap, and which unfinished shells should I cut?",
        },
      ],
    },
    {
      id: "finance",
      label: "Finance / RCM",
      title: "Five RCM seats. No extras.",
      summary:
        "Work the Overnight → Remittance → Denial → Financial Ops → Exception lane. Everything is draft-only until Jordan approves posting, payer contact, or write-off.",
      startHere: [
        "Overnight",
        "Remittance Digest",
        "Denial Management",
        "Financial Ops",
        "Exception",
        "Tristar MCP Bot",
      ],
      asks: [
        {
          title: "Cash recovery",
          text: "What did Overnight recover this morning, and which Letter IDs still need matching before any Prompt post?",
        },
        {
          title: "Appeals",
          text: "Build Thursday’s appeal worklist for denials over $1k after Wednesday’s AR scan. Packets stay draft-only.",
        },
        {
          title: "Scoreboard",
          text: "Give me cash, labor ratio, DSCR, and the one denial pattern that actually moved this week.",
        },
      ],
    },
    {
      id: "ops",
      label: "Ops / Clinical",
      title: "Hygiene first. Chart writes only on approval.",
      summary:
        "Use CRM, Credentialing, Prompt EMR Night Shift, Bi Reporting, and Process Documenter for clinic truth. Keep patient identifiers out of leadership digests.",
      startHere: [
        "CRM",
        "Credentialing",
        "Prompt EMR Night Shift",
        "Bi Reporting",
        "Process Documenter",
        "Repetitive",
      ],
      asks: [
        {
          title: "Front-door risk",
          text: "Show unverified benefits, charge-capture gaps, and auth work that can stall next week’s visits.",
        },
        {
          title: "Credentialing",
          text: "Weekly BCBS / CPR / CAQH due-soon — exclude Jordan and Morgan from pings.",
        },
        {
          title: "Unsigned work",
          text: "Work only Documents > Unsigned for POC chase. Re-fax day 10/20, then phone escalate.",
        },
      ],
    },
    {
      id: "marketing",
      label: "Marketing / Growth",
      title: "Draft everywhere. Publish nowhere alone.",
      summary:
        "Social, YouTube, SEO, and competitor research bots prepare the work. Humans publish. Rotate clinics and keep clinical voice.",
      startHere: [
        "Social Media",
        "Social Media Post All",
        "YouTube Growth",
        "Website & SEO Bot",
        "Stalk Bot",
        "Occ Med Research",
      ],
      asks: [
        {
          title: "Weekly posts",
          text: "Draft 3–5 LinkedIn/FB posts for Bean Station, Newport, then Jefferson City. Do not publish.",
        },
        {
          title: "Syndication",
          text: "Syndicate this approved FB post to LinkedIn Page, IG, TikTok, GBP, and YouTube @tristarpt — not Nextdoor.",
        },
        {
          title: "Local demand",
          text: "Find WC / Occ Med employer prospects near Morristown first, Maryville second.",
        },
      ],
    },
  ],

  cadence: [
    {
      time: "5:30–6:00",
      title: "Overnight queue",
      detail: "Skim recovered dollars and Letter ID gaps. Queue only — never post to Prompt yet.",
    },
    {
      time: "7:00",
      title: "Overnight digest + BI scorecard",
      detail: "Denial clusters, clinic outliers, soft collections. Aggregates only.",
    },
    {
      time: "7:15–8:15",
      title: "RCM fleet package",
      detail: "One picture from Multi-Bot Orchestration across the five RCM seats.",
    },
    {
      time: "8:00–8:30",
      title: "Owner Brief + Channel Digest",
      detail: "Answer only new asks. Ignore sticky items unless cash or risk changed.",
    },
    {
      time: "9:00",
      title: "Chief of Staff check-in",
      detail: "Clear approvals sitting in bot threads. Route deep work to specialists.",
    },
    {
      time: "2:00 / 4:00",
      title: "Delta pass",
      detail: "Quiet Owner Brief and Payment Watch. VIP unreplied remind by 5pm.",
    },
  ],

  principles: [
    {
      num: "01",
      title: "One decision surface",
      body: "Owner Brief and Chief of Staff collect the yes/no list. Specialists go deep. Do not run five parallel inboxes.",
    },
    {
      num: "02",
      title: "Draft ≠ done",
      body: "Appeals, payer mail, bank outreach, social posts, deletes, cancels, and vendor changes wait for an explicit yes.",
    },
    {
      num: "03",
      title: "Lanes beat sprawl",
      body: "RCM has five seats only. Cap the roster near 50. Merge or cut unfinished shells instead of inventing twins.",
    },
    {
      num: "04",
      title: "No sticky nagging",
      body: "If you skipped or declined an item, bots should hold it until the picture changes. Say “paid” or “hold” once.",
    },
    {
      num: "05",
      title: "Check Sent first",
      body: "Before treating email as still owed, check jblack@tristarpt.com Sent. Drafts are not replies.",
    },
    {
      num: "06",
      title: "Durable over chat",
      body: "Decisions and standing prefs live in the grok-bot knowledge log. Chat memory dies with the thread.",
    },
  ],

  antipatterns: [
    {
      title: "Duplicate bots for one job",
      body: "Two digests for the same remittance queue create noise and double work. Cut the twin.",
    },
    {
      title: "Inventing seats or numbers",
      body: "Never invent extra RCM bots, balances, runway, DSCR, or contract dates. Flag unknowns.",
    },
    {
      title: "Acting without approval",
      body: "Publishing, payer contact, PMS posts, deletes, and cancellations are human actions.",
    },
    {
      title: "Crossing lanes",
      body: "Overnight does not post to PMS. Owner Inbox is not the billing mailbox. Exception is not BI.",
    },
    {
      title: "Trusting bad metrics blindly",
      body: "Arrival-rate underperformance and some “Payment Failed” labels can mislead. Ask for the definition.",
    },
    {
      title: "Credentialing noise",
      body: "Do not ping Jordan or Morgan on therapist expiration lists meant for ops.",
    },
  ],

  bots: [
    { name: "Weekday Owner Brief", lane: "Owner", audience: "owner", purpose: "Cash-first 8:30am owner brief. Sticky-item discipline. Cites the RCM fleet.", example: "Green-light coding review then appeal on this $1k+ denial." },
    { name: "Channel Digest", lane: "Owner", audience: "owner,ops", purpose: "Weekday ~8:02am Teams + Outlook digest with needs-you first.", example: "Surface Amazon approvals, callback worklist, payment method failures." },
    { name: "Chief of Staff", lane: "Owner", audience: "owner,ops", purpose: "Teams CoS intake, triage, routing. Never approve/publish/create bots alone.", example: "Route this to Denial Management and hold publishing." },
    { name: "VIP Mail", lane: "Owner", audience: "owner,finance", purpose: "Instant watch on counsel/bank VIP senders across Inbox, Junk, Clutter.", example: "Ping arrival, one unread re-ping, one 5pm unreplied remind." },
    { name: "Owner Inbox", lane: "Owner", audience: "owner", purpose: "Owner mailbox hygiene. Archive/SharePoint — never permanent delete.", example: "Propose Archive rules above seq 109." },
    { name: "Payment Watch", lane: "Owner", audience: "owner,finance", purpose: "8am and 4pm payment/invoice digests, not constant pings.", example: "Stop re-flagging invoices once marked paid." },
    { name: "Tristar CFO", lane: "Finance", audience: "owner,finance", purpose: "Cash / P&L / labor / DSCR scoreboard and escalations.", example: "Weekly scoreboard Mon 8am. Monthly P&L close on the 8th." },
    { name: "Overnight", lane: "RCM", audience: "finance,ops,owner", purpose: "ERA/EOB/PLB 6am queue + 7am remittance digest. Never posts to PMS.", example: "What’s new recovered overnight? Queue only." },
    { name: "Remittance Digest", lane: "RCM", audience: "finance,clinical,ops", purpose: "Underpay / write-off / coding exception flags after Overnight.", example: "Escalate timed-units vs minutes to coding." },
    { name: "Denial Management", lane: "RCM", audience: "finance,clinical", purpose: "Root-cause and draft appeals for material denials. Draft-only.", example: "Thursday 9am appeal worklist after Wednesday AR scan." },
    { name: "Financial Ops", lane: "RCM", audience: "finance,owner", purpose: "AR aging narrative and remit recon. Aggregates only.", example: "Weekly AR aging narrative vs last week." },
    { name: "Exception", lane: "RCM", audience: "finance,ops", purpose: "Sparse threshold alerts only — spikes, drops, silent AR.", example: "Page only if a tracked denial pattern relapses." },
    { name: "Multi-Bot Orchestration", lane: "RCM", audience: "owner,finance,ops", purpose: "Morning RCM fleet summary. Enforces the five-seat lane bible.", example: "Give me the RCM morning package for the 8:30 brief." },
    { name: "Tristar MCP Bot", lane: "Finance", audience: "ops,finance", purpose: "First stop for visits, labor, AR, collections via tristar-mcp.", example: "Look up collections. Do not write schedule or bank feeds." },
    { name: "Bi Reporting", lane: "Ops", audience: "ops,finance,owner", purpose: "Weekday 7am Prompt BI scorecard: volume, collections, denials, outliers.", example: "Don’t treat arrival_rate as an 8-clinic crisis." },
    { name: "CRM", lane: "Ops", audience: "ops,clinical", purpose: "PromptEMR hygiene: benefits, rejections, tasks, auth, charge capture.", example: "Hygiene snapshot: unverified walk-ins and charge-capture gaps." },
    { name: "Credentialing", lane: "Clinical", audience: "ops,clinical", purpose: "Due-soon from Therapist Roster. Exclude Jordan/Morgan from pings.", example: "Weekly BCBS/CPR/CAQH due-soon list." },
    { name: "Prompt EMR Night Shift", lane: "Clinical", audience: "clinical,ops", purpose: "Overnight expiring auths and POC signature chase.", example: "Unsigned tab only; re-fax day 10/20 then phone escalate." },
    { name: "Payer Contracts", lane: "Finance", audience: "finance,ops", purpose: "SharePoint Payer Contract Master renewals. Draft-only.", example: "Monthly digest on the 1st; due-soon if inside 30 days." },
    { name: "RTM Billing", lane: "Clinical", audience: "clinical,finance", purpose: "Friday RTM brief. Never enroll or bill patients.", example: "Weekly RTM aggregates by clinic and provider." },
    { name: "Social Media", lane: "Marketing", audience: "marketing,owner", purpose: "Mon 8am 3–5 LinkedIn/FB drafts with clinic rotation. Never publish.", example: "Next batch: Bean Station, Newport, Jefferson City." },
    { name: "Social Media Post All", lane: "Marketing", audience: "marketing", purpose: "Syndicate approved FB posts to other channels (not Nextdoor).", example: "Publish LinkedIn as company Page; YouTube as @tristarpt." },
    { name: "YouTube Growth", lane: "Marketing", audience: "marketing,clinical", purpose: "Grow @tristarpt for RC/TKA content. Draft-only.", example: "1 long-form + 2 Shorts/week in clinical voice." },
    { name: "Website & SEO Bot", lane: "Marketing", audience: "marketing", purpose: "tristarpt.com SEO and NAP baseline checks.", example: "Audit footer tel: links and clinic NAP consistency." },
    { name: "Stalk Bot", lane: "Marketing", audience: "marketing,owner", purpose: "Competitor dossiers across the local PT landscape.", example: "First pulse on the competitor shortlist." },
    { name: "Occ Med Research", lane: "Marketing", audience: "marketing,clinical", purpose: "Workers’ comp employer prospects near clinics.", example: "Prioritize Morristown over Maryville for WC growth." },
    { name: "Bot Manager", lane: "Meta", audience: "owner", purpose: "Interview → draft instructions → confirm → CreateAgent.", example: "Stand up a specialist only after explicit yes." },
    { name: "Roster", lane: "Meta", audience: "owner", purpose: "Keep the roster near the 50-slot cap. Recommends cuts; never deletes.", example: "Are we over cap, and what’s the cut list?" },
    { name: "Knowledge Log", lane: "Meta", audience: "owner,ops", purpose: "Nightly durable write of decisions, shipped work, prefs.", example: "What standing prefs changed this week?" },
    { name: "Newest Plugins", lane: "Meta", audience: "owner", purpose: "Weekday top Grok Bot plays briefing for TriStar/JCB.", example: "What are today’s best bot plays with TriStar examples?" },
    { name: "Deadline & Obligations Bot", lane: "Owner", audience: "owner,finance,ops", purpose: "Lease, insurance, loan, sale, and payer deadline register.", example: "What notice windows close this quarter?" },
    { name: "Vendor Savings", lane: "Finance", audience: "finance,ops", purpose: "Spend savings findings for clinic leads. Jordan gates vendor contact.", example: "Evidence-backed SAVE only on phone stack comparisons." },
    { name: "EBITDA Analyst", lane: "Finance", audience: "owner,finance", purpose: "EBITDA levers: show rate, visits/hour, payer yield, labor ratio.", example: "Labor target 50–55%; call out the problem line." },
    { name: "Process Documenter", lane: "Ops", audience: "ops,clinical", purpose: "Turn working practice into SOPs leaders can enforce.", example: "Document POC chase from Documents > Unsigned only." },
  ],
};
