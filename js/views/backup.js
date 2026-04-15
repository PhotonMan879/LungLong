import { escapeHtml, textMatches } from "../core/utils.js";

export function renderBackup(state, trip) {
  const rainMode = state.rainMode === true;

  // ── Custom spots (drag-reorderable) ──────────────────
  const filteredCustom = trip.customSpots.filter((spot) =>
    textMatches(`${spot.name} ${spot.desc} ${spot.region}`, state.search)
  );

  const sortedCustom = rainMode
    ? [...filteredCustom].sort((a, b) => (b.indoor === true ? 1 : 0) - (a.indoor === true ? 1 : 0))
    : filteredCustom;

  const customBlock = sortedCustom.length
    ? `
      <article class="panel">
        <div class="backup-head">
          <div>
            <p class="tiny">Custom shortlist</p>
            <h2 class="section-title">Spots ที่เพิ่มเอง</h2>
            <p class="muted" style="font-size:0.84rem;margin-top:4px;">ลาก ⠿ เพื่อจัดลำดับ</p>
          </div>
        </div>
        <div class="backup-grid" id="custom-spots-grid" style="margin-top:16px;">
          ${sortedCustom.map((spot) => renderCustomCard(spot, rainMode)).join("")}
        </div>
      </article>
    `
    : "";

  // ── Backup regions ────────────────────────────────────
  const regionBlocks = trip.backupRegions.map((region) => {
    const spots = region.spots.filter((spot) =>
      textMatches(`${spot.name} ${spot.desc} ${spot.cat}`, state.search)
    );

    const sortedSpots = rainMode
      ? [...spots].sort((a, b) => (b.indoor === true ? 1 : 0) - (a.indoor === true ? 1 : 0))
      : spots;

    return `
      <section class="panel">
        <div class="backup-head">
          <div>
            <p class="tiny">${escapeHtml(region.region)}</p>
            <h2 class="section-title">${escapeHtml(region.region)}</h2>
          </div>
        </div>
        <div class="backup-grid" style="margin-top:16px;">
          ${sortedSpots.map((spot) => renderRegionCard(spot, rainMode)).join("")}
        </div>
      </section>
    `;
  }).join("");

  return `
    <section class="panel">
      <div class="backup-head">
        <div>
          <p class="tiny">Plan B / Hackathon mode</p>
          <h2 class="section-title">Backup attractions</h2>
          <p class="muted">เพิ่มสถานที่ของตัวเองหรือ shortlist backup ถ้าฝนตก คนเยอะ หรือเปลี่ยนแผนกลางทาง</p>
        </div>
        <div class="action-row">
          <button class="pill-btn ${rainMode ? "rain-toggle-on" : ""}" type="button"
            data-action="toggle-rain-mode" id="rain-toggle-btn">
            ${rainMode ? "🌧 Rain mode ON" : "☀️ ปกติ"}
          </button>
          <button class="primary-btn" type="button" data-action="add-custom-spot">เพิ่มสถานที่เอง</button>
        </div>
      </div>
      ${rainMode ? `<div class="rain-banner">🌧 Rain mode — สถานที่ indoor แสดงก่อน</div>` : ""}
    </section>

    ${customBlock}
    ${regionBlocks}
  `;
}

function renderCustomCard(spot, rainMode) {
  const isIndoor = spot.indoor === true;
  const dimClass = rainMode && !isIndoor ? "spot-outdoor-dim" : "";
  const rainBadge = rainMode && isIndoor ? `<span class="rain-badge">🌧 เหมาะฝนตก</span>` : "";

  return `
    <article class="backup-card ${dimClass}" draggable="true"
      data-action="drag-spot" data-spot-id="${spot.id}">
      <div class="drag-handle" data-action="drag-handle">⠿</div>
      <div>
        <p class="tiny">${escapeHtml(spot.region)}</p>
        <h3>${escapeHtml(spot.name)}</h3>
      </div>
      <p class="muted">${escapeHtml(spot.desc)}</p>
      <div class="badge-row">
        <span class="meta-chip">${escapeHtml(spot.cat || "custom")}</span>
        <span class="meta-chip">${escapeHtml(spot.time || "flexible")}</span>
        ${rainBadge}
      </div>
      <div class="action-row">
        <button class="tiny-btn" type="button" data-action="open-maps" data-query="${escapeHtml(spot.name)} Japan">Maps</button>
        <button class="tiny-btn" type="button" data-action="remove-custom-spot" data-spot-id="${spot.id}">ลบ</button>
      </div>
    </article>
  `;
}

function renderRegionCard(spot, rainMode) {
  const isIndoor = spot.indoor === true;
  const dimClass = rainMode && !isIndoor ? "spot-outdoor-dim" : "";
  const rainBadge = rainMode && isIndoor ? `<span class="rain-badge">🌧 เหมาะฝนตก</span>` : "";

  return `
    <article class="backup-card ${dimClass}">
      <div>
        <p class="tiny">${escapeHtml(spot.cat)}</p>
        <h3>${escapeHtml(spot.name)}</h3>
      </div>
      <p class="muted">${escapeHtml(spot.desc)}</p>
      <div class="badge-row">
        <span class="meta-chip">${escapeHtml(spot.cost)}</span>
        <span class="meta-chip">${escapeHtml(spot.time)}</span>
        <span class="meta-chip">${escapeHtml(spot.pass)}</span>
        ${rainBadge}
      </div>
      <div class="action-row">
        <button class="tiny-btn" type="button" data-action="save-backup-spot" data-spot-id="${spot.id}">Shortlist</button>
        <button class="tiny-btn" type="button" data-action="open-maps" data-query="${escapeHtml(spot.name)} Japan">Maps</button>
        <button class="tiny-btn" type="button" data-action="open-research" data-query="${escapeHtml(spot.name)}">Research</button>
      </div>
    </article>
  `;
}
