# Handoff

## โปรเจกต์นี้คืออะไร

นี่คือ `project 2` ของ Kansai Trip App ที่ตั้งใจทำแยกจาก `v1` เพื่อใช้เป็นสนาม hackathon และฐานสำหรับฟีเจอร์ใหม่ โดยไม่เสี่ยงไปทับแอปเดิม

## สถานะตอนส่งต่อ

ตอนนี้แอปใช้งานได้ในระดับ demo ที่ค่อนข้างครบแล้ว

- เปิดทริปหลายอันทับกันไม่ได้ เพราะแยก `activeTripId`
- ใช้บนมือถือได้ดีขึ้นกว่าของเดิม
- มีทั้ง planner, docs vault, assist phrases, และ prep mode
- ยังไม่มี backend

## ไฟล์ที่ควรรู้ก่อนแก้

- `js/main.js`
  - orchestration หลัก
  - render routing
  - event delegation
- `js/core/state.js`
  - ถ้าจะเพิ่ม state ใหม่ ให้เริ่มที่นี่
- `js/data/trip-data.js`
  - ถ้าจะเพิ่ม seed data, templates, checklist defaults
- `js/views/*.js`
  - ถ้าจะแก้ UI รายหน้า
- `styles.css`
  - shared classes ทั้งแอป

## แนวทางเวลาจะเพิ่ม feature ใหม่

1. ตัดสินใจก่อนว่าเป็น
- state change
- view change
- storage change

2. ถ้ามีข้อมูลใหม่ประจำทริป
- เพิ่ม default ใน `trip-data.js`
- เพิ่ม field ใน `createTripState()` ที่ `state.js`

3. ถ้ามีหน้าใหม่
- สร้าง `js/views/<name>.js`
- import เข้า `js/main.js`
- เพิ่ม nav button ใน `index.html`

4. ถ้ามี interaction ใหม่
- ใช้ `data-action`
- handle ผ่าน event delegation ใน `main.js`

## งานถัดไปที่แนะนำ

### 1. Trip templates

ทำ template หลายแบบ เช่น

- Japan city trip
- onsen trip
- food trip

เหมาะมากเพราะตอนนี้มี multi-trip แล้ว

### 2. Weather / rain fallback

ให้แอปช่วยบอกว่าถ้าฝนตกควรโยกไป backup spots ไหน

### 3. Transport helper

เพิ่ม helper สำหรับ route, transfer tips, หรือ ETA แบบง่ายก่อนจะไปถึง integration จริง

### 4. Sync layer

ถ้าจะใช้หลายเครื่อง ค่อยต่อ auth / cloud sync

## ข้อควรระวัง

- `main.js` เริ่มใหญ่ขึ้นอีกครั้งแล้ว
- ยังไม่มี lint หรือ tests ระดับ UI
- docs blob อยู่ใน IndexedDB จึงต้องระวังตอนทำ import/export และ migration
- ถ้าจะทำ backend อย่าผูกโครงสร้างกับ Kansai trip เพียงชุดเดียว ควรทำให้ generic กว่านี้

## Definition of done สำหรับฟีเจอร์ถัดไป

ถือว่าเสร็จเมื่อ

- state ใหม่ persist ได้
- refresh แล้วยังอยู่
- `npm run check` ผ่าน
- flow หลักใน browser ผ่านอย่างน้อย 1 รอบ
- อัปเดต `STATUS.md` ถ้างานนั้นเปลี่ยน milestone ของโปรเจกต์
