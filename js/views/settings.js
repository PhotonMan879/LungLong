export function renderSettings(state, trip) {
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
          <p class="tiny">Trips</p>
          <h2 class="section-title">Trip manager</h2>
          <p class="muted">สร้างทริปใหม่ เปลี่ยนชื่อ หรือจัดการ active trip</p>
        </div>
        <div class="settings-actions">
          <button class="primary-btn" type="button" data-action="create-trip">สร้างทริปใหม่</button>
          <button class="secondary-btn" type="button" data-action="rename-trip">เปลี่ยนชื่อทริปนี้</button>
          <button class="secondary-btn" type="button" data-action="delete-trip">ลบทริปนี้</button>
        </div>
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
        <p>Active trip ตอนนี้คือ <strong>${trip.name}</strong> และมีทั้งหมด ${Object.keys(state.trips || {}).length} ทริปใน workspace</p>
        <p>จุดเน้นคือ dashboard/today view, import/export, budget plan vs actual, docs local vault, multi-trip และแยกไฟล์ตาม module</p>
      </div>
    </section>
  `;
}
