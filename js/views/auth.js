export function renderAuthOverlay(sent = false) {
  return `
    <div class="auth-inner">
      <div class="auth-logo">✈️</div>
      <h2 class="auth-title">LungLong</h2>
      <p class="muted" style="margin-bottom:20px; text-align:center;">เข้าสู่ระบบเพื่อซิงค์ข้อมูลทุก device</p>
      ${sent ? `
        <div class="auth-sent-box">
          <p>📬 ส่ง Magic Link ไปที่อีเมลแล้ว</p>
          <p class="muted" style="margin-top:6px; font-size:0.85rem;">เปิดอีเมลแล้วกดลิงก์เพื่อเข้าสู่ระบบ</p>
        </div>
      ` : `
        <form id="auth-form">
          <input type="email" id="auth-email" class="field" placeholder="อีเมลของคุณ" required autocomplete="email" style="width:100%; margin-bottom:10px;" />
          <button type="submit" class="primary-btn" style="width:100%;">ส่ง Magic Link</button>
        </form>
      `}
      <hr style="margin:20px 0; border-color:var(--border, var(--line));" />
      <button class="secondary-btn" id="auth-skip" style="width:100%;">ข้ามก่อน (Local only)</button>
      <p class="muted" style="font-size:0.72rem; margin-top:12px; text-align:center;">Magic Link = ไม่ต้องจำรหัสผ่าน กดลิงก์ในอีเมลได้เลย</p>
    </div>
  `;
}
