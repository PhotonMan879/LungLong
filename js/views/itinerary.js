import { escapeHtml, getLinkPreview, joinTags, mapsSearchUrl, researchUrl, textMatches } from "../core/utils.js";

// ── category emoji helper (inline, no extra import) ──
const CAT_EMOJI = {
  food: "🍜", temple: "⛩", nature: "🌿", culture: "🏯",
  view: "🌆", shopping: "🛍", custom: "📍"
};
function catEmoji(cat) { return CAT_EMOJI[cat] || "📍"; }

// ── filters ──────────────────────────────────────────

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
    morning:   { label: "Morning",   emoji: "🌤",  hint: "ก่อนเที่ยง / เริ่มวัน" },
    afternoon: { label: "Afternoon", emoji: "☀️",  hint: "เที่ยงถึงบ่าย" },
    evening:   { label: "Evening",   emoji: "🌙",  hint: "เย็นถึงค่ำ" },
    flex:      { label: "Flexible",  emoji: "🗂",  hint: "เวลาไม่ชัดเจน" }
  }[bucket];
}

// ── collapse state helper ─────────────────────────────
// Default: only the active day (trip.dayId) is expanded.
// User overrides stored in state._collapsedDays = { [dayId]: true|false }
function isDayCollapsed(state, dayId, activeDayId) {
  const overrides = state._collapsedDays || {};
  if (dayId in overrides) return overrides[dayId];
  return dayId !== activeDayId; // implicit default
}

// ── activity card ────────────────────────────────────

function renderActivityCard(activity, trip, dayId) {
  const activityState = trip.activities[activity.id] || { checked: false, note: "", links: [] };
  const recMap = new Map((trip.recommendedPlaces || []).map((r) => [r.name, r]));
  const savedMap = new Map((trip.placesList || []).map((p) => [p.name, p]));
  const coordSrc = recMap.get(activity.title) || savedMap.get(activity.title);
  const mapAttrs = coordSrc?.lat && coordSrc?.lng
    ? `data-action="show-on-map" data-lat="${coordSrc.lat}" data-lng="${coordSrc.lng}" style="cursor:pointer"`
    : "";
  const tagsInline = activity.tags.map(t => `<span class="inline-tag mini-tag">${t}</span>`).join("");
  return `
    <article class="activity-card compact ${activityState.checked ? "checked" : ""}" ${mapAttrs}>
      <div class="activity-top">
        <span class="activity-icon">${activity.icon}</span>
        <div class="activity-body">
          <div class="activity-headline">
            <strong>${escapeHtml(activity.title)}</strong>
            <span class="time-pill">${activity.time}</span>
            ${tagsInline}
          </div>
          <p class="muted compact-desc">${escapeHtml(activity.desc)}</p>
        </div>
      </div>
      ${
        activityState.note
          ? `<div class="note-box compact-note"><strong>Note:</strong> ${escapeHtml(activityState.note)}</div>`
          : ""
      }
      ${
        activityState.links?.length
          ? `<div class="link-list compact-links">
              ${activityState.links.map((link, index) => renderLinkCard(link, activity.id, index)).join("")}
            </div>`
          : ""
      }
      <div class="action-row compact-actions">
        <button class="tiny-btn" type="button" data-action="toggle-activity" data-activity-id="${activity.id}">
          ${activityState.checked ? "Undo" : "Done"}
        </button>
        <button class="tiny-btn" type="button" data-action="edit-note" data-activity-id="${activity.id}">Note</button>
        <button class="tiny-btn" type="button" data-action="add-link" data-activity-id="${activity.id}">Link</button>
        <button class="tiny-btn" type="button" data-action="open-maps" data-query="${escapeHtml(activity.title)} Japan">Maps</button>
        <button class="tiny-btn danger-btn" type="button" data-action="remove-activity" data-activity-id="${activity.id}" data-day-id="${dayId}">ลบ</button>
      </div>
    </article>
  `;
}

// ── recommended badge strip ───────────────────────────
// Compact pills shown at bottom of each expanded day.
// Only shows places NOT already in that day's activities.

function renderRecBadgeStrip(day, trip) {
  const recPlaces = trip.recommendedPlaces || [];
  const dayActTitles = new Set(day.activities.map((a) => a.title));
  const available = recPlaces.filter((r) => !dayActTitles.has(r.name));
  if (!available.length) return "";

  const badges = available.map((r) => `
    <button
      class="rec-badge"
      type="button"
      data-action="inline-add-itinerary"
      data-day-id="${day.id}"
      data-rec-id="${r.id}"
      title="${escapeHtml(r.name)}${r.estimatedTime ? " · " + r.estimatedTime : ""}"
    >${catEmoji(r.category)} ${escapeHtml(r.name)} <span class="rec-badge-plus">+</span></button>
  `).join("");

  return `
    <div class="rec-badge-strip">
      <span class="rec-badge-label">แนะนำ</span>
      <div class="rec-badge-scroll">${badges}</div>
    </div>
  `;
}

