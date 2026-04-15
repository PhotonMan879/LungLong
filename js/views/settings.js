export function renderSettings() {
  return `
    <section class="grid-2">
      <article class="settings-card">
        <div>
          <p class="tiny">Backups</p>
          <h2 class="section-title">Export / Import</h2>
          <p class="muted">export state ทั้งแอปเป็น JSON พร้อมเอกสารที่เก็บใน IndexedDB เพื่อย้ายเครื่องหรือ backup ก่อน hackathon demo</p>
        </div>
        <div class="settings-actions">
          <button class="primary-btn" type="button" data-action="export-json">Export project backup</button>
          <button class="secondary-btn" type="button" data-action="trigger-import">Import backup</button>
        </div>
        <input id="import-json-input" type="file" accept="application/json" hidden>
      </article>

      <article class="settings-card">
        <div>
          <p class="tiny">Theme</p>
          <h2 class="section-title">Display settings</h2>
          <p class="muted">theme ถูกบันทึกไว้ใน state เพื่อให้ใช้ข้าม session ได้</p>
        </div>
        <div class="settings-actions">
          <button class="secondary-btn" type="button" data-action="set-theme" data-theme="light">Light mode</button>
          <button class="secondary-btn" type="button" data-action="set-theme" data-theme="dark">Dark mode</button>
        </div>
      </article>
    </section>

    <section class="settings-card">
      <div>
        <p class="tiny">Project notes</p>
        <h2 class="section-title">What Project 2 changes</h2>
      </div>
      <div class="info-box">
        <p>โฟลเดอร์นี้เป็นโปรเจกต์ใหม่แยกจากของเดิมโดยสมบูรณ์ เหมาะสำหรับ hackathon, refactor, และทดลอง feature โดยไม่เสี่ยงทับไฟล์ index.html รุ่นเดิม</p>
        <p>จุดเน้นคือ dashboard/today view, import/export, budget plan vs actual, docs local vault, และแยกไฟล์ตาม module</p>
      </div>
    </section>
  `;
}
