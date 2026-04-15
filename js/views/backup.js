import { escapeHtml, textMatches } from "../core/utils.js";

export function renderBackup(state, trip) {
  const customBlock = trip.customSpots.length
    ? `
      <article class="panel">
        <div class="backup-head">
          <div>
            <p class="tiny">Custom shortlist</p>
            <h2 class="section-title">Spots ที่เพิ่มเอง</h2>
          </div>
        </div>
        <div class="backup-grid" style="margin-top:16px;">
          ${trip.customSpots
            .filter((spot) => textMatches(`${spot.name} ${spot.desc} ${spot.region}`, state.search))
            .map(
              (spot) => `
                <article class="backup-card">
                  <div>
                    <p class="tiny">${escapeHtml(spot.region)}</p>
                    <h3>${escapeHtml(spot.name)}</h3>
                  </div>
                  <p class="muted">${escapeHtml(spot.desc)}</p>
                  <div class="badge-row">
                    <span class="meta-chip">${escapeHtml(spot.cat || "custom")}</span>
                    <span class="meta-chip">${escapeHtml(spot.time || "flexible")}</span>
                  </div>
                  <div class="action-row">
                    <button class="tiny-btn" type="button" data-action="open-maps" data-query="${escapeHtml(spot.name)} Japan">Maps</button>
                    <button class="tiny-btn" type="button" data-action="remove-custom-spot" data-spot-id="${spot.id}">ลบ</button>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </article>
    `
    : "";

  return `
    <section class="panel">
      <div class="backup-head">
        <div>
          <p class="tiny">Plan B / Hackathon mode</p>
          <h2 class="section-title">Backup attractions</h2>
          <p class="muted">เพิ่มสถานที่ของตัวเองหรือ shortlist backup ถ้าฝนตก คนเยอะ หรือเปลี่ยนแผนกลางทาง</p>
        </div>
        <div class="action-row">
          <button class="primary-btn" type="button" data-action="add-custom-spot">เพิ่มสถานที่เอง</button>
        </div>
      </div>
    </section>

    ${customBlock}

    ${trip.backupRegions.map(
      (region) => `
        <section class="panel">
          <div class="backup-head">
            <div>
              <p class="tiny">${escapeHtml(region.region)}</p>
              <h2 class="section-title">${escapeHtml(region.region)}</h2>
            </div>
          </div>
          <div class="backup-grid" style="margin-top:16px;">
            ${region.spots
              .filter((spot) => textMatches(`${spot.name} ${spot.desc} ${spot.cat}`, state.search))
              .map(
                (spot) => `
                  <article class="backup-card">
                    <div>
                      <p class="tiny">${escapeHtml(spot.cat)}</p>
                      <h3>${escapeHtml(spot.name)}</h3>
                    </div>
                    <p class="muted">${escapeHtml(spot.desc)}</p>
                    <div class="badge-row">
                      <span class="meta-chip">${escapeHtml(spot.cost)}</span>
                      <span class="meta-chip">${escapeHtml(spot.time)}</span>
                      <span class="meta-chip">${escapeHtml(spot.pass)}</span>
                    </div>
                    <div class="action-row">
                      <button class="tiny-btn" type="button" data-action="save-backup-spot" data-spot-id="${spot.id}">Shortlist</button>
                      <button class="tiny-btn" type="button" data-action="open-maps" data-query="${escapeHtml(spot.name)} Japan">Maps</button>
                      <button class="tiny-btn" type="button" data-action="open-research" data-query="${escapeHtml(spot.name)}">Research</button>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
    ).join("")}
  `;
}
