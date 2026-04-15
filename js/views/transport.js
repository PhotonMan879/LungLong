import { escapeHtml, mapsSearchUrl, openInNewTab } from "../core/utils.js";

const TRANSPORT_ICONS = {
  "🚄": "Shinkansen / Express",
  "🚃": "Local / Rapid Train",
  "🚇": "Subway / Metro",
  "🚌": "Bus",
  "🚶": "Walking",
  "🛫": "Flight"
};

function renderLeg(leg) {
  const durationLabel = leg.durationMin >= 60
    ? `${Math.floor(leg.durationMin / 60)} ชม. ${leg.durationMin % 60 > 0 ? `${leg.durationMin % 60} นาที` : ""}`
    : `${leg.durationMin} นาที`;

  const passChip = leg.passOk
    ? `<span class="route-pass-chip pass-ok">✓ ใช้ JR Pass ได้</span>`
    : `<span class="route-pass-chip pass-no">ICOCA / ตั๋วแยก</span>`;

  return `
    <div class="route-leg">
      <div class="route-leg-icon">${leg.icon}</div>
      <div class="route-leg-body">
        <div class="route-leg-stations">
          <span class="route-from">${escapeHtml(leg.from)}</span>
          <span class="route-arrow">→</span>
          <span class="route-to">${escapeHtml(leg.to)}</span>
        </div>
        <div class="route-leg-meta">
          <span class="route-line-name">${escapeHtml(leg.line)}</span>
          <span class="route-duration">⏱ ${durationLabel}</span>
          ${passChip}
        </div>
        ${leg.tip ? `<div class="route-tip">💡 ${escapeHtml(leg.tip)}</div>` : ""}
        <div class="action-row" style="margin-top:10px;">
          <a class="tiny-btn" href="${escapeHtml(leg.transitUrl)}" target="_blank" rel="noreferrer">เปิดใน Maps</a>
        </div>
      </div>
    </div>
  `;
}

export function renderTransport(state, trip) {
  const activeDay = trip.days.find((d) => d.id === trip.dayId) || trip.days[0];
  const dayRoute = (trip.routes || []).find((r) => r.dayId === activeDay?.id);

  const daySwitcher = trip.days.map((d) => `
    <button class="pill-btn ${d.id === (activeDay?.id) ? "active" : ""}" type="button"
      data-action="set-day" data-day-id="${d.id}">
      Day ${d.id}
    </button>
  `).join("");

  const noRouteState = `
    <div class="empty-state">
      <div style="font-size:2rem;margin-bottom:8px;">🗺</div>
      <p>ยังไม่มีข้อมูล route สำหรับวันนี้</p>
      <p class="muted" style="margin-top:6px;font-size:0.88rem;">วันนี้อาจเป็นวันที่ไม่มีการเดินทางไกล หรือยังไม่ได้เพิ่มข้อมูล</p>
      <div class="action-row" style="justify-content:center;margin-top:14px;">
        <a class="secondary-btn" href="${mapsSearchUrl(`${activeDay?.city || ""} japan transit`)}" target="_blank" rel="noreferrer">
          ค้นหาเส้นทางใน Maps
        </a>
      </div>
    </div>
  `;

  const totalMin = dayRoute?.legs?.reduce((sum, l) => sum + (l.durationMin || 0), 0) || 0;
  const totalLabel = totalMin >= 60
    ? `${Math.floor(totalMin / 60)} ชม. ${totalMin % 60 > 0 ? `${totalMin % 60} น.` : ""}`
    : `${totalMin} น.`;
  const passLegs = dayRoute?.legs?.filter((l) => l.passOk).length || 0;

  return `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Transport planner</p>
          <h2 class="section-title">เส้นทางเดินทาง</h2>
          <p class="muted">route, เวลา, สาย, และ tip ต่อวัน — ไม่ต้องเดาเส้นทางระหว่างทริป</p>
        </div>
      </div>
      <div class="day-switcher" style="margin-top:16px;">
        ${daySwitcher}
      </div>
    </section>

    ${dayRoute ? `
      <section class="panel">
        <div class="day-header">
          <div>
            <p class="tiny">Day ${activeDay?.id} · ${activeDay?.date || ""}</p>
            <h3 class="section-title">${escapeHtml(dayRoute.city)}</h3>
            <p class="muted">${dayRoute.legs.length} ช่วงการเดินทาง · รวม ${totalLabel}</p>
          </div>
          <div class="badge-row">
            ${passLegs > 0 ? `<span class="status-chip good">JR Pass ใช้ได้ ${passLegs} ช่วง</span>` : `<span class="status-chip warn">วันนี้ไม่ใช้ JR Pass</span>`}
          </div>
        </div>
        <div class="route-legs-stack" style="margin-top:18px;">
          ${dayRoute.legs.map(renderLeg).join("")}
        </div>
      </section>
    ` : `
      <section class="panel">${noRouteState}</section>
    `}
  `;
}
