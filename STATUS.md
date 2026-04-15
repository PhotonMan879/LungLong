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
| Usefulness | Live route / ETA integration | Not yet | ตอนนี้เป็น shortcut ไป Maps |
| UX polish | Embed clip / player | Not yet | ยังไม่ฝัง video ใน app |
| UX polish | Reorder custom places / activities | Not yet | ยังไม่มี drag reorder |
| Product | Trip templates หลายแบบ | Not yet | ยังมี default template เดียว |
| Product | Share public read-only link | Not yet | ยังไม่มี backend/share flow |
| Product | Collaborative mode | Not yet | ยังไม่มี |
| Product | Auth / sync ข้ามอุปกรณ์ | Not yet | ยัง local-first |
| Quality | Lint / formatter | Not yet | ยังไม่ได้ตั้ง |
| Quality | Vite / build tooling | Not yet | ยังเป็น multi-file vanilla |

## ลำดับที่ควรทำต่อ

1. `Trip templates หลายแบบ`
2. `Weather / rain fallback`
3. `Live route / ETA helper`
4. `Reorder custom places / activities`
5. `Auth / sync`
