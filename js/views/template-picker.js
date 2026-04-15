import { TRIP_TEMPLATES } from "../data/trip-data.js";

export function renderTemplatePicker() {
  const cards = TRIP_TEMPLATES.map((tpl) => `
    <button
      class="template-card"
      type="button"
      data-action="pick-template"
      data-template-id="${tpl.id}"
      style="--tpl-color: ${tpl.color}"
      id="tpl-card-${tpl.id}"
    >
      <span class="tpl-emoji">${tpl.emoji}</span>
      <span class="tpl-label">${tpl.label}</span>
      <span class="tpl-desc">${tpl.desc}</span>
      <span class="tpl-days">${tpl.days > 0 ? `${tpl.days} วัน` : "กำหนดเอง"}</span>
    </button>
  `).join("");

  return `
    <div class="template-picker">
      <p class="tpl-intro">เลือกแบบทริปที่ต้องการเริ่มต้น</p>
      <div class="template-grid">${cards}</div>
    </div>
  `;
}
