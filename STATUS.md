# Status

## สถานะรวม

โปรเจกต์อยู่ช่วง `Stage 2 ปลายๆ`

- `Stage 1: Refactor foundation` เสร็จแล้ว
- `Stage 2: Functional demo build` ทำไปเยอะมากแล้ว
- `Stage 3: Productization` ยังเหลืออีกหลายก้อน

## งานที่ทำแล้ว

| หมวด | งาน | สถานะ | หมายเหตุ |
|---|---|---|---|
| Architecture | แยก single-file เป็นหลายไฟล์ | Done | `v2` เป็น multi-file แล้ว |
| Architecture | จัด state model ให้ชัด | Done | แยก `data/core/views` |
| Safety | Export / Import backup | Done | รองรับหลายทริป |
| Core UX | Today view / Dashboard | Done | มี countdown |
| Core UX | Maps / Research shortcuts | Done | ใช้งานได้ |
| Core UX | Budget planned vs actual | Done | ใช้งานได้ |
| Core UX | Docs local vault | Done | IndexedDB + drag/drop |
| Product | Multi-trip support | Done | สร้าง / สลับ / ลบทริปได้ |
| Product | Trip profile editor | Done | แก้ metadata ทริปจาก UI ได้ |
| UX polish | Modal แทน prompt | Done | note / link / custom spot |
| UX polish | Search พื้นฐาน | Done | ค้นจากข้อความได้ |
| UX polish | Drag/drop docs | Done | ระดับพื้นฐาน |
| UX polish | Link preview cards | Done | platform-aware |
| UX polish | YouTube thumbnail preview | Done | อัตโนมัติ |
| UX polish | Platform badge/icon | Done | อัตโนมัติ |
| UX polish | Timeline เช้า / บ่าย / เย็น | Done | ทำแล้ว |
| Traveler assist | Mobile Assist view | Done | ใช้งานบนมือถือได้ |
| Traveler assist | Quick Japanese phrase board | Done | คัดลอกประโยคได้ |
| Traveler assist | Emergency quick actions | Done | มีเบอร์ / phrase ฉุกเฉิน |
| Traveler assist | First-timer Japan cheat sheet | Done | มีแล้ว |
| Usefulness | Packing / pre-departure mode | Done | มีแท็บ `Prep` |
| Usefulness | Pre-flight deadline ladder | Done | `T-14 / T-7 / T-2 / Day Of` |
| Usefulness | Custom packing items | Done | ทำแล้ว |
| Quality | Smoke check | Done | `npm run check` ผ่าน |

## งานที่ยังไม่ได้ทำ

| หมวด | งาน | สถานะ | หมายเหตุ |
|---|---|---|---|
| Usefulness | Weather / rain fallback | Not yet | ยังไม่มี weather logic |
| Usefulness | Live route / ETA integration | Done | Transport tab — route cards ต่อวัน |
| UX polish | Embed clip / player | Done | วิดีโอ YouTube iframe 16:9 |
| UX polish | Reorder custom places / activities | Done | HTML5 drag-to-reorder custom spots |
| UX polish | Desktop Map / Split Pane UX | Done | ระบบแผงควบคุมแผนที่สำหรับจอใหญ่แบบ Wanderlog |
| Product | Trip templates หลายแบบ | Done | Kansai / Onsen / Food & Street / Blank |
| Product | Share public read-only link | Not yet | ยังไม่มี backend/share flow |
| Product | Collaborative mode | Not yet | ยังไม่มี |
| Product | Auth / sync ข้ามอุปกรณ์ | Not yet | ยัง local-first |
| Resilience | Weather / rain fallback | Done | Rain mode toggle ใน Backup Spots |
| Product | Places Shortlist | Done | wishlist + recommended + filter + note/link/status |
| Quality | Lint / formatter | Not yet | ยังไม่ได้ตั้ง |
| Quality | Vite / build tooling | Not yet | ยังเป็น multi-file vanilla |

## ลำดับที่ควรทำต่อ

1. `Share public read-only link`
2. `Auth / sync`
3. `Collaborative mode`
4. `Vite / build tooling`
