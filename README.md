# Kansai Trip App - Project 2

โปรเจกต์นี้เป็นเวอร์ชันแยกจากแอปเดิมโดยตั้งใจ เพื่อใช้เป็น `project 2` สำหรับ hackathon, refactor, และทดลองฟีเจอร์ใหม่โดยไม่ไปทับ `v1`

## สิ่งที่มีตอนนี้

- โครงสร้างแบบหลายไฟล์แทน single-file
- `Dashboard / Assist / Prep / Itinerary / Docs / Budget / Settings`
- `Budget` แบบ `planned vs actual`
- `Docs` local vault เก็บไฟล์ใน IndexedDB
- `Export / Import backup` เป็น JSON
- `Backup spots` + `custom spots`
- `Multi-trip workspace`
- `Prep / packing mode` สำหรับช่วงก่อนเดินทาง
- ยังเป็น `Vanilla JS` และไม่มี build step

## วิธีเปิดใช้งาน

```bash
cd "/Users/photonman/Desktop/Japan 2026/kansai-trip-app-v2"
npm run serve
```

แล้วเปิด [http://localhost:4173](http://localhost:4173)

หรือถ้าไม่ใช้ `npm`

```bash
cd "/Users/photonman/Desktop/Japan 2026/kansai-trip-app-v2"
python3 -m http.server 4173
```

## คำสั่งหลัก

```bash
npm run serve
npm run check
```

- `npm run serve` เปิด static server ที่พอร์ต `4173`
- `npm run check` เช็กว่าโมดูลทั้งหมด import ได้และ `main.js` โหลดได้ใน stubbed environment

## โครงสร้างหลัก

- `index.html` - app shell และ nav หลัก
- `styles.css` - design system และ layout
- `js/data/trip-data.js` - default trip template และ seed data
- `js/core/state.js` - state factory, persistence, migration
- `js/core/storage.js` - IndexedDB สำหรับ docs
- `js/core/utils.js` - helpers กลาง
- `js/views/*.js` - render แยกตามแต่ละหน้า
- `sw.js` / `manifest.webmanifest` - PWA basics

## เอกสารที่ควรอ่านต่อ

- [ARCHITECTURE.md](./ARCHITECTURE.md) - ภาพรวมระบบและ data flow
- [STATUS.md](./STATUS.md) - งานที่เสร็จแล้วและสิ่งที่ยังไม่ทำ
- [TESTING.md](./TESTING.md) - วิธีทดสอบหลักและ smoke checks
- [HANDOFF.md](./HANDOFF.md) - context สำหรับคนมารับช่วงต่อ

## หมายเหตุ

- โปรเจกต์นี้ไม่แตะ Firebase config ของเวอร์ชันเดิม
- เอกสารในหน้า `Docs` เก็บแบบ local-first ต่อ browser profile
- ถ้าต้องการ sync ข้ามอุปกรณ์ ค่อยต่อ Firebase หรือ backend ในรอบถัดไป
