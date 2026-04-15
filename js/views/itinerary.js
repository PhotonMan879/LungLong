import { escapeHtml, getLinkPreview, joinTags, mapsSearchUrl, researchUrl, textMatches } from "../core/utils.js";

function matchesFilter(activityState, filter) {
  if (filter === "all") return true;
  return filter === "done" ? activityState.checked : !activityState.checked;
}

function getTimeBucket(time) {
  const hour = Number.parseInt(String(time).split(":")[0], 10);
  if (Number.isNaN(hour)) return "flex";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function getBucketMeta(bucket) {
  return {
    morning: { label: "Morning", emoji: "🌤", hint: "ก่อนเที่ยง / เริ่มวัน" },
    afternoon: { label: "Afternoon", emoji: "☀️", hint: "เที่ยงถึงบ่าย" },
    evening: { label: "Evening", emoji: "🌙", hint: "เย็นถึงค่ำ" },
    flex: { label: "Flexible", emoji: "🗂", hint: "เวลาไม่ชัดเจน" }
  }[bucket];
}

function renderActivityCard(activity, trip) {
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
              ${activityState.links.map((link, index) => renderLinkCard(link, activity.id, index)).join("")}
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
      <div class="activity-stack timeline-sections" style="margin-top:16px;">
        ${
          activities.length
            ? ["morning", "afternoon", "evening", "flex"]
                .map((bucket) => {
                  const bucketActivities = activities.filter((activity) => getTimeBucket(activity.time) === bucket);
                  if (!bucketActivities.length) return "";
                  const meta = getBucketMeta(bucket);
                  return `
                    <section class="timeline-section">
                      <div class="timeline-section-head">
                        <div>
                          <p class="tiny">${meta.hint}</p>
                          <h4 class="timeline-section-title">${meta.emoji} ${meta.label}</h4>
                        </div>
                        <span class="meta-chip">${bucketActivities.length} stops</span>
                      </div>
                      <div class="activity-stack">
                        ${bucketActivities.map((activity) => renderActivityCard(activity, trip)).join("")}
                      </div>
                    </section>
                  `;
                })
                .join("")
            : `<div class="empty-state">ไม่มีรายการที่ตรงกับ filter หรือคำค้นหาในวันนี้</div>`
        }
      </div>

      ${(() => {
        const recPlaces = (trip.recommendedPlaces || []);
        const dayActIds = new Set(day.activities.map((a) => a.title));
        const availableRec = recPlaces.filter((r) => !dayActIds.has(r.name));

        if (!availableRec.length) return "";

        return `
          <div class="inline-add-place">
            <div class="inline-add-head">
              <span style="font-size:1.2rem;">📍</span> เพิ่มสถานที่ท่องเที่ยวด่วน (Day ${day.id})
            </div>
            <div class="inline-rec-scroll">
              ${availableRec.map(r => `
                <div class="inline-rec-card">
                  <div class="place-rec-name" title="${escapeHtml(r.name)}"><strong>${escapeHtml(r.name)}</strong></div>
                  <div style="font-size:0.8rem;" class="muted">${escapeHtml(r.estimatedTime || "")} • ${escapeHtml(r.category)}</div>
                  <button class="secondary-btn" style="padding:6px; margin-top:4px; border:1px solid var(--accent); color:var(--accent);" type="button" data-action="inline-add-itinerary" data-day-id="${day.id}" data-rec-id="${r.id}">
                    + ยัดใส่ลงแผน
                  </button>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      })()}

    </section>
  `;
}

function renderLinkCard(link, activityId, index) {
  const preview = getLinkPreview(link);

  if (preview.type === "youtube" && preview.videoId) {
    return `
      <div class="video-embed-wrapper" style="margin-top:12px;">
        <iframe src="https://www.youtube.com/embed/${preview.videoId}?rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <div class="embed-toolbar">
        <div class="muted">► YouTube Video</div>
        <div class="link-actions">
          <button class="tiny-btn" type="button" data-action="open-link" data-url="${escapeHtml(link)}">เปิดดูแยก</button>
          <button class="tiny-btn" type="button" data-action="remove-link" data-activity-id="${activityId}" data-link-index="${index}">ลบวิดีโอ</button>
        </div>
      </div>
    `;
  }

  if (preview.type === "tiktok" && preview.videoId) {
    return `
      <div class="tiktok-embed-wrapper" style="margin-top:12px;">
        <iframe src="https://www.tiktok.com/embed/v2/${preview.videoId}" allowfullscreen scrolling="no" allow="encrypted-media"></iframe>
      </div>
      <div class="embed-toolbar">
        <div class="muted">♪ TikTok</div>
        <div class="link-actions">
          <button class="tiny-btn" type="button" data-action="open-link" data-url="${escapeHtml(link)}">เปิดดูแยก</button>
          <button class="tiny-btn" type="button" data-action="remove-link" data-activity-id="${activityId}" data-link-index="${index}">ลบวิดีโอ</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="link-item link-item-rich">
      ${
        preview.thumbnail
          ? `<a href="${escapeHtml(link)}" target="_blank" rel="noreferrer" class="link-thumb-wrap">
              <img class="link-thumb" src="${escapeHtml(preview.thumbnail)}" alt="${escapeHtml(preview.label)} preview">
            </a>`
          : `<a href="${escapeHtml(link)}" target="_blank" rel="noreferrer" class="link-thumb-wrap link-thumb-fallback ${preview.badgeClass}">
              <span>${escapeHtml(preview.icon)}</span>
            </a>`
      }
      <div class="link-content">
        <div class="chip-row">
          <span class="link-badge ${preview.badgeClass}">${escapeHtml(preview.label)}</span>
        </div>
        <a href="${escapeHtml(link)}" target="_blank" rel="noreferrer" class="link-title">${escapeHtml(link)}</a>
        <div class="muted">${escapeHtml(preview.displayUrl)}</div>
      </div>
      <div class="link-actions">
        <button class="tiny-btn" type="button" data-action="open-link" data-url="${escapeHtml(link)}">เปิด</button>
        <button class="tiny-btn" type="button" data-action="remove-link" data-activity-id="${activityId}" data-link-index="${index}">ลบ</button>
      </div>
    </div>
  `;
}