// ── day content (activities + badge strip) ────────────

function renderDayContent(day, filteredActivities, trip, state) {
  const activityHtml = filteredActivities.length
    ? ["morning", "afternoon", "evening", "flex"]
        .map((bucket) => {
          const bucketActivities = filteredActivities.filter(
            (activity) => getTimeBucket(activity.time) === bucket
          );
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
                ${bucketActivities.map((activity) => renderActivityCard(activity, trip, day.id)).join("")}
              </div>
            </section>
          `;
        })
        .join("")
    : `<div class="empty-state">ไม่มีรายการที่ตรงกับ filter หรือคำค้นหาในวันนี้</div>`;

  return `
    <div class="day-collapse-body">
      <div class="day-body-meta">
        <span class="status-chip ${day.pass ? "good" : "warn"}">${day.pass ? "Pass ใช้ได้" : "ใช้ ICOCA/ตั๋วแยก"}</span>
        <a class="secondary-btn" href="${mapsSearchUrl(`${day.theme} ${day.city} japan`)}" target="_blank" rel="noreferrer">แผนที่วันนี้</a>
        <a class="secondary-btn" href="${researchUrl(day.theme)}" target="_blank" rel="noreferrer">Research</a>
      </div>
      <div class="activity-stack timeline-sections" style="margin-top:10px;">
        ${activityHtml}
      </div>
      ${renderRecBadgeStrip(day, trip)}
    </div>
  `;
}

// ── single collapsible day row ────────────────────────

function renderDaySection(day, trip, state) {
  const isCollapsed = isDayCollapsed(state, day.id, trip.dayId);
  const filteredActivities = day.activities.filter((activity) => {
    const activityState = trip.activities[activity.id] || {};
    const searchable = `${activity.title} ${activity.desc} ${activity.tags.join(" ")} ${day.city || ""}`;
    return matchesFilter(activityState, state.filter) && textMatches(searchable, state.search);
  });

  const doneCount = day.activities.filter((a) => (trip.activities[a.id] || {}).checked).length;
  const totalCount = day.activities.length;

  return `
    <div class="day-collapse-section ${isCollapsed ? "collapsed" : "expanded"}" id="day-section-${day.id}">
      <button
        class="day-collapse-header"
        type="button"
        data-action="toggle-day-collapse"
        data-day-id="${day.id}"
        aria-expanded="${!isCollapsed}"
      >
        <div class="day-collapse-left">
          <span class="day-collapse-arrow" aria-hidden="true">${isCollapsed ? "▶" : "▼"}</span>
          <span class="day-chip">Day ${day.id}</span>
          <div class="day-collapse-info">
            <span class="day-collapse-date">${escapeHtml(day.date || "")}</span>
            <span class="day-collapse-theme">${escapeHtml(day.theme || "")}</span>
          </div>
        </div>
        <div class="day-collapse-right">
          <span class="meta-chip">${doneCount}/${totalCount}</span>
          ${day.pass ? `<span class="status-chip good" style="font-size:0.72rem;padding:2px 7px;">🎫 Pass</span>` : ""}
        </div>
      </button>
      ${!isCollapsed ? renderDayContent(day, filteredActivities, trip, state) : ""}
    </div>
  `;
}

// ── main export ───────────────────────────────────────

export function renderItinerary(state, trip) {
  return `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Trip timeline</p>
          <h2 class="section-title">Daily itinerary</h2>
          <p class="muted">กดหัว Day เพื่อเปิด/ปิดแต่ละวัน — filter สถานะ และแก้ note/link ได้จากที่นี่</p>
        </div>
      </div>
      <div class="filter-row" style="margin-top:10px;">
        ${["all", "todo", "done"].map(
          (filter) => `
            <button class="filter-chip ${state.filter === filter ? "active" : ""}" type="button" data-action="set-filter" data-filter="${filter}">
              ${filter === "all" ? "ทั้งหมด" : filter === "todo" ? "ยังไม่ทำ" : "ทำแล้ว"}
            </button>
          `
        ).join("")}
      </div>
    </section>

    <section class="panel itinerary-all-days">
      ${trip.days.map((day) => renderDaySection(day, trip, state)).join("")}
    </section>
  `;
}

// ── link card ────────────────────────────────────────

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
