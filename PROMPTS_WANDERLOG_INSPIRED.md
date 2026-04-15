# Wanderlog-Inspired Prompt Pack

ชุด prompt นี้ไว้ใช้สั่ง IDE, coding agent, หรือ model อื่นให้พัฒนาฟีเจอร์แนว Wanderlog-inspired สำหรับ `kansai-trip-app-v2`

เป้าหมายของชุดนี้คือ

- เอาแรงบันดาลใจจาก Wanderlog
- แต่ไม่ clone ตรงๆ
- ปรับให้เข้ากับแอปแนว `Japan-first`, `mobile-first`, `local-first`
- ช่วยให้วางแผนและใช้ระหว่างเดินทางจริงได้

## Master Prompt

```text
Build a Wanderlog-inspired trip planning experience for my web app, but tailored for a mobile-first Japan travel companion.

Core product direction:
- The app should feel like an all-in-one travel cockpit.
- It should help users plan, organize, and use their trip while traveling.
- It should work especially well for first-time Japan travelers and users who are not comfortable with English.
- It should remain local-first and mobile-friendly.

Main UX principles:
- Separate “places I want to go” from “places scheduled into a specific day”.
- Make it easy to add/remove places with low friction.
- Make itinerary, notes, links, time, and quick travel context feel connected.
- Prioritize clarity and fast scanning on mobile.
- Support gradual planning: users should not need to know everything up front.

Please design and implement the following feature areas:
1. Recommended places shortlist with add/remove controls
2. Saved places list per active trip
3. Move places from shortlist into itinerary day plans
4. Place metadata: notes, links, tags/category, estimated time, visited state
5. Basic travel-time / route context between stops
6. Trip inbox for reservations and travel documents
7. Compact field mode for use during real travel
8. Make the whole experience consistent with the current modular architecture

Technical expectations:
- Use the existing multi-trip architecture
- Scope all new data to the active trip
- Persist locally
- Keep the UI aligned with the current design system
- Update docs/status/handoff files if needed

Please implement in a modular, maintainable way rather than adding one-off hacks.
```

## Prompt 1: Places Shortlist / Place Picker

```text
Add a "Recommended Places Shortlist" feature to the trip planner.

I want a "Places to visit" module where users can:
- browse recommended places
- tap "+" to save a place into their trip shortlist
- tap "-" to remove it from their shortlist
- manually add custom places
- keep saved places separate from recommendation cards

Requirements:
- Scope everything to the active trip
- Persist state locally
- Reflect selected state visually
- Separate three states:
  1. recommended places
  2. saved shortlisted places
  3. custom user-added places
- Each place should support:
  - title
  - description
  - category/tag
  - note
  - links
  - optional estimated time
  - optional visited status

UX expectations:
- Mobile-first
- Low-friction plus/minus controls
- Easy scanning
- Clean distinction between “recommended” and “saved”

Please update state, views, styles, and documentation if necessary.
```

## Prompt 2: Move Shortlist Into Itinerary

```text
Implement a flow that lets users move places from a saved shortlist into a specific itinerary day.

Goal:
Users should first collect places they might want to visit, then later assign them into day plans.

Requirements:
- Add an action like "Add to day" or "Move to itinerary"
- Let the user choose which trip day to assign the place to
- Preserve metadata such as notes, links, and tags
- Allow removing a place from the itinerary without losing it completely from the shortlist if desired
- Support both:
  - shortlist only
  - itinerary scheduled
- Keep it scoped to the active trip

UX expectations:
- This should feel like a planning workflow, not a rigid task manager
- It should be obvious whether a place is only shortlisted or already scheduled
- Minimize clicks on mobile

Please implement state changes, UI actions, and supporting styling.
```

## Prompt 3: Place Detail Metadata

```text
Upgrade place cards so each saved place can store rich metadata.

For each place, support:
- notes
- links
- category/tags
- estimated time needed
- visited status
- optional cost estimate

Requirements:
- Work for both shortlist places and itinerary places
- Reuse the app’s existing modal/edit patterns where appropriate
- Persist all metadata locally
- Keep the UI compact on mobile, but expandable when needed

UX expectations:
- The card should feel useful even when lightly filled
- Notes and links should not overwhelm the layout
- The card should support both planning mode and during-trip mode

Please implement the data model updates, rendering, edit flows, and styles.
```

## Prompt 4: Time and Distance Between Stops

