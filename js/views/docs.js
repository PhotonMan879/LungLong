import { escapeHtml } from "../core/utils.js";

// ── file type icon helper ─────────────────────────
function docIcon(type) {
  if (type.startsWith("image/"))       return { emoji: "🖼", label: "Image",       cls: "doc-type-image" };
  if (type === "application/pdf")      return { emoji: "📄", label: "PDF",         cls: "doc-type-pdf" };
  if (type.includes("word"))           return { emoji: "📝", label: "Word",        cls: "doc-type-word" };
  if (type.includes("spreadsheet") || type.includes("excel")) return { emoji: "📊", label: "Excel", cls: "doc-type-excel" };
  if (type.startsWith("text/"))        return { emoji: "📃", label: "Text",        cls: "doc-type-text" };
  return                                      { emoji: "📎", label: "File",        cls: "doc-type-file" };
}

function renderDocThumb(doc) {
  // image ที่มี thumbnail ที่สร้างตอน upload
  if (doc.thumbnail) {
    return `<div class="doc-thumb"><img src="${escapeHtml(doc.thumbnail)}" alt="${escapeHtml(doc.name)}"></div>`;
  }
  // ไม่มี thumbnail → แสดง icon ตาม type
  const { emoji, cls } = docIcon(doc.type || "");
  return `<div class="doc-thumb doc-thumb-icon ${cls}">${emoji}</div>`;
}

export function renderDocs(state, trip) {
  return `
    <section class="grid-2">
      <article class="panel">
        <div class="doc-head">
          <div>
            <p class="tiny">Travel vault</p>
            <h2 class="section-title">Upload docs</h2>
            <p class="muted">เก็บ boarding pass, booking, JR pass, map, หรือภาพสำคัญ — sync ข้ามอุปกรณ์อัตโนมัติเมื่อ login</p>
          </div>
        </div>
        <div class="doc-form" style="margin-top:16px;">
          <input id="doc-name" type="text" placeholder="ชื่อเอกสาร เช่น Hotel Booking">
          <input id="doc-tags" type="text" placeholder="tags คั่นด้วย comma เช่น hotel, flight, pass">
          <label id="doc-dropzone" class="file-drop">
            <span>ลากไฟล์มาวางตรงนี้ หรือกดเลือกไฟล์</span>
            <input id="doc-file" type="file" accept=".pdf,image/*">
            <span id="doc-file-meta" class="file-meta">ยังไม่ได้เลือกไฟล์</span>
          </label>
          <button class="primary-btn" type="button" data-action="save-doc">เพิ่มเอกสาร</button>
        </div>
      </article>

      <article class="panel">
        <p class="tiny">Storage notes</p>
        <h2 class="section-title">How docs sync</h2>
        <div class="info-box">
          <p><strong>Login แล้ว:</strong> ไฟล์ขึ้น Supabase storage อัตโนมัติ — เปิดจากเครื่องไหนก็ได้ download มาให้เอง</p>
          <p style="margin-top:8px;"><strong>ไม่ได้ login:</strong> เก็บใน IndexedDB เครื่องนี้เท่านั้น</p>
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="doc-head">
        <div>
          <p class="tiny">Document shelf</p>
          <h2 class="section-title">Saved documents</h2>
          <p class="muted">${trip.docs.length} ไฟล์</p>
        </div>
      </div>
      <div class="docs-grid" style="margin-top:16px;">
        ${
          trip.docs.length
            ? trip.docs.map((doc) => {
                const { label } = docIcon(doc.type || "");
                return `
                  <article class="doc-card" data-action="open-doc" data-doc-id="${doc.id}" style="cursor:pointer;">
                    ${renderDocThumb(doc)}
                    <div class="doc-card-body">
                      <p class="doc-type-label">${escapeHtml(label)}</p>
                      <h3 class="doc-card-name">${escapeHtml(doc.name)}</h3>
                      ${doc.tags?.length ? `<p class="doc-tags">${escapeHtml(doc.tags.join(", "))}</p>` : ""}
                      <p class="doc-meta">${new Date(doc.createdAt).toLocaleDateString("th-TH")} · ${Math.round(doc.size / 1024)} KB</p>
                    </div>
                    <div class="doc-card-actions">
                      <button class="tiny-btn" type="button" data-action="open-doc" data-doc-id="${doc.id}">เปิด</button>
                      <button class="tiny-btn danger-btn" type="button" data-action="delete-doc" data-doc-id="${doc.id}">ลบ</button>
                    </div>
                  </article>
                `;
              }).join("")
            : `<div class="empty-state">
                <div style="font-size:2rem;margin-bottom:8px;">📂</div>
                <p>ยังไม่มีเอกสาร — อัปโหลดด้านบนได้เลย</p>
               </div>`
        }
      </div>
    </section>
  `;
}
