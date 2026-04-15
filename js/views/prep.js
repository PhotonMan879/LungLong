import { escapeHtml, groupBy } from "../core/utils.js";

const PHASE_META = {
  "T-14": {
    title: "ก่อนออก 2 สัปดาห์",
    desc: "เคลียร์เรื่องเอกสาร เงิน และ booking ให้จบก่อน",
    accent: "warn"
  },
  "T-7": {
    title: "ก่อนออก 7 วัน",
    desc: "เริ่มเช็กมือถือ อินเทอร์เน็ต ยา และของที่หาซื้อเพิ่ม",
    accent: "good"
  },
  "T-2": {
    title: "ก่อนออก 2 วัน",
    desc: "แพ็กจริง จัดกระเป๋า และเช็ก route ไปสนามบิน",
    accent: "warn"
  },
  "Day Of": {
    title: "วันเดินทาง",
    desc: "เน้นของหยิบใช้บ่อย เอกสาร และเวลาออกจากบ้าน",
    accent: "bad"
  }
};

function formatDateLabel(date) {
  return date.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
}

function getPhaseDate(startDate, offsetDays) {
  const next = new Date(startDate);
  next.setDate(next.getDate() - offsetDays);
  return next;
}

function getDeadlineStatus(diffDays) {
  if (diffDays > 1) return { label: `เหลือ ${diffDays} วัน`, tone: "good" };
  if (diffDays === 1) return { label: "พรุ่งนี้", tone: "warn" };
  if (diffDays === 0) return { label: "วันนี้", tone: "bad" };
  return { label: `ผ่านแล้ว ${Math.abs(diffDays)} วัน`, tone: "warn" };
}

