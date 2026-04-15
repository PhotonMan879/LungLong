import { escapeHtml, joinTags, mapsSearchUrl, researchUrl, textMatches } from "../core/utils.js";

function matchesFilter(activityState, filter) {
  if (filter === "all") return true;
  return filter === "done" ? activityState.checked : !activityState.checked;
}

export function renderItinerary(state, trip) {
  const day = trip.days.find((item) => item.id === trip.dayId) || trip.days[0];
  const activities = day.activities.filter((activity) => {
    const activityState = trip.activities[activity.id] || {};
    const searchable = `${activity.title} ${activity.desc} ${activity.tags.join(" ")} ${day.city}`;
    return matchesFilter(activityState, state.filter) && textMatches(searchable, state.search);
  });

  return `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Trip timeline</p>
          <h2 class="section-title">Daily itinerary</h2>
          <p class="muted">เลือกวัน, filter สถานะ, และแก้ note/link ของแต่ละกิจกรรมได้จากที่นี่</p>
        </div>
        <div class="badge-row">
          <span class="status-chip ${day.pass ? "good" : "warn"}">${day.pass ? "Pass ใช้ได้" : "ใช้ ICOCA/ตั๋วแยก"}</span>
          <a class="secondary-btn" href="${mapsSearchUrl(`${day.theme} ${day.city} japan`)}" target="_blank" rel="noreferrer">แผนที่วันนี้</a>
          <a class="secondary-btn" href="${researchUrl(day.theme)}" target="_blank" rel="noreferrer">Research day</a>
        </div>
      </div>

      <div class="day-switcher" style="margin-top:16px;">
        ${trip.days.map(
          (item) => `
            <button class="pill-btn ${item.id === day.id ? "active" : ""}" type="button" data-action="set-day" data-day-id="${item.id}">
              Day ${item.id}
            </button>
          `
        ).join("")}
      </div>

      <div class="filter-row" style="margin-top:12px;">
        ${["all", "todo", "done"].map(
          (filter) => `
            <button class="filter-chip ${state.filter === filter ? "active" : ""}" type="button" data-action="set-filter" data-filter="${filter}">
              ${filter === "all" ? "ทั้งหมด" : filter === "todo" ? "ยังไม่ทำ" : "ทำแล้ว"}
            </button>
          `
        ).join("")}
      </div>
    </section>

    <section class="panel">
      <div class="day-header">
        <div>
          <h3 class="section-title">Day ${day.id} - ${day.date}</h3>
          <p class="muted">${day.theme}</p>
        </div>
      </div>
      <div class="activity-stack" style="margin-top:16px;">
        ${
          activities.length
            ? activities
                .map((activity) => {
                  const activityState = trip.activities[activity.id] || { checked: false, note: "", links: [] };
                  return `
                    <article class="activity-card ${activityState.checked ? "checked" : ""}">
                      <div class="activity-top">
                        <div class="activity-title">
                          <div>${activity.icon}</div>
                          <div>
                            <div class="day-title">${escapeHtml(activity.title)}</div>
                            <p class="muted">${escapeHtml(activity.desc)}</p>
                            <div class="chip-row" style="margin-top:8px;">${joinTags(activity.tags)}</div>
                          </div>
                        </div>
                        <div class="time-pill">${activity.time}</div>
                      </div>
                      ${
                        activityState.note
                          ? `<div class="note-box" style="margin-top:12px;"><strong>Note:</strong> ${escapeHtml(activityState.note)}</div>`
                          : ""
                      }
                      ${
                        activityState.links?.length
                          ? `<div class="link-list" style="margin-top:12px;">
                              ${activityState.links
                                .map(
                                  (link, index) => `
                                    <div class="link-item">
                                      <a href="${escapeHtml(link)}" target="_blank" rel="noreferrer">${escapeHtml(link)}</a>
                                      <button class="tiny-btn" type="button" data-action="remove-link" data-activity-id="${activity.id}" data-link-index="${index}">ลบ</button>
                                    </div>
                                  `
                                )
                                .join("")}
                            </div>`
                          : ""
                      }
                      <div class="action-row" style="margin-top:12px;">
                        <button class="tiny-btn" type="button" data-action="toggle-activity" data-activity-id="${activity.id}">
                          ${activityState.checked ? "เอาออกจาก done" : "Mark done"}
                        </button>
                        <button class="tiny-btn" type="button" data-action="edit-note" data-activity-id="${activity.id}">Edit note</button>
                        <button class="tiny-btn" type="button" data-action="add-link" data-activity-id="${activity.id}">Add link</button>
                        <button class="tiny-btn" type="button" data-action="open-maps" data-query="${escapeHtml(activity.title)} Japan">Maps</button>
                        <button class="tiny-btn" type="button" data-action="open-research" data-query="${escapeHtml(activity.title)}">Research</button>
                      </div>
                    </article>
                  `;
                })
                .join("")
            : `<div class="empty-state">ไม่มีรายการที่ตรงกับ filter หรือคำค้นหาในวันนี้</div>`
        }
      </div>
    </section>
  `;
}
