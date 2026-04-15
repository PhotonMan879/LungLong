import { escapeHtml } from "../core/utils.js";

export function renderDocs(state) {
  return `
    <section class="grid-2">
      <article class="panel">
        <div class="doc-head">
          <div>
            <p class="tiny">Travel vault</p>
            <h2 class="section-title">Upload docs</h2>
            <p class="muted">เก็บ boarding pass, booking, JR pass, map, หรือภาพสำคัญไว้ใน IndexedDB ของ browser เครื่องนี้</p>
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
        <h2 class="section-title">How docs work in Project 2</h2>
        <div class="info-box">
          <p>เอกสารจริงเก็บใน IndexedDB และ metadata เก็บใน localStorage เพื่อให้ import/export และ render เร็วขึ้น</p>
          <p>เหมาะกับ hackathon และโหมด local-first โดยไม่เสี่ยงไปแตะ Firebase config ของโปรเจกต์เดิม</p>
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="doc-head">
        <div>
          <p class="tiny">Local document shelf</p>
          <h2 class="section-title">Saved documents</h2>
        </div>
      </div>
      <div class="docs-grid" style="margin-top:16px;">
        ${
          state.docs.length
            ? state.docs
                .map(
                  (doc) => `
                    <article class="doc-card">
                      <div>
                        <p class="tiny">${escapeHtml(doc.type)}</p>
                        <h3>${escapeHtml(doc.name)}</h3>
                      </div>
                      <p class="doc-preview">${escapeHtml((doc.tags || []).join(", ")) || "no tags"}</p>
                      <p class="doc-preview">${new Date(doc.createdAt).toLocaleString("th-TH")} · ${Math.round(doc.size / 1024)} KB</p>
                      <div class="action-row">
                        <button class="tiny-btn" type="button" data-action="open-doc" data-doc-id="${doc.id}">เปิด</button>
                        <button class="tiny-btn" type="button" data-action="delete-doc" data-doc-id="${doc.id}">ลบ</button>
                      </div>
                    </article>
                  `
                )
                .join("")
            : `<div class="empty-state">ยังไม่มีเอกสารในเครื่องนี้</div>`
        }
      </div>
    </section>
  `;
}
