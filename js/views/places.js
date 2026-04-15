import { escapeHtml, uid, joinTags, getLinkPreview, openInNewTab } from "../core/utils.js";

const CATEGORY_META = {
  all:      { label: "ทั้งหมด", emoji: "🗺" },
  food:     { label: "อาหาร",    emoji: "🍜" },
  temple:   { label: "วัด/ศาลเจ้า", emoji: "⛩" },
  nature:   { label: "ธรรมชาติ", emoji: "🌿" },
  culture:  { label: "วัฒนธรรม", emoji: "🏯" },
  view:     { label: "วิว",      emoji: "🌆" },
  shopping: { label: "ช้อปปิ้ง", emoji: "🛍" }
};

const STATUS_META = {
  pending: { label: "อยากไป",  emoji: "⏳", next: "visited"  },
  visited: { label: "ไปแล้ว",  emoji: "✅", next: "skipped"  },
  skipped: { label: "ข้ามไป",  emoji: "⛔", next: "pending"  }
};

// ── helpers ───────────────────────────────────────

function catMeta(cat) {
  return CATEGORY_META[cat] || { label: cat, emoji: "📍" };
}

function isAdded(trip, recId) {
  return trip.placesList.some((p) => p.sourceId === recId);
}

// ── saved place card ──────────────────────────────

function renderSavedCard(place, state, trip) {
  const st = STATUS_META[place.visitStatus] || STATUS_META.pending;
  const cat = catMeta(place.category);
  const isMoving = state?.movingPlaceId === place.id;
  const linkHtml = (place.links || []).map((url, idx) => {
    const preview = getLinkPreview(url);
    if (preview.type === "youtube" && preview.videoId) {
      return `
        <div class="video-embed-wrapper" style="margin-top:12px;">
          <iframe src="https://www.youtube.com/embed/${preview.videoId}?rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="embed-toolbar">
          <div class="muted">► YouTube Video</div>
          <button class="tiny-btn" type="button" data-action="remove-place-link" data-place-id="${place.id}" data-link-idx="${idx}">ลบวิดีโอ</button>
        </div>
      `;
    }
    return `
      <div class="place-link-row">
        <span class="link-badge ${preview.badgeClass}">${escapeHtml(preview.icon)} ${escapeHtml(preview.label)}</span>
        <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" class="place-link-url">${escapeHtml(preview.displayUrl)}</a>
        <button class="tiny-btn" type="button" data-action="remove-place-link"
          data-place-id="${place.id}" data-link-idx="${idx}">ลบ</button>
      </div>
    `;
  }).join("");

  const moveDayButtons = isMoving && trip ? `
    <div class="move-day-row" style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap; padding:8px; background:var(--surface); border-radius:var(--radius-sm); border: 1px solid var(--accent);">
      <div style="font-size:0.8rem; font-weight:bold; width:100%; color:var(--accent);">จัดลงวันใน Itinerary:</div>
      ${trip.days.map((d) => `<button class="secondary-btn" style="padding:4px 8px; font-size:0.8rem;" type="button" data-action="move-to-day" data-day="${d.id}" data-place-id="${place.id}">Day ${d.id}</button>`).join("")}
    </div>
  ` : "";

  return `
    <article class="place-saved-card" id="place-${escapeHtml(place.id)}">
      <div class="place-saved-top">
        <div class="place-saved-info">
          <span class="place-cat-emoji">${cat.emoji}</span>
          <div>
            <div class="place-saved-name">
              ${escapeHtml(place.name)}
              ${place.addedFrom === "custom" ? `<span class="meta-chip" style="margin-left:6px;">👤 สร้างเอง</span>` : ""}
            </div>
            ${place.estimatedTime
              ? `<span class="place-time-chip">⏱ ${escapeHtml(place.estimatedTime)}</span>`
              : ""}
          </div>
        </div>
        <div class="place-saved-controls">
          <button class="status-cycle-btn status-${place.visitStatus}" type="button"
            data-action="cycle-place-status" data-place-id="${place.id}"
            title="คลิกเพื่อเปลี่ยนสถานะ">
            ${st.emoji} ${st.label}
          </button>
          <button class="tiny-btn remove-btn" type="button" style="color:var(--danger); border-color:var(--danger);"
            data-action="remove-place" data-place-id="${place.id}">ลบออก</button>
        </div>
      </div>
      ${place.desc ? `<div class="place-rec-desc muted">${escapeHtml(place.desc)}</div>` : ""}
      ${place.note
        ? `<div class="place-note">${escapeHtml(place.note)}</div>`
        : ""}
      ${linkHtml ? `<div class="place-links">${linkHtml}</div>` : ""}
      <div class="place-saved-actions">
        <button class="tiny-btn" type="button"
          data-action="edit-place-note" data-place-id="${place.id}">
          ${place.note ? "แก้ Note" : "+ Note"}
        </button>
        <button class="tiny-btn" type="button"
          data-action="add-place-link" data-place-id="${place.id}">+ Link</button>
        <button class="tiny-btn" type="button"
          data-action="open-maps" data-query="${escapeHtml(place.name)} Japan">Maps</button>
        <button class="tiny-btn" type="button" style="border-color:var(--accent); color:var(--accent);"
          data-action="toggle-move-to-day" data-place-id="${place.id}">🗓️ ลง Itinerary</button>
      </div>
      ${moveDayButtons}
    </article>
  `;
}

