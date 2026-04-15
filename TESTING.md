# Testing

## Quick start

```bash
cd "/Users/photonman/Desktop/Japan 2026/kansai-trip-app-v2"
npm run serve
```

เปิด [http://localhost:4173](http://localhost:4173)

## Smoke check

```bash
npm run check
```

สิ่งที่ smoke check ครอบตอนนี้

- import modules ได้
- `main.js` boot ได้ใน stubbed environment
- ไม่มี syntax error ระดับโมดูล

## Manual test flows ที่ควรเช็ก

### 1. Dashboard

- เปิดแอปแล้ว dashboard โหลดได้
- badges ด้านบนขึ้นถูกต้อง
- สลับ tab ได้

### 2. Itinerary

- เปลี่ยนวันได้
- filter ได้
- `Mark done` ได้
- เพิ่ม note ได้
- เพิ่ม link ได้
- YouTube link มี preview
- ลบ link ได้

### 3. Backup spots

- เพิ่ม custom spot ได้
- shortlist backup spot ได้
- ลบ custom spot ได้

### 4. Docs

- เลือกไฟล์ได้
- drag/drop ได้
- บันทึกได้
- เปิดได้
- ลบได้
- refresh แล้ว metadata ยังอยู่

### 5. Checklist

- toggle item ได้
- เพิ่ม custom checklist item ได้
- ลบ custom checklist item ได้
- copy script ได้

### 6. Budget

- แก้ planned ได้
- แก้ actual ได้
- totals อัปเดตตาม

### 7. Settings

- แก้ trip profile ได้
- เปลี่ยน theme ได้
- export JSON ได้
- import กลับได้

### 8. Multi-trip

- สร้างทริปใหม่ได้
- สลับ active trip ได้
- ลบทริปได้ถ้ามีมากกว่า 1 ทริป
- ข้อมูลแต่ละทริปไม่ปนกัน

### 9. Assist

- copy phrase ได้
- emergency cards แสดงผลถูก

### 10. Prep

- deadline cards แสดงผลถูกตาม `startDate`
- toggle packing items ได้
- เพิ่ม custom packing item ได้
- ลบ custom packing item ได้

## Regression cases สำคัญ

- refresh หน้าแล้ว state ยังอยู่
- theme จำค่าได้
- export แล้ว import กลับมา docs ยังเปิดได้
- เปลี่ยนชื่อทริปแล้ว dropdown อัปเดต
- ลบทริปแล้ว active trip ใหม่ถูกต้อง

## Known gaps

- ยังไม่มี automated browser tests
- ยังไม่มี visual regression tests
- ยังไม่ได้ทดสอบ offline mode แบบเต็มจริง
- ยังไม่มี test สำหรับ race conditions หรือ concurrent writes
