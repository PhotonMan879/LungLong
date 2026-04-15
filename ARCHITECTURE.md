# Architecture

## ภาพรวม

`kansai-trip-app-v2` เป็นแอปท่องเที่ยวแบบ `local-first` ที่ใช้ `Vanilla JS + ES modules` ไม่มี build step และทำงานผ่าน static server ได้ทันที

แนวคิดหลักของโปรเจกต์นี้คือ

- แยกจาก `v1` โดยสมบูรณ์
- ทำให้โค้ดอ่านง่ายและโตต่อได้
- ใช้งานจริงบนมือถือระหว่างเดินทางได้
- เก็บข้อมูลได้แม้ไม่มี backend

## โครงสร้างไฟล์

- `index.html`
  - app shell
  - topbar
  - nav tabs
  - modal shell
  - โหลด `js/main.js`
- `styles.css`
  - theme tokens
  - layout
  - cards
  - modal
  - responsive behavior
- `js/data/trip-data.js`
  - default trip template
  - days
  - backup spots
  - checklist
  - japanese scripts
  - budget plan
  - packing defaults
- `js/core/state.js`
  - `createTripState`
  - `createDefaultState`
  - `loadState`
  - `saveState`
- `js/core/storage.js`
  - IndexedDB blob storage สำหรับเอกสาร
- `js/core/utils.js`
  - format helpers
  - search helpers
  - maps / research URLs
  - link preview detection
- `js/views/*.js`
  - แต่ละหน้า render แยก module
- `scripts/check.mjs`
  - smoke check สำหรับ import และ boot app

## View layer

แอปตอนนี้มี view หลักดังนี้

- `dashboard`
- `assist`
- `prep`
- `itinerary`
- `places` (Wishlist / Recommended Places Shortlist)
- `docs`
- `checklist`
- `budget`
- `settings`

`js/main.js` เป็นตัว orchestrator หลัก:

- โหลด state
- เลือก active trip
- render view ปัจจุบัน
- wire events ทั้งแอป
- persist state กลับ `localStorage`

## Data model

state ระดับแอปมีโครงประมาณนี้

```js
{
  view,
  filter,
  theme,
  search,
  activeTripId,
  trips: {
    [tripId]: {
      id,
      name,
      info,
      days,
      dayId,
      backupRegions,
      defaultChecklist,
      japaneseScripts,
      activities,
      budgetPlan,
      budgetActual,
      docs,
      placesList,
      recommendedPlaces,
      customSpots,
      checklistState,
      checklistCustom,
      defaultPacking,
      packingState,
      packingCustom,
      createdAt
    }
  }
}
```

## Persistence

มี 2 ชั้นหลัก

1. `localStorage`
- เก็บ app state
- เก็บ active trip
- เก็บ checklist / budget / links / notes / packing state

2. `IndexedDB`
- ใช้เก็บ blob ของเอกสาร
- ช่วยไม่ให้ JSON state โตเกินไป

Export / import จะดึง blob จาก IndexedDB มาแปลงเป็น `dataUrl` แล้วแนบไปกับ backup JSON

## Rendering flow

1. `loadState()` ตอนเริ่มแอป
2. `render()` เลือก active trip
3. โหลดและจัดการ `Map` Instance ฝั่งขวามือ (ถ้าจอ Desktop) ผ่าน `js/core/map.js`
4. เรียก `render<View>()`
5. เขียน HTML ลง `#app`
6. event delegation ใน `main.js` รับ action ต่างๆ
7. เมื่อข้อมูลเปลี่ยน จะ `persist()` แล้ว render ใหม่

## จุดที่ควรระวัง

- ยังไม่มี framework state management ดังนั้น logic กระจุกใน `js/main.js`
- ยังไม่มี lint / type checking
- ยังไม่มี backend sync หรือ conflict resolution
- search ยังเป็น text match พื้นฐาน
- service worker ยังเป็น PWA basics ไม่ใช่ offline strategy ขั้นสูง

## ถ้าจะขยายต่อ

ลำดับที่เหมาะที่สุดตอนนี้

1. เพิ่ม trip templates
2. เพิ่ม weather / rain fallback
3. เพิ่ม live route / ETA หรือ transport helper
4. เพิ่ม auth / sync
5. ค่อยพิจารณาย้ายไป Vite หาก scope โตขึ้นอีก