function getDeadlineCards(trip) {
  const startDate = new Date(trip.info.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [
    { key: "T-14", offset: 14, action: "จัดเอกสารและตั๋ว", view: "docs" },
    { key: "T-7", offset: 7, action: "เช็กอินเทอร์เน็ตและแปลภาษา", view: "assist" },
    { key: "T-2", offset: 2, action: "แพ็กกระเป๋าและ route ไปสนามบิน", view: "prep" },
    { key: "Day Of", offset: 0, action: "เปิด airport mode และหยิบของจำเป็น", view: "assist" }
  ].map((item) => {
    const date = getPhaseDate(startDate, item.offset);
    const diffDays = Math.ceil((date.setHours(0, 0, 0, 0) - today.getTime()) / 86400000);
    return {
      ...item,
      ...PHASE_META[item.key],
      dateLabel: formatDateLabel(new Date(date)),
      status: getDeadlineStatus(diffDays)
    };
  });
}

function getPackingProgress(trip) {
  const merged = [...trip.defaultPacking, ...trip.packingCustom];
  const done = merged.filter((item) => trip.packingState[item.id]).length;
  const total = merged.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function getPriorityMessage(trip) {
  const diffDays = Math.ceil((new Date(trip.info.startDate).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);

  if (diffDays > 14) {
    return {
      title: "ยังมีเวลา แต่อย่าปล่อยจนลืม",
      body: "ช่วงนี้เหมาะกับการเก็บเอกสาร, โหลดแอปที่ต้องใช้, และปักหมุดโรงแรมหรือสถานีสำคัญไว้ล่วงหน้า"
    };
  }

  if (diffDays > 7) {
    return {
      title: "เริ่มเข้าโหมดพร้อมเดินทาง",
      body: "เคลียร์ eSIM, เงินสด, บัตร, และเช็กว่าของสำคัญทุกอย่างหาเจอได้จากมือถือภายในไม่กี่วินาที"
    };
  }

  if (diffDays > 1) {
    return {
      title: "โหมดแพ็กจริง",
      body: "แพ็กกระเป๋า, ชาร์จอุปกรณ์, แยกยาและเอกสารไว้ในช่องหยิบง่าย และเช็ก route ไปสนามบินอีกครั้ง"
    };
  }

  return {
    title: "พร้อมออกจากบ้าน",
    body: "ตอนนี้ focus แค่ passport, wallet, phone, power bank, boarding info และเวลาถึงสนามบิน อย่ากระจายสมาธิไปเรื่องอื่น"
  };
}

export function renderPrep(state, trip) {
  const merged = [...trip.defaultPacking, ...trip.packingCustom];
  const grouped = groupBy(merged, (item) => item.phase);
  const progress = getPackingProgress(trip);
  const priority = getPriorityMessage(trip);
  const deadlines = getDeadlineCards(trip);

  return `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Pre-departure mode</p>
          <h2 class="section-title">Prep & Packing</h2>
          <p class="muted">โหมดนี้ออกแบบไว้สำหรับช่วงก่อนบินจริง ให้เช็กงานสำคัญและของจำเป็นได้เร็วจากมือถือ</p>
        </div>
        <div class="badge-row">
          <span class="status-chip good">พร้อมแล้ว ${progress.done}/${progress.total}</span>
          <button class="secondary-btn" type="button" data-action="switch-view" data-view="docs">เปิด docs</button>
        </div>
      </div>
    </section>

    <section class="grid-3">
      <article class="metric-card">
        <p class="tiny">Packing progress</p>
        <div class="metric-value">${progress.pct}%</div>
        <div class="progress-track"><div class="progress-bar" style="width:${progress.pct}%"></div></div>
        <p class="muted">ติ๊กของที่พร้อมแล้ว ${progress.done}/${progress.total} รายการ</p>
      </article>
      <article class="metric-card">
        <p class="tiny">Travel docs on device</p>
        <div class="metric-value">${trip.docs.length}</div>
        <p class="muted">passport scan, tickets, hotel, pass, insurance ควรมีอยู่ที่นี่อย่างน้อยบางส่วน</p>
      </article>
      <article class="metric-card">
        <p class="tiny">Right now</p>
        <div class="metric-value">${escapeHtml(trip.info.startDate || "-")}</div>
        <p class="muted">${escapeHtml(priority.title)}</p>
      </article>
    </section>

    <section class="grid-2">
      <article class="panel">
        <p class="tiny">Deadline ladder</p>
        <h2 class="section-title">งานอะไรควรทำตอนไหน</h2>
        <div class="prep-deadline-grid" style="margin-top:16px;">
          ${deadlines.map((item) => `
            <article class="prep-card prep-deadline-card">
              <div class="day-header">
                <div>
                  <p class="tiny">${escapeHtml(item.key)}</p>
                  <h3>${escapeHtml(item.title)}</h3>
                </div>
                <span class="status-chip ${item.status.tone}">${escapeHtml(item.status.label)}</span>
              </div>
              <p class="muted">${escapeHtml(item.dateLabel)}</p>
              <p>${escapeHtml(item.desc)}</p>
              <div class="info-box">${escapeHtml(item.action)}</div>
              <div class="action-row">
                <button class="tiny-btn" type="button" data-action="switch-view" data-view="${item.view}">ไปหน้าที่เกี่ยวข้อง</button>
              </div>
            </article>
          `).join("")}
        </div>
      </article>

      <article class="panel">
        <p class="tiny">Next focus</p>
        <h2 class="section-title">${escapeHtml(priority.title)}</h2>
        <p>${escapeHtml(priority.body)}</p>
        <div class="assist-grid" style="margin-top:16px;">
          <article class="assist-card assist-card-compact">
            <p class="tiny">Flight out</p>
            <h3>${escapeHtml(trip.info.flightOut || "-")}</h3>
          </article>
          <article class="assist-card assist-card-compact">
            <p class="tiny">Base</p>
            <h3>${escapeHtml(trip.info.base || "-")}</h3>
          </article>
          <article class="assist-card assist-card-compact">
            <p class="tiny">Rail pass</p>
            <h3>${escapeHtml(trip.info.railPass || "-")}</h3>
          </article>
        </div>
        <div class="action-row" style="margin-top:16px;">
          <button class="secondary-btn" type="button" data-action="switch-view" data-view="assist">เปิด assist</button>
          <button class="secondary-btn" type="button" data-action="switch-view" data-view="checklist">เปิด checklist</button>
          <button class="secondary-btn" type="button" data-action="switch-view" data-view="settings">แก้ trip profile</button>
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="checklist-head">
        <div>
          <p class="tiny">Packing checklist</p>
          <h2 class="section-title">ของอะไรยังไม่พร้อม</h2>
        </div>
        <div class="inline-form prep-inline-form">
          <select id="packing-custom-phase" class="field">
            <option value="T-14">T-14</option>
            <option value="T-7">T-7</option>
            <option value="T-2">T-2</option>
            <option value="Day Of">Day Of</option>
          </select>
          <input id="packing-custom-text" class="field" type="text" placeholder="เพิ่มของหรือ task ก่อนเดินทาง">
          <button class="secondary-btn" type="button" data-action="add-packing-item">เพิ่ม</button>
        </div>
      </div>
      <div class="prep-phase-stack" style="margin-top:16px;">
        ${Object.entries(PHASE_META).map(([phase, meta]) => {
          const items = grouped[phase] || [];
          return `
            <section class="prep-phase-block">
              <div class="timeline-section-head">
                <div>
                  <p class="tiny">${escapeHtml(phase)}</p>
                  <h3 class="timeline-section-title">${escapeHtml(meta.title)}</h3>
                </div>
                <span class="meta-chip">${items.length} items</span>
              </div>
              <p class="muted">${escapeHtml(meta.desc)}</p>
              <div class="checklist-stack">
                ${items.map((item) => {
                  const done = Boolean(trip.packingState[item.id]);
                  const isCustom = trip.packingCustom.some((custom) => custom.id === item.id);
                  return `
                    <article class="checklist-item prep-checklist-item">
                      <button class="check-toggle ${done ? "done" : ""}" type="button" data-action="toggle-packing" data-packing-id="${item.id}">
                        ${done ? "✓" : ""}
                      </button>
                      <div style="flex:1;">
                        <div>${escapeHtml(item.text)}</div>
                        <p class="muted" style="margin:6px 0 0;">${escapeHtml(item.cat)}</p>
                      </div>
                      ${isCustom ? `<button class="tiny-btn" type="button" data-action="delete-packing-item" data-packing-id="${item.id}">ลบ</button>` : ""}
                    </article>
                  `;
                }).join("") || `<div class="empty-state">ยังไม่มีรายการในช่วงนี้</div>`}
              </div>
            </section>
          `;
        }).join("")}
      </div>
    </section>
  `;
}
