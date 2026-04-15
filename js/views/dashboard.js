import { completionForDay, currency, getTripDayStatus, totalCompletion } from "../core/utils.js";

export function renderDashboard(state, trip) {
  const overall = totalCompletion(trip);
  const focusDay = getTripDayStatus(trip);
  const focusStats = completionForDay(focusDay, trip);
  const docsCount = trip.docs.length;
  const customCount = trip.customSpots.length;
  const planTotal = Object.values(trip.budgetPlan).reduce((sum, value) => sum + Number(value || 0), 0);
  const actualTotal = Object.values(trip.budgetActual).reduce((sum, value) => sum + Number(value || 0), 0);

  return `
    <section class="metrics-grid">
      <article class="metric-card">
        <p class="tiny">Trip window</p>
        <div class="metric-value">${trip.info.window}</div>
        <p class="muted">${trip.info.flightOut} / ${trip.info.flightBack}</p>
      </article>
      <article class="metric-card">
        <p class="tiny">Overall progress</p>
        <div class="metric-value">${overall.done}/${overall.total}</div>
        <div class="progress-track"><div class="progress-bar" style="width:${overall.pct}%"></div></div>
        <p class="muted">${overall.pct}% ของกิจกรรมถูก mark แล้ว</p>
      </article>
      <article class="metric-card">
        <p class="tiny">Budget snapshot</p>
        <div class="metric-value">${currency(actualTotal)}</div>
        <p class="muted">ใช้จริงจากแผน ${currency(planTotal)} (${actualTotal - planTotal >= 0 ? "+" : ""}${currency(actualTotal - planTotal).replace("¥", "")})</p>
      </article>
    </section>

    <section class="grid-2">
      <article class="panel">
        <div class="day-header">
          <div>
            <p class="tiny">Today view / next best focus</p>
            <h2 class="section-title">Day ${focusDay.id} - ${focusDay.date}</h2>
            <p class="muted">${focusDay.theme}</p>
          </div>
          <div class="badge-row">
            <span class="status-chip ${focusDay.pass ? "good" : "warn"}">${focusDay.pass ? "Pass day" : "No pass"}</span>
            <button class="secondary-btn" type="button" data-action="switch-view" data-view="itinerary">เปิด itinerary</button>
          </div>
        </div>
        <div class="meta-row">
          <span class="meta-chip">ทำแล้ว ${focusStats.done}/${focusStats.total}</span>
          <span class="meta-chip">${focusDay.city}</span>
          <span class="meta-chip">${trip.info.base}</span>
        </div>
        <div class="activity-stack" style="margin-top:14px;">
          ${focusDay.activities
            .slice(0, 4)
            .map((activity) => {
              const activityState = trip.activities[activity.id] || {};
              return `
                <div class="activity-card ${activityState.checked ? "checked" : ""}">
                  <div class="activity-top">
                    <div class="activity-title">
                      <div>${activity.icon}</div>
                      <div>
                        <div class="day-title">${activity.title}</div>
                        <p class="muted">${activity.desc}</p>
                      </div>
                    </div>
                    <div class="time-pill">${activity.time}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>

      <article class="panel">
        <p class="tiny">Quick command center</p>
        <h2 class="section-title">What matters next</h2>
        <div class="action-row" style="margin:12px 0 18px;">
          <button class="primary-btn" type="button" data-action="switch-view" data-view="docs">จัดเอกสารทริป</button>
          <button class="secondary-btn" type="button" data-action="switch-view" data-view="budget">อัปเดตงบ</button>
          <button class="secondary-btn" type="button" data-action="switch-view" data-view="settings">Export backup</button>
        </div>
        <div class="metrics-grid">
          <article class="metric-card">
            <p class="tiny">Docs</p>
            <div class="metric-value">${docsCount}</div>
            <p class="muted">รายการเอกสารที่แนบไว้ในเครื่องนี้</p>
          </article>
          <article class="metric-card">
            <p class="tiny">Custom spots</p>
            <div class="metric-value">${customCount}</div>
            <p class="muted">สถานที่ที่เพิ่มระหว่างวางแผน</p>
          </article>
          <article class="metric-card">
            <p class="tiny">Rail pass days</p>
            <div class="metric-value">${trip.days.filter((day) => day.pass).length}</div>
            <p class="muted">วันที่ควรเช็ก route และเวลารถล่วงหน้า</p>
          </article>
        </div>
      </article>
    </section>
  `;
}