```text
Add a basic travel context layer between itinerary stops.

Goal:
Make the itinerary smarter by showing rough travel context between places.

Requirements:
- Show time/distance between consecutive stops
- Start with a lightweight implementation first
- If real routing is not available yet, structure the UI and state so it can be upgraded later
- Support travel mode labels such as:
  - walk
  - train
  - taxi
- Keep the display clean and mobile-friendly

UX expectations:
- The route context should make the day feel more realistic
- It should be easy to glance at and understand
- It should sit between stops naturally

Please build this in a way that supports future expansion into live ETA or map integration.
```

## Prompt 5: Trip Inbox / Reservations Hub

```text
Turn the existing docs area into a more structured "Trip Inbox" / reservations hub.

Goal:
Users should be able to quickly find important travel documents and reservations in one place.

Required sections:
- Flights
- Hotels
- Rail / tickets
- Insurance
- Important files
- General attachments

Requirements:
- Keep existing local-first document storage
- Add categories or document types
- Make documents easier to scan than a flat list
- Support manual upload first
- Structure the UI so future reservation import automation can be added later

UX expectations:
- This should feel like a travel command center
- The most important docs should be reachable in seconds
- The UI should prioritize urgency and usefulness over generic file browsing

Please update state, UI, and documentation as needed.
```

## Prompt 6: Compact Field Mode

```text
Add a compact "Field Mode" for use during real travel on mobile.

Goal:
When the user is outside and actively traveling, the app should switch into a fast, low-friction operational view.

Field mode should emphasize:
- next stop
- current day plan
- quick route access
- essential notes
- important docs
- quick phrases
- emergency actions

Requirements:
- Mobile-first
- Fast to scan
- Minimal clutter
- Large tap targets
- Keep existing data model compatible

UX expectations:
- This should feel like a real-time trip companion, not a planning dashboard
- Users should be able to act quickly with one hand
- Important info should surface automatically

Please design and implement a dedicated compact experience using the current architecture.
```

## Prompt 7: Weather / Rain Fallback

```text
Add a "rain fallback / weather-aware planning" feature inspired by smart trip-planning apps.

Goal:
If weather is bad, the app should help users adapt instead of manually re-planning everything.

Requirements:
- Add a concept of weather-friendly / indoor / rainy-day place tags
- Let backup places be filtered or suggested for rain
- Surface fallback ideas clearly
- Keep the first version lightweight and extensible

UX expectations:
- Users should feel the app is helping them recover from bad conditions
- Fallback suggestions should be practical, not generic
- The UI should connect backup places with real itinerary decisions

Please implement the data model, recommendation logic, and UI in a modular way.
```

## Prompt 8: Trip Templates

```text
Add multiple trip templates so the app is not hardcoded around one trip type.

Create a template system with examples like:
- Japan city trip
- food trip
- onsen trip
- first-timer Japan trip

Requirements:
- Templates should define default days, places, checklist items, scripts, and packing suggestions where relevant
- Users should be able to create a new trip from a chosen template
- Keep compatibility with the current multi-trip architecture

UX expectations:
- Choosing a template should feel like starting from a strong base, not getting locked in
- Templates should accelerate planning
- The system should remain easy to extend later

Please implement the template model, creation flow, and UI.
```

## Prompt 9: Wanderlog-Inspired Planning UX

```text
Redesign the trip planning flow to feel inspired by Wanderlog’s strongest UX patterns, while preserving this app’s unique Japan-first identity.

Focus on:
- separating shortlist vs scheduled itinerary
- reducing friction when adding/removing places
- making cards actionable without feeling cluttered
- presenting itinerary and place context in a connected way
- improving mobile scanning and tap flow

Do not clone Wanderlog visually.
Instead:
- preserve the current design language where possible
- improve information hierarchy
- improve action placement
- improve editability and clarity

Please propose and implement the UX improvements in the current modular app.
```

## Prompt 10: Mobile Card Interaction Polish

```text
Polish the mobile interaction model for trip/place cards.

Focus on:
- better spacing
- clearer action hierarchy
- larger tap targets
- more obvious add/remove states
- cleaner note/link presentation
- stronger visual separation between sections

Make the cards feel like modern travel planning cards, not generic task cards.

Please update structure and styles for mobile-first use.
```

## Prompt 11: Planning Flow for First-Time Japan Travelers

```text
Improve the product UX specifically for first-time Japan travelers.

The app should reduce anxiety and decision fatigue.

Focus on:
- clearer place recommendations
- simpler decision flows
- backup options when plans change
- travel phrases and docs where they matter
- stronger "what should I do next?" guidance

Please refine the planning and during-trip UX with this user type in mind.
```

