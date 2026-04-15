import { currency } from "../core/utils.js";

export function renderBudget(state, trip) {
  const planned = Object.values(trip.budgetPlan).reduce((sum, value) => sum + Number(value || 0), 0);
  const actual = Object.values(trip.budgetActual).reduce((sum, value) => sum + Number(value || 0), 0);
  const diff = actual - planned;

  return `
    <section class="grid-3">
      <article class="metric-card">
        <p class="tiny">Planned total</p>
        <div class="metric-value">${currency(planned)}</div>
      </article>
      <article class="metric-card">
        <p class="tiny">Actual total</p>
        <div class="metric-value">${currency(actual)}</div>
      </article>
      <article class="metric-card">
        <p class="tiny">Difference</p>
        <div class="metric-value">${diff >= 0 ? "+" : ""}${currency(diff).replace("¥", "¥")}</div>
      </article>
    </section>

    <section class="panel">
      <div class="budget-head">
        <div>
          <p class="tiny">Planned vs actual</p>
          <h2 class="section-title">Budget tracker</h2>
          <p class="muted">เวอร์ชันนี้ปรับทั้งงบตั้งต้นและค่าใช้จ่ายจริงต่อวันได้เลย</p>
        </div>
      </div>
      <div class="budget-grid" style="margin-top:16px;">
        ${trip.days.map((day) => {
          const plan = Number(trip.budgetPlan[day.id] || 0);
          const spent = Number(trip.budgetActual[day.id] || 0);
          return `
            <article class="budget-row">
              <div class="budget-row-head">
                <div>
                  <h3>Day ${day.id} - ${day.date}</h3>
                  <p class="muted">${day.theme}</p>
                </div>
                <span class="status-chip ${spent > plan ? "bad" : "good"}">${spent > plan ? "over" : "on track"}</span>
              </div>
              <div class="budget-inputs">
                <label>
                  <span class="tiny">Planned</span>
                  <input class="budget-input" type="number" min="0" step="100" value="${plan}" data-action="update-budget" data-budget-kind="plan" data-day-id="${day.id}">
                </label>
                <label>
                  <span class="tiny">Actual</span>
                  <input class="budget-input" type="number" min="0" step="100" value="${spent}" data-action="update-budget" data-budget-kind="actual" data-day-id="${day.id}">
                </label>
              </div>
              <div class="meta-row">
                <span class="meta-chip">ต่างกัน ${spent - plan >= 0 ? "+" : ""}${currency(spent - plan)}</span>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}
