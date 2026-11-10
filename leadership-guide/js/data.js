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
      example:
        "Bot: “$18.4k recovered across 3 payers. 2 Letter IDs unmatched — hold Prompt post.” You: “Match those two, then queue. Do not post.”",
    },
    {
      time: "7:00",
      title: "Overnight digest + BI scorecard",
      detail: "Denial clusters, clinic outliers, soft collections. Aggregates only.",
      example:
        "Bot: “Bean Station soft collections; Humana timed-units spike. No PHI.” You: “Send the Humana cluster to Remittance Digest for coding flag.”",
    },
    {
      time: "7:15–8:15",
      title: "RCM fleet package",
      detail: "One picture from Multi-Bot Orchestration across the five RCM seats.",
      example:
        "Ask Multi-Bot: “RCM morning package for the 8:30 brief — cite fleet, don’t re-pull PLB.”",
    },
    {
      time: "8:00–8:30",
      title: "Owner Brief + Channel Digest",
      detail: "Answer only new asks. Ignore sticky items unless cash or risk changed.",
      example:
        "Bot re-asks checking balance. You: “Sticky — do not re-ask unless cash picture changes. Green-light the $1.2k appeal only.”",
    },
    {
      time: "9:00",
      title: "Chief of Staff check-in",
      detail: "Clear approvals sitting in bot threads. Route deep work to specialists.",
      example:
        "You: “Route the unsigned POC backlog to Prompt EMR Night Shift. Status only back in CoS.”",
    },
    {
      time: "2:00 / 4:00",
      title: "Delta pass",
      detail: "Quiet Owner Brief and Payment Watch. VIP unreplied remind by 5pm.",
      example:
        "VIP Mail: “Jeff Taylor still unreplied at 4:55.” You: “Draft a 3-line reply. Do not send.”",
    },
  ],

  scenarios: [
    {
      id: "denial",
      tag: "Finance / RCM",
      title: "Material denial needs an appeal",
      situation:
        "Wednesday AR scan found a Humana denial over $1k. Thursday is appeal day. Packet must stay draft-only.",
      bot: "Denial Management",
      steps: [
        {
          who: "You",
          text: "Build Thursday’s appeal worklist for denials over $1k from Wednesday’s AR scan. Packets stay draft-only. No payer email.",
        },
        {
          who: "Bot",
          text: "3 appeals drafted. Top item: Humana timed-units vs minutes, ~$1.4k. Root cause looks coding, not eligibility. Awaiting green-light.",
        },
        {
          who: "You",
          text: "Green-light coding review then appeal on the $1.4k. Hold the other two. Do not send payer mail yet.",
        },
      ],
      why: "You named the threshold, kept draft-only explicit, and answered with decide language — not ‘looks good’.",
    },
    {
      id: "owner-morning",
      tag: "Owner",
      title: "8:30 Owner Brief with sticky noise",
      situation:
        "Owner Brief re-asks checking balance and a declined RingBoost pack while a real VIP and a denial need answers.",
      bot: "Weekday Owner Brief",
      steps: [
        {
          who: "Bot",
          text: "Needs-you: (1) checking balance sticky (2) RingBoost pack (3) VIP Amy unread 18m (4) $1.2k denial appeal draft ready.",
        },
        {
          who: "You",
          text: "Ignore (1) and (2) unless cash/risk changed. Draft a reply for Amy — do not send. Green-light the $1.2k appeal.",
        },
        {
          who: "Bot",
          text: "Sticky items held. Amy reply drafted in thread. Appeal marked green-light / draft-only until send approval.",
        },
      ],
      why: "One decision surface. Sticky discipline keeps the brief short enough that leaders actually clear it.",
    },
    {
      id: "remit",
      tag: "Finance",
      title: "Overnight recovered cash — do not post yet",
      situation:
        "Overnight queued ERAs with two unmatched Letter IDs. Someone asks if they can post to Prompt now.",
      bot: "Overnight",
      steps: [
        {
          who: "You",
          text: "What’s new recovered overnight? List unmatched Letter IDs. Queue only — nothing posted to Prompt, no mail, no payer contact.",
        },
        {
          who: "Bot",
          text: "$12.7k recovered. Letter IDs 55340 and 88211 unmatched. BlueCare 55340 positive WO PLB may be money withheld — match before posting.",
        },
        {
          who: "You",
          text: "Hold Prompt post until both IDs match. Escalate 55340 to Remittance Digest as an exception flag.",
        },
      ],
      why: "Overnight never posts to PMS. Matching Letter IDs prevents false ‘recovered’ cash from hitting the books.",
    },
    {
      id: "social",
      tag: "Marketing",
      title: "Monday clinic content batch",
      situation:
        "Marketing needs this week’s posts. Clinics rotate. Nothing publishes until a human says so.",
      bot: "Social Media",
      steps: [
        {
          who: "You",
          text: "Draft 4 LinkedIn/FB posts. Lead Bean Station, then Newport, Jefferson City, Johnson City. Clinical voice. Do not publish.",
        },
        {
          who: "Bot",
          text: "4 drafts ready with clinic tags and suggested images. Waiting for edit + publish approval.",
        },
        {
          who: "You",
          text: "Approve posts 1–3. Kill post 4. After FB publish, syndicate 1–3 via Social Media Post All — LinkedIn as company Page, not Nextdoor.",
        },
      ],
      why: "Draft → human edit → publish → syndicate. Bots never skip the human publish gate.",
    },
    {
      id: "ops",
      tag: "Ops / Clinical",
      title: "Unsigned POC backlog before it stalls visits",
      situation:
        "Clinic leads report notes piling up. Leadership needs a clean chase path without chart writes by the bot.",
      bot: "Prompt EMR Night Shift",
      steps: [
        {
          who: "You",
          text: "Work only Documents > Unsigned. Re-fax day 10/20, then phone escalate. Flag any chart write for human approval. Aggregates only in the digest.",
        },
        {
          who: "Bot",
          text: "14 unsigned. 6 at day-10 re-fax, 2 ready for phone escalate. No chart writes made.",
        },
        {
          who: "You",
          text: "Proceed with re-fax and phone escalate per SOP. Ask Process Documenter to refresh the POC Signature Chase SOP if anything drifted.",
        },
      ],
      why: "Lane + SOP + no silent chart writes. Ops gets motion without bots becoming clinicians.",
    },
    {
      id: "cos",
      tag: "Owner / Ops",
      title: "Something landed in the wrong place",
      situation:
        "A physician newsletter idea, a denial question, and a vendor quote all hit the same Teams thread.",
      bot: "Chief of Staff",
      steps: [
        {
          who: "You",
          text: "Triage this thread. Content → Social Media. Denial question → Denial Management. Vendor quote → Vendor Savings. Status report only in CoS. Never approve or publish from here.",
        },
        {
          who: "Bot",
          text: "Routed three ways. Denial Management has the claim question. Social Media drafting newsletter angle. Vendor Savings holding contact until your go.",
        },
        {
          who: "You",
          text: "Good. I’ll approve inside those bot threads, not here.",
        },
      ],
      why: "CoS routes. Approvals stay in specialist threads so audit trails and lane rules survive.",
    },
  ],

  promptBank: [
    {
      bad: "Can you handle denials today?",
      good: "Build Thursday’s appeal worklist for denials over $1k after Wednesday’s AR scan. Packets stay draft-only. No payer email until I green-light.",
      tip: "Name the bot lane, threshold, and draft vs send.",
    },
    {
      bad: "What’s going on with cash?",
      good: "Give me cash, labor ratio, DSCR, and the one denial pattern that actually moved this week. Invent no balances.",
      tip: "Ask for the scoreboard + one insight, and ban invented numbers.",
    },
    {
      bad: "Post something for the clinics.",
      good: "Draft 3–5 LinkedIn/FB posts for Bean Station, Newport, then Jefferson City. Clinical voice. Do not publish.",
      tip: "Clinic rotation + draft-only beats vague ‘post something’.",
    },
    {
      bad: "Follow up on that email.",
      good: "Before treating this as still owed, check Sent at jblack@tristarpt.com. If unreplied, draft a 3-line reply — do not send.",
      tip: "Sent-folder rule kills false open work.",
    },
    {
      bad: "Keep reminding me about the checking balance.",
      good: "Do not re-ask the checking-balance sticky unless the cash picture changes.",
      tip: "Sticky discipline is a feature. Use it.",
    },
    {
      bad: "Make a new bot for remits.",
      good: "Use Overnight + Remittance Digest. Do not invent an extra RCM seat. Summarize the morning package through Multi-Bot Orchestration.",
      tip: "Five RCM seats only. Route before you spawn.",
    },
    {
      bad: "Clean up Outlook however you want.",
      good: "Show the full proposed Archive/unsubscribe list first. Never delete, unsubscribe, or send without explicit approval.",
      tip: "Mail bots propose; leaders dispose.",
    },
    {
      bad: "Tell credentialing to nag everyone.",
      good: "Weekly BCBS/CPR/CAQH due-soon from Therapist Roster. Exclude Jordan and Morgan from pings.",
      tip: "Audience filters prevent owner noise.",
    },
  ],

  weekPlan: [
    {
      day: "Mon",
      items: [
        "CFO scoreboard (cash, labor, DSCR)",
        "Research payer-policy delta",
        "Social Media draft batch",
        "YouTube growth plan",
      ],
    },
    {
      day: "Tue",
      items: [
        "Outlook Cleanout proposals (show full list)",
        "Credentialing due-soon skim",
        "CRM hygiene snapshot",
      ],
    },
    {
      day: "Wed",
      items: [
        "AR / Denials aging scan",
        "Feed Thursday appeal worklist",
        "Vendor / payment deltas only",
      ],
    },
    {
      day: "Thu",
      items: [
        "Denial Management appeal drafts",
        "Financial Ops AR aging narrative",
        "Owner decisions on >$1k packets",
      ],
    },
    {
      day: "Fri",
      items: [
        "RTM Billing weekly brief",
        "CoS content status (~4pm)",
        "Clear leftover approvals before weekend",
      ],
    },
    {
      day: "Month",
      items: [
        "1st: Payer Contracts digest + Subscriptions Cleanout",
        "8th: CFO P&L close",
        "As needed: Roster cap / unfinished shell cuts",
      ],
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
      example: "Wrong: stand up ‘Remit Alerts 2’. Right: keep Overnight + Remittance Digest lanes.",
    },
    {
      title: "Inventing seats or numbers",
      body: "Never invent extra RCM bots, balances, runway, DSCR, or contract dates. Flag unknowns.",
      example: "Wrong: ‘DSCR is fine.’ Right: ‘DSCR unknown — need CFO pull, do not invent.’",
    },
    {
      title: "Acting without approval",
      body: "Publishing, payer contact, PMS posts, deletes, and cancellations are human actions.",
      example: "Wrong: bot emails the payer. Right: ‘Appeal drafted. Awaiting green-light to send.’",
    },
    {
      title: "Crossing lanes",
      body: "Overnight does not post to PMS. Owner Inbox is not the billing mailbox. Exception is not BI.",
      example: "Wrong: Overnight posts ERA to Prompt. Right: queue + digest only.",
    },
    {
      title: "Trusting bad metrics blindly",
      body: "Arrival-rate underperformance and some “Payment Failed” labels can mislead. Ask for the definition.",
      example: "Wrong: ‘All 8 clinics are in crisis.’ Right: ‘Define arrival_rate before we escalate.’",
    },
    {
      title: "Credentialing noise",
      body: "Do not ping Jordan or Morgan on therapist expiration lists meant for ops.",
      example: "Wrong: owner ping on CPR expiry. Right: ops-only due-soon list.",
    },
  ],

  bots: [
    { name: "Weekday Owner Brief", lane: "Owner", audience: "owner", purpose: "Cash-first 8:30am owner brief. Sticky-item discipline. Cites the RCM fleet.", example: "Green-light coding review then appeal on this $1k+ denial.", copy: "What needs a human yes before 9am — cash, VIP, material denials — and hold every sticky unless the picture changed?" },
    { name: "Channel Digest", lane: "Owner", audience: "owner,ops", purpose: "Weekday ~8:02am Teams + Outlook digest with needs-you first.", example: "Surface Amazon approvals, callback worklist, payment method failures.", copy: "Needs-you first digest for Teams + Outlook. Skip anything already answered in Sent." },
    { name: "Chief of Staff", lane: "Owner", audience: "owner,ops", purpose: "Teams CoS intake, triage, routing. Never approve/publish/create bots alone.", example: "Route this to Denial Management and hold publishing.", copy: "Triage this thread. Route content to Social Media, denials to Denial Management. Status only here — never approve or publish from CoS." },
    { name: "VIP Mail", lane: "Owner", audience: "owner,finance", purpose: "Instant watch on counsel/bank VIP senders across Inbox, Junk, Clutter.", example: "Ping arrival, one unread re-ping, one 5pm unreplied remind.", copy: "VIP arrived from counsel/bank. Draft a 3-line reply after checking Sent. Do not send." },
    { name: "Owner Inbox", lane: "Owner", audience: "owner", purpose: "Owner mailbox hygiene. Archive/SharePoint — never permanent delete.", example: "Propose Archive rules above seq 109.", copy: "Propose Archive rules above seq 109. Never permanently delete. Billing mailbox is out of lane." },
    { name: "Payment Watch", lane: "Owner", audience: "owner,finance", purpose: "8am and 4pm payment/invoice digests, not constant pings.", example: "Stop re-flagging invoices once marked paid.", copy: "Paid invoice #13659 — stop re-flagging. 4pm digest deltas only." },
    { name: "Tristar CFO", lane: "Finance", audience: "owner,finance", purpose: "Cash / P&L / labor / DSCR scoreboard and escalations.", example: "Weekly scoreboard Mon 8am. Monthly P&L close on the 8th.", copy: "Weekly scoreboard: cash, labor ratio, DSCR, and the one denial pattern that moved. Invent no balances." },
    { name: "Overnight", lane: "RCM", audience: "finance,ops,owner", purpose: "ERA/EOB/PLB 6am queue + 7am remittance digest. Never posts to PMS.", example: "What’s new recovered overnight? Queue only.", copy: "What’s new recovered overnight? List unmatched Letter IDs. Queue only — no Prompt post, no mail, no payer contact." },
    { name: "Remittance Digest", lane: "RCM", audience: "finance,clinical,ops", purpose: "Underpay / write-off / coding exception flags after Overnight.", example: "Escalate timed-units vs minutes to coding.", copy: "Flag underpay / WO / timed-units exceptions from Overnight’s queue. Escalate coding issues — do not duplicate the 7am digest." },
    { name: "Denial Management", lane: "RCM", audience: "finance,clinical", purpose: "Root-cause and draft appeals for material denials. Draft-only.", example: "Thursday 9am appeal worklist after Wednesday AR scan.", copy: "Build Thursday’s appeal worklist for denials over $1k after Wednesday’s AR scan. Packets stay draft-only." },
    { name: "Financial Ops", lane: "RCM", audience: "finance,owner", purpose: "AR aging narrative and remit recon. Aggregates only.", example: "Weekly AR aging narrative vs last week.", copy: "Weekly AR aging narrative vs last week. Aggregates only — no patient names." },
    { name: "Exception", lane: "RCM", audience: "finance,ops", purpose: "Sparse threshold alerts only — spikes, drops, silent AR.", example: "Page only if a tracked denial pattern relapses.", copy: "Page only if a tracked denial pattern relapses toward threshold. No routine BI dump." },
    { name: "Multi-Bot Orchestration", lane: "RCM", audience: "owner,finance,ops", purpose: "Morning RCM fleet summary. Enforces the five-seat lane bible.", example: "Give me the RCM morning package for the 8:30 brief.", copy: "RCM morning package for the 8:30 brief across the five seats only. Cite fleet — don’t re-pull PLB." },
    { name: "Tristar MCP Bot", lane: "Finance", audience: "ops,finance", purpose: "First stop for visits, labor, AR, collections via tristar-mcp.", example: "Look up collections. Do not write schedule or bank feeds.", copy: "Look up visits, labor, AR, and collections. Draft/lookup only — do not write schedule, rent, or bank feeds." },
    { name: "Bi Reporting", lane: "Ops", audience: "ops,finance,owner", purpose: "Weekday 7am Prompt BI scorecard: volume, collections, denials, outliers.", example: "Don’t treat arrival_rate as an 8-clinic crisis.", copy: "Weekday BI scorecard. Define arrival_rate before escalating clinic underperformance." },
    { name: "CRM", lane: "Ops", audience: "ops,clinical", purpose: "PromptEMR hygiene: benefits, rejections, tasks, auth, charge capture.", example: "Hygiene snapshot: unverified walk-ins and charge-capture gaps.", copy: "Hygiene snapshot: unverified benefits, rejections, auth risk, and charge-capture gaps that can stall next week." },
    { name: "Credentialing", lane: "Clinical", audience: "ops,clinical", purpose: "Due-soon from Therapist Roster. Exclude Jordan/Morgan from pings.", example: "Weekly BCBS/CPR/CAQH due-soon list.", copy: "Weekly BCBS/CPR/CAQH due-soon from Therapist Roster. Exclude Jordan and Morgan from pings." },
    { name: "Prompt EMR Night Shift", lane: "Clinical", audience: "clinical,ops", purpose: "Overnight expiring auths and POC signature chase.", example: "Unsigned tab only; re-fax day 10/20 then phone escalate.", copy: "Work only Documents > Unsigned. Re-fax day 10/20, then phone escalate. Flag chart writes for approval." },
    { name: "Payer Contracts", lane: "Finance", audience: "finance,ops", purpose: "SharePoint Payer Contract Master renewals. Draft-only.", example: "Monthly digest on the 1st; due-soon if inside 30 days.", copy: "Monthly digest on the 1st. Due-soon only if inside 30 days or past due. Never invent dates. We are not in-network with UHC — don’t ping UHC." },
    { name: "RTM Billing", lane: "Clinical", audience: "clinical,finance", purpose: "Friday RTM brief. Never enroll or bill patients.", example: "Weekly RTM aggregates by clinic and provider.", copy: "Friday RTM brief: activity, coverage, billed vs collected by clinic/provider. Never enroll or bill." },
    { name: "Social Media", lane: "Marketing", audience: "marketing,owner", purpose: "Mon 8am 3–5 LinkedIn/FB drafts with clinic rotation. Never publish.", example: "Next batch: Bean Station, Newport, Jefferson City.", copy: "Draft 3–5 LinkedIn/FB posts. Lead Bean Station, Newport, Jefferson City. Clinical voice. Do not publish." },
    { name: "Social Media Post All", lane: "Marketing", audience: "marketing", purpose: "Syndicate approved FB posts to other channels (not Nextdoor).", example: "Publish LinkedIn as company Page; YouTube as @tristarpt.", copy: "Syndicate this approved FB post to LinkedIn Page, IG, TikTok, GBP, YouTube @tristarpt — not Nextdoor." },
    { name: "YouTube Growth", lane: "Marketing", audience: "marketing,clinical", purpose: "Grow @tristarpt for RC/TKA content. Draft-only.", example: "1 long-form + 2 Shorts/week in clinical voice.", copy: "Plan 1 long-form + 2 Shorts this week for RC/TKA. Draft titles and outlines only." },
    { name: "Website & SEO Bot", lane: "Marketing", audience: "marketing", purpose: "tristarpt.com SEO and NAP baseline checks.", example: "Audit footer tel: links and clinic NAP consistency.", copy: "Audit tristarpt.com NAP and footer tel: links across all 8 clinics. Report mismatches only." },
    { name: "Stalk Bot", lane: "Marketing", audience: "marketing,owner", purpose: "Competitor dossiers across the local PT landscape.", example: "First pulse on the competitor shortlist.", copy: "First pulse dossier on the competitor shortlist. Facts only — no invented rankings." },
    { name: "Occ Med Research", lane: "Marketing", audience: "marketing,clinical", purpose: "Workers’ comp employer prospects near clinics.", example: "Prioritize Morristown over Maryville for WC growth.", copy: "Find WC/Occ Med employer prospects near Morristown first, Maryville second. Include HR/safety contacts when public." },
    { name: "Bot Manager", lane: "Meta", audience: "owner", purpose: "Interview → draft instructions → confirm → CreateAgent.", example: "Stand up a specialist only after explicit yes.", copy: "Interview me for a new specialist. Draft instructions/schedule/connections. Do not CreateAgent until I confirm. Never delete without my say-so." },
    { name: "Roster", lane: "Meta", audience: "owner", purpose: "Keep the roster near the 50-slot cap. Recommends cuts; never deletes.", example: "Are we over cap, and what’s the cut list?", copy: "Roster cap check. Recommend unfinished shells to cut. Do not delete — I’ll remove via sidebar." },
    { name: "Knowledge Log", lane: "Meta", audience: "owner,ops", purpose: "Nightly durable write of decisions, shipped work, prefs.", example: "What standing prefs changed this week?", copy: "What decisions and standing prefs shipped this week? No secrets, customer data, or private messages." },
    { name: "Newest Plugins", lane: "Meta", audience: "owner", purpose: "Weekday top Grok Bot plays briefing for TriStar/JCB.", example: "What are today’s best bot plays with TriStar examples?", copy: "Top Grok Bot plays today with TriStar/JCB examples I can actually run." },
    { name: "Deadline & Obligations Bot", lane: "Owner", audience: "owner,finance,ops", purpose: "Lease, insurance, loan, sale, and payer deadline register.", example: "What notice windows close this quarter?", copy: "Which lease/insurance/loan/payer notice windows close this quarter? Flag Morristown lease auto-renew timing." },
    { name: "Vendor Savings", lane: "Finance", audience: "finance,ops", purpose: "Spend savings findings for clinic leads. Jordan gates vendor contact.", example: "Evidence-backed SAVE only on phone stack comparisons.", copy: "Evidence-backed SAVE findings only. Message clinic leads; wait for my go before vendor contact." },
    { name: "EBITDA Analyst", lane: "Finance", audience: "owner,finance", purpose: "EBITDA levers: show rate, visits/hour, payer yield, labor ratio.", example: "Labor target 50–55%; call out the problem line.", copy: "EBITDA levers this week. Labor target 50–55% — call out the problem line if we’re near 58%." },
    { name: "Process Documenter", lane: "Ops", audience: "ops,clinical", purpose: "Turn working practice into SOPs leaders can enforce.", example: "Document POC chase from Documents > Unsigned only.", copy: "Document POC Signature Chase SOP: work only from Documents > Unsigned. Note day 10/20 re-fax then phone escalate." },
  ],
};
