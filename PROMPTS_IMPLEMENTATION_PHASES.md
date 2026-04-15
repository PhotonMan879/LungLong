# Implementation Prompt Pack

ชุดนี้ไว้ใช้เวลาคุณอยากสั่ง agent ให้ทำงานแบบเป็นเฟส ไม่ทำทุกอย่างทีเดียว

## Phase-Based Prompt

```text
Implement this in phases rather than all at once.

Phase 1:
- recommended places shortlist
- add/remove controls
- saved places list
- custom place creation

Phase 2:
- move saved places into itinerary days
- add place metadata
- visited state
- estimated time

Phase 3:
- route/travel-time context
- trip inbox / structured docs
- compact field mode

After each phase:
- keep the app working
- preserve existing features
- update docs/status/handoff files
- keep the code modular and consistent with the current architecture
```

## Code Quality Prompt

```text
When implementing these features, do not treat this as a one-off prototype patch.

Expectations:
- extend the current modular architecture cleanly
- keep state shape coherent
- avoid duplicating logic
- prefer reusable place card / metadata patterns
- keep event handling organized
- update documentation files for handoff
- maintain mobile usability
- preserve existing working features

If needed, introduce shared helpers or reusable UI render helpers for place-related flows.
```

## Cursor / Coding Agent Short Prompt

```text
In kansai-trip-app-v2, build a Wanderlog-inspired place planning flow.

Start with:
- recommended places shortlist
- add/remove place controls
- saved places per active trip
- custom place creation

Then support:
- move place into itinerary day
- place notes, links, estimated time, visited state
- mobile-friendly cards

Requirements:
- use the existing modular architecture
- keep everything scoped to the active trip
- persist locally
- preserve current working features
- update README/STATUS/HANDOFF if project scope changes
```

## Design-First Prompt

```text
Before writing code, propose a Wanderlog-inspired UX for a mobile-first Japan travel planner.

Focus on:
- shortlist vs scheduled itinerary
- recommended places browsing
- add/remove interactions
- low-friction mobile card actions
- first-time traveler clarity

Do not clone Wanderlog visually.
Instead, adapt its strongest planning UX ideas into this app’s current design language.

After the UX proposal, implement the approved structure in the current modular codebase.
```

## Suggested Prompt Order

ถ้าจะยิงทีละอัน ลำดับที่แนะนำคือ

1. `Prompt 1: Places Shortlist / Place Picker`
2. `Prompt 2: Move Shortlist Into Itinerary`
3. `Prompt 3: Place Detail Metadata`
4. `Prompt 10: Mobile Card Interaction Polish`
5. `Prompt 4: Time and Distance Between Stops`
6. `Prompt 5: Trip Inbox / Reservations Hub`
7. `Prompt 6: Compact Field Mode`
8. `Prompt 7: Weather / Rain Fallback`
9. `Prompt 8: Trip Templates`

## Notes

- ถ้า agent ที่ใช้เก่งโค้ดมาก ให้เริ่มจาก `Master Prompt`
- ถ้า agent มีแนวโน้มทำกว้างเกินไป ให้ใช้ `Phase-Based Prompt`
- ถ้าอยากควบคุมคุณภาพ architecture ให้แนบ `Code Quality Prompt` ไปด้วยเสมอ
