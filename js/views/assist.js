import { escapeHtml } from "../core/utils.js";

const FIRST_TIMER_TIPS = [
  ["รถไฟ / สถานี", "ดูชื่อสาย, หมายเลขชานชาลา, และปลายทางก่อนขึ้นเสมอ ถ้าหลง ให้ยื่นชื่อสถานีปลายทางในมือถือให้เจ้าหน้าที่ดู"],
  ["เงินสด / บัตร", "ร้านเล็ก ตู้ล็อกเกอร์ และร้านราเม็งหลายแห่งยังใช้เงินสด ควรมีเหรียญ ¥100 และ ¥500 ติดตัว"],
  ["Tax free", "ซื้อของเกินเกณฑ์ให้เตรียม passport ตอนจ่ายเงิน และบางประเภทห้ามแกะก่อนออกจากญี่ปุ่น"],
  ["ออนเซ็น", "ล้างตัวก่อนลงบ่อ ห้ามเอาผ้าผืนใหญ่ลงน้ำ และส่วนใหญ่ไม่ใส่ชุดว่ายน้ำ"]
];

const EMERGENCY_ITEMS = [
  ["ตำรวจ", "110"],
  ["รถพยาบาล / ดับเพลิง", "119"],
  ["ช่วยด้วย ฉันหลงทาง", "道に迷いました。"],
  ["ช่วยเรียกเจ้าหน้าที่สถานีให้หน่อย", "駅員さんを呼んでください。"]
];

function collectScripts(trip) {
  return trip.japaneseScripts.flatMap((section) =>
    section.items.map((item) => ({
      section: section.cat,
      title: item.title,
      jp: item.jp,
      th: item.th
    }))
  );
}

export function renderAssist(state, trip) {
  const scripts = collectScripts(trip);

  return `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Field mode</p>
          <h2 class="section-title">Travel Assist</h2>
          <p class="muted">หน้านี้ออกแบบสำหรับเปิดบนมือถือเวลาอยู่หน้างานจริง โดยเฉพาะถ้าพูดอังกฤษไม่คล่องหรือไปญี่ปุ่นครั้งแรก</p>
        </div>
      </div>
    </section>

    <section class="grid-2">
      <article class="panel">
        <p class="tiny">Quick phrases</p>
        <h2 class="section-title">พูดไม่ออกก็หยิบมือถือยื่นได้เลย</h2>
        <div class="assist-grid" style="margin-top:16px;">
          ${scripts.map((item) => `
            <article class="assist-card">
              <p class="tiny">${escapeHtml(item.section)}</p>
              <h3>${escapeHtml(item.title)}</h3>
              <p class="assist-jp">${escapeHtml(item.jp)}</p>
              <p class="muted">${escapeHtml(item.th)}</p>
              <div class="action-row">
                <button class="tiny-btn" type="button" data-action="copy-script" data-script="${escapeHtml(item.jp)}">คัดลอก</button>
              </div>
            </article>
          `).join("")}
        </div>
      </article>

      <article class="panel">
        <p class="tiny">Emergency</p>
        <h2 class="section-title">เบอร์และประโยคฉุกเฉิน</h2>
        <div class="assist-grid" style="margin-top:16px;">
          ${EMERGENCY_ITEMS.map(([title, value]) => `
            <article class="assist-card assist-card-compact">
              <h3>${escapeHtml(title)}</h3>
              <p class="assist-jp">${escapeHtml(value)}</p>
              <div class="action-row">
                <button class="tiny-btn" type="button" data-action="copy-script" data-script="${escapeHtml(value)}">คัดลอก</button>
              </div>
            </article>
          `).join("")}
        </div>
      </article>
    </section>

    <section class="panel">
      <p class="tiny">First-timer cheat sheet</p>
      <h2 class="section-title">รู้ไว้แล้วหน้างานจะไม่ panic</h2>
      <div class="assist-grid" style="margin-top:16px;">
        ${FIRST_TIMER_TIPS.map(([title, body]) => `
          <article class="assist-card">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="panel">
      <p class="tiny">Trip essentials</p>
      <h2 class="section-title">ข้อมูลที่ควรหาเจอใน 3 วินาที</h2>
      <div class="assist-grid" style="margin-top:16px;">
        <article class="assist-card assist-card-compact">
          <p class="tiny">Base</p>
          <h3>${escapeHtml(trip.info.base || "-")}</h3>
          <p class="muted">${escapeHtml(trip.info.window || "-")}</p>
        </article>
        <article class="assist-card assist-card-compact">
          <p class="tiny">Flight out</p>
          <h3>${escapeHtml(trip.info.flightOut || "-")}</h3>
        </article>
        <article class="assist-card assist-card-compact">
          <p class="tiny">Flight back</p>
          <h3>${escapeHtml(trip.info.flightBack || "-")}</h3>
        </article>
        <article class="assist-card assist-card-compact">
          <p class="tiny">Rail pass</p>
          <h3>${escapeHtml(trip.info.railPass || "-")}</h3>
        </article>
      </div>
    </section>
  `;
}
