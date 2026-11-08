(() => {
  const data = window.GROKBOT_PLAYBOOK;
  const roleButtons = document.querySelector("#role-switch");
  const rolePanel = document.querySelector("#role-panel");
  const searchInput = document.querySelector("#bot-search");
  const laneFilters = document.querySelector("#lane-filters");
  const botGrid = document.querySelector("#bot-grid");
  const countEl = document.querySelector("#bot-count");

  let activeRole = data.roles[0].id;
  let activeLane = "All";

  const lanes = ["All", ...Array.from(new Set(data.bots.map((b) => b.lane)))];

  function renderRole(roleId) {
    const role = data.roles.find((r) => r.id === roleId) || data.roles[0];
    activeRole = role.id;

    roleButtons.querySelectorAll("button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.role === activeRole));
    });

    rolePanel.innerHTML = `
      <div>
        <h3>${role.title}</h3>
        <p>${role.summary}</p>
        <div class="pill-row">
          ${role.startHere.map((name) => `<span class="pill">${name}</span>`).join("")}
        </div>
      </div>
      <div class="role-card__asks">
        ${role.asks
          .map(
            (ask) => `
          <div class="ask">
            <strong>${ask.title}</strong>
            <span>${ask.text}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  function renderLaneFilters() {
    laneFilters.innerHTML = lanes
      .map(
        (lane) => `
      <button type="button" data-lane="${lane}" aria-pressed="${lane === activeLane}">
        ${lane}
      </button>
    `
      )
      .join("");
  }

  function renderBots() {
    const query = (searchInput.value || "").trim().toLowerCase();
    const filtered = data.bots.filter((bot) => {
      const laneOk = activeLane === "All" || bot.lane === activeLane;
      const hay = `${bot.name} ${bot.purpose} ${bot.example} ${bot.audience} ${bot.lane}`.toLowerCase();
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
          <span class="bot-card__lane">${bot.lane}</span>
          <span class="bot-card__audience">${bot.audience}</span>
        </div>
        <h3>${bot.name}</h3>
        <p>${bot.purpose}</p>
        <div class="bot-card__example"><strong>Ask:</strong> ${bot.example}</div>
      </article>
    `
      )
      .join("");
  }

  roleButtons.innerHTML = data.roles
    .map(
      (role) => `
    <button type="button" data-role="${role.id}" aria-pressed="${role.id === activeRole}">
      ${role.label}
    </button>
  `
    )
    .join("");

  roleButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-role]");
    if (!button) return;
    renderRole(button.dataset.role);
  });

  laneFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-lane]");
    if (!button) return;
    activeLane = button.dataset.lane;
    renderLaneFilters();
    renderBots();
  });

  searchInput.addEventListener("input", renderBots);

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
      <div class="cadence-item__time">${item.time}</div>
      <div>
        <strong>${item.title}</strong>
        <p>${item.detail}</p>
      </div>
    </article>
  `
    )
    .join("");

  const principles = document.querySelector("#principles");
  principles.innerHTML = data.principles
    .map(
      (item) => `
    <article class="principle">
      <div class="principle__num">${item.num}</div>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `
    )
    .join("");

  const antipatterns = document.querySelector("#antipatterns");
  antipatterns.innerHTML = data.antipatterns
    .map(
      (item) => `
    <article class="anti-card">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `
    )
    .join("");

  renderRole(activeRole);
  renderLaneFilters();
  renderBots();
})();
