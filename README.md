# Kansai Trip App - Project 2

โปรเจกต์นี้เป็นเวอร์ชันแยกจากแอปเดิมโดยตั้งใจ เพื่อใช้เป็น `project 2` สำหรับ hackathon / refactor / ทดลองฟีเจอร์ใหม่โดยไม่ไปทับไฟล์หลักใน root ของ repo

## จุดเด่นของ Project 2

- แยกเป็นหลายไฟล์แทน single-file `index.html`
- มี `Dashboard / Today view`
- มี `Budget` แบบ `planned vs actual`
- มี `Docs` local vault เก็บไฟล์ใน IndexedDB
- มี `Export / Import backup` เป็น JSON
- มี `Backup spots` + `custom spots`
- ยังเป็น `Vanilla JS` และไม่มี build step

## โครงสร้าง

- `index.html` - app shell
- `styles.css` - design system และ layout
- `js/data/trip-data.js` - ข้อมูลทริปหลัก
- `js/core/*.js` - state, storage, utils
- `js/views/*.js` - render แยกตามหน้าจอ
- `sw.js` / `manifest.webmanifest` - PWA basics

## วิธีเปิดใช้งาน

เปิดผ่าน static server จะดีที่สุด เช่น:

```bash
cd "/Users/photonman/Desktop/Japan 2026/kansai-trip-app-v2"
npm run serve
```

แล้วเปิด `http://localhost:4173`

หรือถ้าไม่ใช้ `npm`:

```bash
cd "/Users/photonman/Desktop/Japan 2026/kansai-trip-app-v2"
python3 -m http.server 4173
```

## คำสั่งที่ควรมี

```bash
npm run serve
npm run check
```

- `npm run serve` เปิด static server ที่พอร์ต `4173`
- `npm run check` เช็กว่าโมดูลทั้งหมด import ได้และ `main.js` โหลดได้ใน stubbed environment

## ขั้นต่อไปที่แนะนำ

- เปิด browser แล้วคลิก flow หลักจริงอีก 1 รอบ
- ถ้าจะพัฒนาต่อจริงจัง ให้ `git init` ในโฟลเดอร์นี้เพื่อแยก version history ออกจาก `v1`
- ถ้าจะ sync ข้ามอุปกรณ์ ค่อยต่อ Firebase หรือ backend ในรอบถัดไป

## หมายเหตุ

- โปรเจกต์นี้ไม่แตะ Firebase config ของเวอร์ชันเดิม
- เอกสารในหน้า `Docs` เก็บแบบ local-first ต่อ browser profile
- ถ้าต้องการ sync ข้ามอุปกรณ์ ค่อยต่อ Firebase หรือ backend ในรอบถัดไป
