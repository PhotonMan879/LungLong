import { escapeHtml, groupBy } from "../core/utils.js";

export function renderChecklist(state, trip) {
  const merged = [...trip.defaultChecklist, ...trip.checklistCustom];
  const grouped = groupBy(merged, (item) => item.cat);

  return `
    <section class="grid-2">
      <article class="panel">
        <div class="checklist-head">
          <div>
            <p class="tiny">Departure prep</p>
            <h2 class="section-title">Checklist</h2>
          </div>
          <div class="action-row">
            <input id="custom-checklist-text" class="field" type="text" placeholder="เพิ่ม checklist item ของตัวเอง">
            <button class="secondary-btn" type="button" data-action="add-checklist-item">เพิ่ม</button>
          </div>
        </div>
        <div class="checklist-stack" style="margin-top:16px;">
          ${Object.entries(grouped)
            .map(
              ([cat, items]) => `
                <section>
                  <p class="tiny">${escapeHtml(cat)}</p>
                  <div class="checklist-stack">
                    ${items
                      .map((item) => {
                        const done = Boolean(trip.checklistState[item.id]);
                        const isCustom = trip.checklistCustom.some((custom) => custom.id === item.id);
                        return `
                          <article class="checklist-item">
                            <button class="check-toggle ${done ? "done" : ""}" type="button" data-action="toggle-checklist" data-checklist-id="${item.id}">
                              ${done ? "✓" : ""}
                            </button>
                            <div style="flex:1;">
                              <div>${escapeHtml(item.text)}</div>
                            </div>
                            ${isCustom ? `<button class="tiny-btn" type="button" data-action="delete-checklist-item" data-checklist-id="${item.id}">ลบ</button>` : ""}
                          </article>
                        `;
                      })
                      .join("")}
                  </div>
                </section>
              `
            )
            .join("")}
        </div>
      </article>

      <article class="panel">
        <p class="tiny">Useful phrases</p>
        <h2 class="section-title">Japanese scripts</h2>
        <div class="scripts-stack" style="margin-top:16px;">
          ${trip.japaneseScripts.map(
            (section) => `
              <section>
                <p class="tiny">${escapeHtml(section.cat)}</p>
                <div class="scripts-stack">
                  ${section.items
                    .map(
                      (item) => `
                        <article class="script-card">
                          <div class="muted">${escapeHtml(item.title)}</div>
                          <p class="jp-line">${escapeHtml(item.jp)}</p>
                          <p class="muted">${escapeHtml(item.reading)}</p>
                          <p>${escapeHtml(item.th)}</p>
                          <div class="action-row">
                            <button class="tiny-btn" type="button" data-action="copy-script" data-script="${escapeHtml(item.jp)}">คัดลอก</button>
                          </div>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </section>
            `
          ).join("")}
        </div>
      </article>
    </section>
  `;
}
