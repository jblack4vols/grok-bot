(() => {
  const data = window.GROKBOT_PLAYBOOK;
  const roleButtons = document.querySelector("#role-switch");
  const rolePanel = document.querySelector("#role-panel");
  const searchInput = document.querySelector("#bot-search");
  const laneFilters = document.querySelector("#lane-filters");
  const botGrid = document.querySelector("#bot-grid");
  const countEl = document.querySelector("#bot-count");
  const scenarioSwitch = document.querySelector("#scenario-switch");
  const scenarioPanel = document.querySelector("#scenario-panel");
  const promptGrid = document.querySelector("#prompt-grid");
  const weekGrid = document.querySelector("#week-grid");
  const toast = document.querySelector("#toast");

  let activeRole = data.roles[0].id;
  let activeLane = "All";
  let activeScenario = data.scenarios[0].id;
  let toastTimer;

  const lanes = ["All", ...Array.from(new Set(data.bots.map((b) => b.lane)))];

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 1400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch (error) {
      showToast("Copy failed — select the text instead");
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function renderRole(roleId) {
    const role = data.roles.find((r) => r.id === roleId) || data.roles[0];
    activeRole = role.id;

    roleButtons.querySelectorAll("button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.role === activeRole));
    });

    rolePanel.innerHTML = `
      <div>
        <h3>${escapeHtml(role.title)}</h3>
        <p>${escapeHtml(role.summary)}</p>
        <div class="pill-row">
          ${role.startHere.map((name) => `<span class="pill">${escapeHtml(name)}</span>`).join("")}
        </div>
      </div>
      <div class="role-card__asks">
        ${role.asks
          .map(
            (ask) => `
          <div class="ask">
            <strong>${escapeHtml(ask.title)}</strong>
            <button class="copy-btn" type="button" data-copy="${escapeHtml(ask.text)}">Copy</button>
            <span>${escapeHtml(ask.text)}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  function renderScenario(scenarioId) {
    const scenario =
      data.scenarios.find((item) => item.id === scenarioId) || data.scenarios[0];
    activeScenario = scenario.id;

    scenarioSwitch.querySelectorAll("button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.scenario === activeScenario));
    });

    scenarioPanel.innerHTML = `
      <div class="scenario-panel__head">
        <div class="scenario-panel__tag">${escapeHtml(scenario.tag)}</div>
        <h3>${escapeHtml(scenario.title)}</h3>
        <p class="scenario-panel__situation">${escapeHtml(scenario.situation)}</p>
        <div class="scenario-meta">
          <span class="pill">${escapeHtml(scenario.bot)}</span>
          <button class="copy-btn" type="button" data-copy="${escapeHtml(scenario.steps[0].text)}">
            Copy opening ask
          </button>
        </div>
      </div>
      <div class="thread">
        ${scenario.steps
          .map((step) => {
            const isYou = step.who === "You";
            return `
              <article class="bubble ${isYou ? "bubble--you" : ""}">
                <div class="bubble__who">
                  <span>${escapeHtml(step.who)}</span>
                  ${
                    isYou
                      ? `<button class="copy-btn" type="button" data-copy="${escapeHtml(step.text)}">Copy</button>`
                      : ""
                  }
                </div>
                <p>${escapeHtml(step.text)}</p>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="scenario-why">
        <strong>Why this works</strong>
        <p>${escapeHtml(scenario.why)}</p>
      </div>
    `;
  }

  function renderLaneFilters() {
    laneFilters.innerHTML = lanes
      .map(
        (lane) => `
      <button type="button" data-lane="${escapeHtml(lane)}" aria-pressed="${lane === activeLane}">
        ${escapeHtml(lane)}
      </button>
    `
      )
      .join("");
  }

  function renderBots() {
    const query = (searchInput.value || "").trim().toLowerCase();
    const filtered = data.bots.filter((bot) => {
      const laneOk = activeLane === "All" || bot.lane === activeLane;
      const hay = `${bot.name} ${bot.purpose} ${bot.example} ${bot.copy} ${bot.audience} ${bot.lane}`.toLowerCase();
      const queryOk = !query || hay.includes(query);
      return laneOk && queryOk;
    });

    countEl.textContent = `${filtered.length} bot${filtered.length === 1 ? "" : "s"}`;

    if (!filtered.length) {
      botGrid.innerHTML = `<div class="empty">No bots match that search. Try “denial”, “owner”, or “social”.</div>`;
      return;
    }

    botGrid.innerHTML = filtered
      .map(
        (bot) => `
      <article class="bot-card">
        <div class="bot-card__meta">
          <span class="bot-card__lane">${escapeHtml(bot.lane)}</span>
          <span class="bot-card__audience">${escapeHtml(bot.audience)}</span>
        </div>
        <h3>${escapeHtml(bot.name)}</h3>
        <p>${escapeHtml(bot.purpose)}</p>
        <div class="bot-card__actions">
          <div class="bot-card__example"><strong>Ask:</strong> ${escapeHtml(bot.example)}</div>
          <button class="copy-btn" type="button" data-copy="${escapeHtml(bot.copy || bot.example)}">Copy ask</button>
        </div>
      </article>
    `
      )
      .join("");
  }

  function renderPrompts() {
    promptGrid.innerHTML = data.promptBank
      .map(
        (item) => `
      <article class="prompt-card">
        <div class="prompt-side prompt-side--bad">
          <div class="prompt-side__label"><span>Not this</span></div>
          <p>${escapeHtml(item.bad)}</p>
        </div>
        <div class="prompt-side prompt-side--good">
          <div class="prompt-side__label">
            <span>Say this</span>
            <button class="copy-btn" type="button" data-copy="${escapeHtml(item.good)}">Copy</button>
          </div>
          <p>${escapeHtml(item.good)}</p>
        </div>
        <div class="prompt-tip">${escapeHtml(item.tip)}</div>
      </article>
    `
      )
      .join("");
  }

  roleButtons.innerHTML = data.roles
    .map(
      (role) => `
    <button type="button" data-role="${escapeHtml(role.id)}" aria-pressed="${role.id === activeRole}">
      ${escapeHtml(role.label)}
    </button>
  `
    )
    .join("");

  scenarioSwitch.innerHTML = data.scenarios
    .map(
      (scenario) => `
    <button type="button" data-scenario="${escapeHtml(scenario.id)}" aria-pressed="${
      scenario.id === activeScenario
    }">
      ${escapeHtml(scenario.title)}
    </button>
  `
    )
    .join("");

  roleButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-role]");
    if (!button) return;
    renderRole(button.dataset.role);
  });

  scenarioSwitch.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-scenario]");
    if (!button) return;
    renderScenario(button.dataset.scenario);
  });

  laneFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-lane]");
    if (!button) return;
    activeLane = button.dataset.lane;
    renderLaneFilters();
    renderBots();
  });

  searchInput.addEventListener("input", renderBots);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    copyText(button.getAttribute("data-copy"));
  });

  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.removeAttribute("open");
      });
    });
  }

  const cadence = document.querySelector("#cadence");
  cadence.innerHTML = data.cadence
    .map(
      (item) => `
    <article class="cadence-item">
      <div class="cadence-item__time">${escapeHtml(item.time)}</div>
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.detail)}</p>
        ${
          item.example
            ? `<div class="cadence-item__example"><strong>Example:</strong> ${escapeHtml(item.example)}</div>`
            : ""
        }
      </div>
    </article>
  `
    )
    .join("");

  weekGrid.innerHTML = data.weekPlan
    .map(
      (day) => `
    <article class="week-card">
      <h3>${escapeHtml(day.day)}</h3>
      <ul>
        ${day.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `
    )
    .join("");

  const principles = document.querySelector("#principles");
  principles.innerHTML = data.principles
    .map(
      (item) => `
    <article class="principle">
      <div class="principle__num">${escapeHtml(item.num)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `
    )
    .join("");

  const antipatterns = document.querySelector("#antipatterns");
  antipatterns.innerHTML = data.antipatterns
    .map(
      (item) => `
    <article class="anti-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
      ${
        item.example
          ? `<div class="anti-card__example">${escapeHtml(item.example)}</div>`
          : ""
      }
    </article>
  `
    )
    .join("");

  renderRole(activeRole);
  renderScenario(activeScenario);
  renderPrompts();
  renderLaneFilters();
  renderBots();
})();