// ── recommended card ──────────────────────────────

function renderRecCard(rec, added) {
  const cat = catMeta(rec.category);
  return `
    <article class="place-rec-card ${added ? "rec-added" : ""}">
      <div class="place-rec-head">
        <span class="place-cat-emoji">${cat.emoji}</span>
        <button class="place-add-btn ${added ? "added" : ""}" type="button"
          data-action="${added ? "" : "add-rec-place"}"
          data-rec-id="${rec.id}"
          ${added ? "disabled" : ""}>
          ${added ? "✓ เพิ่มแล้ว" : "+ เพิ่ม"}
        </button>
      </div>
      <div class="place-rec-name">${escapeHtml(rec.name)}</div>
      <div class="place-rec-desc muted">${escapeHtml(rec.desc)}</div>
      <div class="place-rec-meta">
        ${rec.estimatedTime ? `<span class="meta-chip">⏱ ${escapeHtml(rec.estimatedTime)}</span>` : ""}
        <span class="meta-chip">${escapeHtml(cat.label)}</span>
      </div>
      <div class="chip-row" style="margin-top:8px;">
        ${(rec.tags || []).map((t) => `<span class="inline-tag">${escapeHtml(t)}</span>`).join("")}
      </div>
    </article>
  `;
}

// ── main render ───────────────────────────────────

export function renderPlaces(state, trip) {
  const activeFilter = state.placesFilter || "all";
  const recPlaces = (trip.recommendedPlaces || []);
  const savedList  = (trip.placesList || []);

  // filter saved list by category
  const filteredSaved = activeFilter === "all"
    ? savedList
    : savedList.filter((p) => p.category === activeFilter);

  // filter recommended by category
  const filteredRec = activeFilter === "all"
    ? recPlaces
    : recPlaces.filter((r) => r.category === activeFilter);

  // category filter buttons
  const availableCats = ["all", ...new Set([
    ...recPlaces.map((r) => r.category),
    ...savedList.map((p) => p.category)
  ].filter(Boolean))];

  const filterBar = availableCats.map((cat) => {
    const m = catMeta(cat);
    return `
      <button class="filter-chip ${activeFilter === cat ? "active" : ""}" type="button"
        data-action="set-places-filter" data-cat="${cat}">
        ${m.emoji} ${m.label}
      </button>`;
  }).join("");

  // saved section
  const savedSection = `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Trip wishlist</p>
          <h2 class="section-title">Places ที่อยากไป</h2>
          <p class="muted">จัดการรายการ, บันทึก note, และ track สถานะการเยี่ยมชม</p>
        </div>
        <div class="action-row">
          <button class="primary-btn" type="button" data-action="open-add-place-modal">+ เพิ่มเอง</button>
        </div>
      </div>

      <div class="filter-row" style="margin-top:14px;">${filterBar}</div>

      <div class="places-saved-list" style="margin-top:18px;">
        ${filteredSaved.length
          ? filteredSaved.map((p) => renderSavedCard(p, state, trip)).join("")
          : `<div class="empty-state">
              <div style="font-size:2rem;margin-bottom:8px;">📍</div>
              <p>${activeFilter === "all"
                ? "ยังไม่มีสถานที่ในรายการ — เพิ่มจากรายการแนะนำด้านล่าง หรือกด + เพิ่มเอง"
                : `ไม่มีสถานที่หมวด "${catMeta(activeFilter).label}" ในรายการ`}</p>
             </div>`}
      </div>
    </section>
  `;

  // recommended section
  const recSection = recPlaces.length ? `
    <section class="panel">
      <div class="day-header">
        <div>
          <p class="tiny">Curated for this trip</p>
          <h2 class="section-title">แนะนำสำหรับทริปนี้</h2>
          <p class="muted">คลิก + เพิ่ม เพื่อใส่สถานที่เข้า wishlist — ${recPlaces.length} recommendations</p>
        </div>
      </div>
      <div class="places-rec-grid" style="margin-top:16px;">
        ${filteredRec.map((r) => renderRecCard(r, isAdded(trip, r.id))).join("")}
      </div>
      ${filteredRec.length === 0
        ? `<div class="empty-state">ไม่มีคำแนะนำในหมวดนี้</div>`
        : ""}
    </section>
  ` : `
    <section class="panel">
      <div class="empty-state">
        <div style="font-size:2rem;margin-bottom:8px;">🗺</div>
        <p>ยังไม่มีรายการแนะนำสำหรับ template นี้</p>
        <p class="muted" style="margin-top:6px;font-size:0.88rem;">ใช้ "เพิ่มเอง" เพื่อสร้างรายการสถานที่ด้วยตัวเอง</p>
      </div>
    </section>
  `;

  return savedSection + recSection;
}
