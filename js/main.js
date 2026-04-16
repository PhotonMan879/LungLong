import { cloneDefaultTripTemplate, TRIP_TEMPLATES } from "./data/trip-data.js";
import { clearDocStore, dataUrlToBlob, deleteDocBlob, getDocBlob, putDocBlob, blobToDataUrl } from "./core/storage.js";
import { createDefaultState, createTripState, loadState, saveState } from "./core/state.js";
import { supabase, getSession, signInWithEmail, signOut, loadTripsFromCloud, saveTripToCloud, uploadDocToCloud, downloadDocFromCloud, deleteDocFromCloud } from "./core/supabase.js";
import { renderAuthOverlay } from "./views/auth.js";
import { downloadJson, mapsSearchUrl, openInNewTab, researchUrl, uid } from "./core/utils.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderAssist } from "./views/assist.js";
import { renderPrep } from "./views/prep.js";
import { renderItinerary } from "./views/itinerary.js";
import { renderBackup } from "./views/backup.js";
import { renderDocs } from "./views/docs.js";
import { renderChecklist } from "./views/checklist.js";
import { renderBudget } from "./views/budget.js";
import { renderSettings } from "./views/settings.js";
import { renderTemplatePicker } from "./views/template-picker.js";
import { renderTransport } from "./views/transport.js";
import { renderPlaces } from "./views/places.js";
import { initMap, updateMapMarkers, panMapTo } from "./core/map.js";

const app = document.getElementById("app");
const searchInput = document.getElementById("global-search");
const themeToggle = document.getElementById("theme-toggle");
const tripSelect = document.getElementById("trip-select");
const tripNewBtn = document.getElementById("trip-new-btn");
const primaryNav = document.getElementById("primary-nav");
const heroBadges = document.getElementById("hero-badges");
const toast = document.getElementById("toast");
const modalShell = document.getElementById("app-modal");
const modalForm = document.getElementById("modal-form");
const modalTitle = document.getElementById("modal-title");
const modalKicker = document.getElementById("modal-kicker");

const modalTypeInput = document.getElementById("modal-type");
const modalTargetIdInput = document.getElementById("modal-target-id");
const modalNameInput = document.getElementById("modal-name");
const modalRegionInput = document.getElementById("modal-region");
const modalCategoryInput = document.getElementById("modal-category");
const modalTimeInput = document.getElementById("modal-time");
const modalUrlInput = document.getElementById("modal-url");
const modalTextInput = document.getElementById("modal-text");

const modalNameWrap = document.getElementById("modal-name-wrap");
const modalRegionWrap = document.getElementById("modal-region-wrap");
const modalCategoryWrap = document.getElementById("modal-category-wrap");
const modalTimeWrap = document.getElementById("modal-time-wrap");
const modalUrlWrap = document.getElementById("modal-url-wrap");
const modalTextWrap = document.getElementById("modal-text-wrap");
const modalLocationWrap = document.getElementById("modal-location-wrap");
const modalLocationSearch = document.getElementById("modal-location-search");
const modalLocationResults = document.getElementById("modal-location-results");
const modalLatInput = document.getElementById("modal-lat");
const modalLngInput = document.getElementById("modal-lng");
const modalLocationHint = document.getElementById("modal-location-hint");
const authOverlay = document.getElementById("auth-overlay");
const authBtn = document.getElementById("auth-btn");

let state = loadState();
state.rainMode = false; // UI-only, not persisted
state.placesFilter = "all"; // UI-only, not persisted
state.movingPlaceId = null; // UI-only, not persisted
state._collapsedDays = {}; // UI-only: { [dayId]: true|false } overrides for itinerary collapse
let toastTimer = null;
let dragSrcSpotId = null;
let currentUserId = null;
let syncTimer = null;
let miniMapInstances = new Map();

function destroyMiniMaps() {
  miniMapInstances.forEach((m) => { try { m.remove(); } catch {} });
  miniMapInstances.clear();
}

function initMiniMaps() {
  if (typeof L === "undefined") return;
  document.querySelectorAll(".place-mini-map[data-lat]").forEach((el) => {
    if (miniMapInstances.has(el.id)) return;
    const lat = parseFloat(el.dataset.lat);
    const lng = parseFloat(el.dataset.lng);
    if (isNaN(lat) || isNaN(lng)) return;
    const map = L.map(el, {
      zoomControl: false, dragging: false, touchZoom: false,
      doubleClickZoom: false, scrollWheelZoom: false, attributionControl: false
    }).setView([lat, lng], 15);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles © Esri", maxZoom: 19
    }).addTo(map);
    L.marker([lat, lng]).addTo(map);
    miniMapInstances.set(el.id, map);
  });
}

function getActiveTrip() {
  return state.trips[state.activeTripId];
}

function persist() {
  saveState(state);
  applyTheme();
  render();
  if (currentUserId) {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      saveTripToCloud(currentUserId, getActiveTrip()).catch(() => {});
    }, 2000);
  }
}

function showAuthOverlay(sent = false) {
  authOverlay.innerHTML = renderAuthOverlay(sent);
  authOverlay.classList.add("visible");
  authOverlay.setAttribute("aria-hidden", "false");
}

function hideAuthOverlay() {
  authOverlay.classList.remove("visible");
  authOverlay.setAttribute("aria-hidden", "true");
}

function updateAuthBtn() {
  if (authBtn) authBtn.textContent = currentUserId ? "Sign out" : "Login";
}

async function loadCloudTrips() {
  try {
    const rows = await loadTripsFromCloud(currentUserId);
    if (!rows.length) {
      // First login — push local trips to cloud
      for (const trip of Object.values(state.trips)) {
        await saveTripToCloud(currentUserId, trip);
      }
      return;
    }
    // Cloud wins: merge into local state
    for (const row of rows) {
      state.trips[row.id] = createTripState({ ...row.data, id: row.id });
    }
    if (!state.trips[state.activeTripId]) {
      state.activeTripId = Object.keys(state.trips)[0];
    }
    saveState(state);
  } catch (e) {
    console.warn("[sync] loadCloudTrips:", e.message);
  }
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  themeToggle.textContent = state.theme === "dark" ? "Light" : "Dark";
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setView(view) {
  state.view = view;
  saveState(state);
  render();
}

function setFieldVisibility(wrap, visible) {
  wrap.classList.toggle("hidden", !visible);
}

function closeModal() {
  modalShell.classList.remove("open");
  modalShell.setAttribute("aria-hidden", "true");
  modalForm.reset();
  modalTypeInput.value = "";
  modalTargetIdInput.value = "";
}

function openModal(config) {
  modalTitle.textContent = config.title;
  modalKicker.textContent = config.kicker;
  modalTypeInput.value = config.type;
  modalTargetIdInput.value = config.targetId || "";

  setFieldVisibility(modalNameWrap, Boolean(config.fields.name));
  setFieldVisibility(modalRegionWrap, Boolean(config.fields.region));
  setFieldVisibility(modalCategoryWrap, Boolean(config.fields.category));
  setFieldVisibility(modalTimeWrap, Boolean(config.fields.time));
  setFieldVisibility(modalUrlWrap, Boolean(config.fields.url));
  setFieldVisibility(modalTextWrap, Boolean(config.fields.text));
  setFieldVisibility(modalLocationWrap, Boolean(config.fields.location));

  modalNameInput.value = config.values?.name || "";
  modalRegionInput.value = config.values?.region || "";
  modalCategoryInput.value = config.values?.category || "";
  modalTimeInput.value = config.values?.time || "";
  modalUrlInput.value = config.values?.url || "";
  modalTextInput.value = config.values?.text || "";
  modalLocationSearch.value = "";
  modalLatInput.value = "";
  modalLngInput.value = "";
  modalLocationHint.textContent = "";
  modalLocationResults.innerHTML = "";

  modalShell.classList.add("open");
  modalShell.setAttribute("aria-hidden", "false");
}

function render() {
  const trip = getActiveTrip();
  applyTheme();

  if (primaryNav) {
    primaryNav.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === state.view);
    });

    // Update hamburger label with current view
    const hamburgerBtn = document.getElementById("hamburger-btn");
    if (hamburgerBtn) {
      const activeTab = primaryNav.querySelector("[data-view].active");
      hamburgerBtn.setAttribute("data-label", activeTab ? activeTab.textContent : "Menu");
    }
  }

  tripSelect.innerHTML = Object.values(state.trips)
    .map((item) => `<option value="${item.id}" ${item.id === state.activeTripId ? "selected" : ""}>${item.name}</option>`)
    .join("");

  heroBadges.innerHTML = [
    `<span class="badge">${trip.info.base}</span>`,
    `<span class="badge">${trip.info.railPass}</span>`,
    `<span class="badge">${trip.docs.length} docs local</span>`
  ].join("");

  // Map logic
  const mapPane = document.getElementById("map-pane");
  if (mapPane) {
    if (state.view === "places") {
      mapPane.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        initMap();
        updateMapMarkers(trip, state.view, null);
      }, 50);
    } else {
      mapPane.setAttribute("aria-hidden", "true");
    }
  }

  const views = { dashboard: renderDashboard, assist: renderAssist, prep: renderPrep, itinerary: renderItinerary, transport: renderTransport, places: renderPlaces, backup: renderBackup, docs: renderDocs, checklist: renderChecklist, budget: renderBudget, settings: renderSettings };
  destroyMiniMaps();
  app.innerHTML = views[state.view]?.(state, trip) || renderDashboard(state, trip);
  if (state.view === "places") setTimeout(() => initMiniMaps(), 80);
}

function getBackupSpotById(id) {
  return getActiveTrip().backupRegions.flatMap((region) => region.spots).find((spot) => spot.id === id);
}

function openCustomSpotModal(base = null) {
  openModal({
    type: "custom-spot",
    kicker: base ? "Shortlist backup spot" : "Add custom spot",
    title: base ? "เพิ่มจาก backup list" : "เพิ่มสถานที่เอง",
    fields: { name: true, region: true, category: true, time: true, url: false, text: true },
    values: {
      name: base?.name || "",
      region: base?.region || "Custom spot",
      category: base?.cat || "custom",
      time: base?.time || "flexible",
      text: base?.desc || ""
    }
  });
}

function openTemplatePicker() {
  // Step 1: show template card grid inside the modal shell
  modalTitle.textContent = "สร้างทริปใหม่";
  modalKicker.textContent = "เลือก template";
  modalTypeInput.value = "template-picker";
  modalTargetIdInput.value = "";

  // Hide all standard fields and swap form body for the picker
  [modalNameWrap, modalRegionWrap, modalCategoryWrap, modalTimeWrap, modalUrlWrap, modalTextWrap].forEach((el) => el.classList.add("hidden"));

  // Inject template grid into the form area
  let pickerEl = document.getElementById("template-picker-body");
  if (!pickerEl) {
    pickerEl = document.createElement("div");
    pickerEl.id = "template-picker-body";
    modalForm.insertBefore(pickerEl, modalForm.querySelector(".modal-actions"));
  }
  pickerEl.innerHTML = renderTemplatePicker();
  pickerEl.style.display = "block";

  // Change submit button to be hidden (user clicks a card instead)
  const submitBtn = modalForm.querySelector("[type='submit']");
  if (submitBtn) submitBtn.style.display = "none";

  modalShell.classList.add("open");
  modalShell.setAttribute("aria-hidden", "false");
}

function openTripFormModal(templateId) {
  // Step 2: after picking a template, show the name form
  const tpl = TRIP_TEMPLATES.find((t) => t.id === templateId) || TRIP_TEMPLATES[0];

  // Hide picker
  const pickerEl = document.getElementById("template-picker-body");
  if (pickerEl) pickerEl.style.display = "none";

  // Restore submit button
  const submitBtn = modalForm.querySelector("[type='submit']");
  if (submitBtn) submitBtn.style.display = "";

  modalTitle.textContent = `${tpl.emoji} ${tpl.label}`;
  modalKicker.textContent = "กรอกชื่อทริปใหม่";
  modalTypeInput.value = "create-trip";
  modalTargetIdInput.value = templateId;

  setFieldVisibility(modalNameWrap, true);
  setFieldVisibility(modalRegionWrap, false);
  setFieldVisibility(modalCategoryWrap, false);
  setFieldVisibility(modalTimeWrap, false);
  setFieldVisibility(modalUrlWrap, false);
  setFieldVisibility(modalTextWrap, true);

  modalNameInput.value = tpl.data.info.title || tpl.label;
  modalTextInput.value = `${tpl.data.info.window || ""}\n${tpl.data.info.base || ""}`;
}

function openTripModal(mode) {
  const trip = getActiveTrip();
  openModal({
    type: mode,
    kicker: "Rename trip",
    title: "เปลี่ยนชื่อทริป",
    targetId: trip.id,
    fields: { name: true, region: false, category: false, time: false, url: false, text: true },
    values: {
      name: trip.name,
      text: `${trip.info.window}\n${trip.info.base}`
    }
  });
}

function saveCustomSpotFromModal() {
  const trip = getActiveTrip();
  const name = modalNameInput.value.trim();
  if (!name) return showToast("กรอกชื่อสถานที่ก่อน");
  trip.customSpots.unshift({
    id: uid("spot"),
    name,
    region: modalRegionInput.value.trim() || "Custom spot",
    desc: modalTextInput.value.trim(),
    time: modalTimeInput.value.trim() || "flexible",
    cat: modalCategoryInput.value.trim() || "custom"
  });
  persist();
  closeModal();
}

function saveTripFromModal() {
  const type = modalTypeInput.value;
  const name = modalNameInput.value.trim();
  if (!name) return showToast("กรอกชื่อทริปก่อน");
  if (type === "create-trip") {
    // modalTargetIdInput holds the chosen templateId in step-2
    const templateId = modalTargetIdInput.value || null;
    const trip = createTripState({ id: uid("trip"), name, info: { title: name } }, templateId);
    const [windowLine, baseLine] = modalTextInput.value.split("\n");
    if (windowLine?.trim()) trip.info.window = windowLine.trim();
    if (baseLine?.trim()) trip.info.base = baseLine.trim();
    state.trips[trip.id] = trip;
    state.activeTripId = trip.id;
  } else {
    const trip = getActiveTrip();
    trip.name = name;
    trip.info.title = name;
    const [windowLine, baseLine] = modalTextInput.value.split("\n");
    if (windowLine?.trim()) trip.info.window = windowLine.trim();
    if (baseLine?.trim()) trip.info.base = baseLine.trim();
  }
  persist();
  closeModal();
}

async function handleDocSave() {
  const trip = getActiveTrip();
  const nameInput = document.getElementById("doc-name");
  const tagsInput = document.getElementById("doc-tags");
  const fileInput = document.getElementById("doc-file");
  const file = fileInput?.files?.[0];
  const name = nameInput?.value?.trim() || file?.name?.trim();
  if (!file || !name) return showToast("กรอกชื่อเอกสารและเลือกไฟล์ก่อน");
  const id = uid("doc");
  await putDocBlob(id, file);
  trip.docs.unshift({ id, name, type: file.type || "file", tags: tagsInput?.value?.split(",").map((tag) => tag.trim()).filter(Boolean) || [], size: file.size, createdAt: new Date().toISOString() });
  persist();
  nameInput.value = "";
  tagsInput.value = "";
  fileInput.value = "";
}

async function handleOpenDoc(docId) {
  const blob = await getDocBlob(docId);
  if (!blob) return showToast("หาไฟล์ไม่เจอใน IndexedDB");
  const url = URL.createObjectURL(blob);
  openInNewTab(url);
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function handleDeleteDoc(docId) {
  const trip = getActiveTrip();
  trip.docs = trip.docs.filter((doc) => doc.id !== docId);
  await deleteDocBlob(docId);
  persist();
}

async function exportBackup() {
  const trips = {};
  for (const [tripId, trip] of Object.entries(state.trips)) {
    trips[tripId] = {
      ...trip,
      docs: await Promise.all(trip.docs.map(async (doc) => {
        const blob = await getDocBlob(doc.id);
        return blob ? { ...doc, dataUrl: await blobToDataUrl(blob) } : doc;
      }))
    };
  }
  downloadJson("kansai-project-2-backup.json", { ...state, trips, exportedAt: new Date().toISOString(), version: 3 });
}

async function importBackup(file) {
  const parsed = JSON.parse(await file.text());
  if (!parsed?.trips) throw new Error("invalid backup");
  await clearDocStore();
  const trips = {};
  for (const [tripId, trip] of Object.entries(parsed.trips)) {
    const docs = [];
    for (const doc of trip.docs || []) {
      if (doc.dataUrl) await putDocBlob(doc.id, await dataUrlToBlob(doc.dataUrl));
      const { dataUrl, ...rest } = doc;
      docs.push(rest);
    }
    trips[tripId] = createTripState({ ...trip, id: tripId, docs });
  }
  state = { ...createDefaultState(), ...parsed, trips, activeTripId: parsed.activeTripId && trips[parsed.activeTripId] ? parsed.activeTripId : Object.keys(trips)[0] };
  persist();
}

function handleActivityToggle(activityId) {
  const trip = getActiveTrip();
  const current = trip.activities[activityId] || { checked: false, note: "", links: [] };
  trip.activities[activityId] = { ...current, checked: !current.checked };
  persist();
}

function handleActivityNote(activityId) {
  const trip = getActiveTrip();
  openModal({ type: "activity-note", kicker: "Activity note", title: "แก้โน้ตกิจกรรม", targetId: activityId, fields: { name: false, region: false, category: false, time: false, url: false, text: true }, values: { text: trip.activities[activityId]?.note || "" } });
}

function handleActivityLink(activityId) {
  openModal({ type: "activity-link", kicker: "Activity link", title: "เพิ่มลิงก์กิจกรรม", targetId: activityId, fields: { name: false, region: false, category: false, time: false, url: true, text: false }, values: { url: "" } });
}

function removeActivityLink(activityId, index) {
  const trip = getActiveTrip();
  const current = trip.activities[activityId] || { checked: false, note: "", links: [] };
  current.links.splice(index, 1);
  trip.activities[activityId] = { ...current, links: [...current.links] };
  persist();
}

function handleChecklistToggle(id) {
  const trip = getActiveTrip();
  trip.checklistState[id] = !trip.checklistState[id];
  persist();
}

function handlePackingToggle(id) {
  const trip = getActiveTrip();
  trip.packingState[id] = !trip.packingState[id];
  persist();
}

function handleChecklistAdd() {
  const trip = getActiveTrip();
  const input = document.getElementById("custom-checklist-text");
  const text = input?.value?.trim();
  if (!text) return showToast("กรอก checklist item ก่อน");
  trip.checklistCustom.push({ id: uid("check"), cat: "Custom", text });
  input.value = "";
  persist();
}

function removeChecklistItem(id) {
  const trip = getActiveTrip();
  trip.checklistCustom = trip.checklistCustom.filter((item) => item.id !== id);
  delete trip.checklistState[id];
  persist();
}

function handlePackingAdd() {
  const trip = getActiveTrip();
  const input = document.getElementById("packing-custom-text");
  const phaseInput = document.getElementById("packing-custom-phase");
  const text = input?.value?.trim();
  if (!text) return showToast("กรอกของหรือ task ก่อน");
  trip.packingCustom.push({
    id: uid("pack"),
    phase: phaseInput?.value || "T-2",
    cat: "Custom",
    text
  });
  input.value = "";
  persist();
}

function removePackingItem(id) {
  const trip = getActiveTrip();
  trip.packingCustom = trip.packingCustom.filter((item) => item.id !== id);
  delete trip.packingState[id];
  persist();
}

function handleBudgetInput(target) {
  const trip = getActiveTrip();
  const dayId = Number(target.dataset.dayId);
  if (target.dataset.budgetKind === "plan") trip.budgetPlan[dayId] = Number(target.value || 0);
  else trip.budgetActual[dayId] = Number(target.value || 0);
  saveState(state);
}

function saveTripProfileFromSettings() {
  const trip = getActiveTrip();
  const title = document.getElementById("trip-title-input")?.value?.trim();
  if (!title) return showToast("กรอกชื่อทริปก่อน");

  trip.name = title;
  trip.info.title = title;
  trip.info.base = document.getElementById("trip-base-input")?.value?.trim() || "";
  trip.info.window = document.getElementById("trip-window-input")?.value?.trim() || "";
  trip.info.startDate = document.getElementById("trip-start-date-input")?.value?.trim() || trip.info.startDate;
  trip.info.flightOut = document.getElementById("trip-flight-out-input")?.value?.trim() || "";
  trip.info.flightBack = document.getElementById("trip-flight-back-input")?.value?.trim() || "";
  trip.info.railPass = document.getElementById("trip-pass-input")?.value?.trim() || "";
  trip.info.traveler = document.getElementById("trip-traveler-input")?.value?.trim() || "";
  persist();
  showToast("บันทึก trip profile แล้ว");
}

function handleModalSubmit(event) {
  event.preventDefault();
  const type = modalTypeInput.value;
  const targetId = modalTargetIdInput.value;
  if (type === "custom-spot") return saveCustomSpotFromModal();
  if (type === "create-trip" || type === "rename-trip") return saveTripFromModal();
  if (type === "activity-note") {
    const trip = getActiveTrip();
    const current = trip.activities[targetId] || { checked: false, note: "", links: [] };
    trip.activities[targetId] = { ...current, note: modalTextInput.value.trim() };
    persist();
    return closeModal();
  }
  if (type === "activity-link") {
    const next = modalUrlInput.value.trim();
    if (!next) return showToast("วาง URL ก่อน");
    const trip = getActiveTrip();
    const current = trip.activities[targetId] || { checked: false, note: "", links: [] };
    trip.activities[targetId] = { ...current, links: [...(current.links || []), next] };
    persist();
    closeModal();
  }
  if (type === "place-note") {
    const trip = getActiveTrip();
    const place = trip.placesList.find((p) => p.id === targetId);
    if (place) { place.note = modalTextInput.value.trim(); persist(); }
    closeModal();
  }
  if (type === "place-link") {
    const url = modalUrlInput.value.trim();
    if (!url) return showToast("วาง URL ก่อน");
    const trip = getActiveTrip();
    const place = trip.placesList.find((p) => p.id === targetId);
    if (place) { place.links = [...(place.links || []), url]; persist(); }
    closeModal();
  }
  if (type === "add-place") {
    const name = modalNameInput.value.trim();
    if (!name) return showToast("กรอกชื่อสถานที่ก่อน");
    const trip = getActiveTrip();
    const lat = modalLatInput.value ? parseFloat(modalLatInput.value) : null;
    const lng = modalLngInput.value ? parseFloat(modalLngInput.value) : null;
    trip.placesList.push({
      id: uid("pl"), sourceId: null, name, category: "custom",
      desc: "", note: modalTextInput.value.trim(), links: [],
      visitStatus: "pending", estimatedTime: "", addedFrom: "custom",
      ...(lat !== null && lng !== null && { lat, lng })
    });
    persist();
    closeModal();
  }
}

let geoTimer = null;

async function geocodeSearch(query) {
  if (!query.trim()) { modalLocationResults.innerHTML = ""; return; }
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=th,ja,en`;
    const res = await fetch(url, { headers: { "Accept-Language": "th,ja,en" } });
    const data = await res.json();
    if (!data.length) {
      modalLocationResults.innerHTML = `<div class="loc-no-result">ไม่พบสถานที่</div>`;
      return;
    }
    modalLocationResults.innerHTML = data.map((item) =>
      `<button type="button" class="loc-result-item" data-lat="${item.lat}" data-lng="${item.lon}" data-name="${item.display_name.split(",")[0]}">${item.display_name}</button>`
    ).join("");
  } catch {
    modalLocationResults.innerHTML = `<div class="loc-no-result">ค้นหาไม่สำเร็จ</div>`;
  }
}

function wireLocationSearch() {
  modalLocationSearch.addEventListener("input", () => {
    clearTimeout(geoTimer);
    geoTimer = setTimeout(() => geocodeSearch(modalLocationSearch.value), 500);
  });
  modalLocationResults.addEventListener("click", (e) => {
    const btn = e.target.closest(".loc-result-item");
    if (!btn) return;
    modalLatInput.value = btn.dataset.lat;
    modalLngInput.value = btn.dataset.lng;
    modalLocationHint.textContent = `📍 ${btn.dataset.name}`;
    modalLocationResults.innerHTML = "";
    modalLocationSearch.value = btn.dataset.name;
  });
}

function updateDocFileMeta(file) {
  const meta = document.getElementById("doc-file-meta");
  const nameInput = document.getElementById("doc-name");
  if (!meta) return;
  meta.textContent = file ? `${file.name} · ${Math.round(file.size / 1024)} KB` : "ยังไม่ได้เลือกไฟล์";
  if (file && nameInput && !nameInput.value.trim()) nameInput.value = file.name.replace(/\.[^.]+$/, "");
}

function wireEvents() {
  searchInput.value = state.search || "";
  searchInput.addEventListener("input", (event) => { state.search = event.target.value; saveState(state); render(); });
  themeToggle.addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; persist(); });
  tripSelect.addEventListener("change", (event) => { state.activeTripId = event.target.value; saveState(state); render(); });
  tripNewBtn.addEventListener("click", () => openTemplatePicker());
  primaryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (button) {
      setView(button.dataset.view);
      // Close hamburger menu on mobile
      const navMenu = document.getElementById("nav-menu");
      const hamburgerBtn = document.getElementById("hamburger-btn");
      if (navMenu && hamburgerBtn) {
        navMenu.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Hamburger toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });
    // Close on outside click
    document.addEventListener("click", (event) => {
      if (!primaryNav.contains(event.target)) {
        navMenu.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
  modalForm.addEventListener("submit", handleModalSubmit);
  wireLocationSearch();
  modalShell.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "close-modal") {
      const pickerEl = document.getElementById("template-picker-body");
      if (pickerEl) pickerEl.style.display = "none";
      const submitBtn = modalForm.querySelector("[type='submit']");
      if (submitBtn) submitBtn.style.display = "";
      closeModal();
    }
    if (action === "pick-template") openTripFormModal(target.dataset.templateId);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalShell.classList.contains("open")) {
      const pickerEl = document.getElementById("template-picker-body");
      if (pickerEl) pickerEl.style.display = "none";
      const submitBtn = modalForm.querySelector("[type='submit']");
      if (submitBtn) submitBtn.style.display = "";
      closeModal();
    }
  });

  app.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "switch-view") setView(target.dataset.view);
    if (action === "set-day") { getActiveTrip().dayId = Number(target.dataset.dayId); persist(); }
    if (action === "toggle-day-collapse") {
      const dayId = Number(target.dataset.dayId);
      const trip = getActiveTrip();
      // Determine current collapsed state (default: all days except active are collapsed)
      const currentCollapsed = (dayId in state._collapsedDays)
        ? state._collapsedDays[dayId]
        : dayId !== trip.dayId;
      state._collapsedDays[dayId] = !currentCollapsed;
      // When expanding a day, also set it as the active day
      if (currentCollapsed) { trip.dayId = dayId; persist(); }
      else { render(); }
    }
    if (action === "set-filter") { state.filter = target.dataset.filter; persist(); }
    if (action === "toggle-activity") handleActivityToggle(target.dataset.activityId);
    if (action === "edit-note") handleActivityNote(target.dataset.activityId);
    if (action === "add-link") handleActivityLink(target.dataset.activityId);
    if (action === "remove-link") removeActivityLink(target.dataset.activityId, Number(target.dataset.linkIndex));
    if (action === "remove-activity") {
      const trip = getActiveTrip();
      const activityId = target.dataset.activityId;
      const dayId = Number(target.dataset.dayId);
      const day = trip.days.find((d) => d.id === dayId);
      if (day) {
        const act = day.activities.find((a) => a.id === activityId);
        day.activities = day.activities.filter((a) => a.id !== activityId);
        delete trip.activities[activityId]; // clean up per-activity state
        if (act) showToast(`ลบ "${act.title}" ออกจาก Day ${dayId} แล้ว`);
        persist();
      }
    }
    if (action === "open-link") openInNewTab(target.dataset.url);
    if (action === "close-modal") closeModal();
    if (action === "open-maps") openInNewTab(mapsSearchUrl(target.dataset.query));
    if (action === "show-on-map") {
      // Only pan when clicking the card itself, not child buttons
      if (event.target.closest("button, a, input, textarea")) return;
      const lat = parseFloat(target.dataset.lat);
      const lng = parseFloat(target.dataset.lng);
      if (!isNaN(lat) && !isNaN(lng)) panMapTo(lat, lng, 15);
    }
    if (action === "open-research") openInNewTab(researchUrl(target.dataset.query));
    if (action === "save-backup-spot") { const spot = getBackupSpotById(target.dataset.spotId); if (spot) openCustomSpotModal({ ...spot, region: "Shortlisted backup" }); }
    if (action === "add-custom-spot") openCustomSpotModal();
    if (action === "remove-custom-spot") { const trip = getActiveTrip(); trip.customSpots = trip.customSpots.filter((spot) => spot.id !== target.dataset.spotId); persist(); }
    if (action === "save-doc") await handleDocSave();
    if (action === "open-doc") await handleOpenDoc(target.dataset.docId);
    if (action === "delete-doc") await handleDeleteDoc(target.dataset.docId);
    if (action === "toggle-checklist") handleChecklistToggle(target.dataset.checklistId);
    if (action === "add-checklist-item") handleChecklistAdd();
    if (action === "delete-checklist-item") removeChecklistItem(target.dataset.checklistId);
    if (action === "toggle-packing") handlePackingToggle(target.dataset.packingId);
    if (action === "add-packing-item") handlePackingAdd();
    if (action === "delete-packing-item") removePackingItem(target.dataset.packingId);
    if (action === "copy-script") await navigator.clipboard.writeText(target.dataset.script);
    if (action === "trigger-import") document.getElementById("import-json-input")?.click();
    if (action === "export-json") await exportBackup();
    if (action === "set-theme") { state.theme = target.dataset.theme; persist(); }
    if (action === "toggle-rain-mode") { state.rainMode = !state.rainMode; render(); }
    if (action === "set-places-filter") { state.placesFilter = target.dataset.cat; render(); }
    // Places actions
    if (action === "add-rec-place") {
      const trip = getActiveTrip();
      const rec = (trip.recommendedPlaces || []).find((r) => r.id === target.dataset.recId);
      if (rec && !trip.placesList.some((p) => p.sourceId === rec.id)) {
        trip.placesList.push({
          id: uid("pl"), sourceId: rec.id, name: rec.name, category: rec.category,
          desc: rec.desc || "", note: "", links: [], visitStatus: "pending",
          estimatedTime: rec.estimatedTime || "", addedFrom: "recommended",
          lat: rec.lat || null, lng: rec.lng || null
        });
        persist();
      }
    }
    if (action === "remove-place") {
      const trip = getActiveTrip();
      trip.placesList = trip.placesList.filter((p) => p.id !== target.dataset.placeId);
      persist();
    }
    if (action === "cycle-place-status") {
      const trip = getActiveTrip();
      const place = trip.placesList.find((p) => p.id === target.dataset.placeId);
      if (place) {
        const cycle = { pending: "visited", visited: "skipped", skipped: "pending" };
        place.visitStatus = cycle[place.visitStatus] || "pending";
        persist();
      }
    }
    if (action === "toggle-move-to-day") {
      state.movingPlaceId = state.movingPlaceId === target.dataset.placeId ? null : target.dataset.placeId;
      render();
    }
    if (action === "move-to-day") {
      const trip = getActiveTrip();
      const place = trip.placesList.find((p) => p.id === target.dataset.placeId);
      const dayId = Number(target.dataset.day);
      const day = trip.days.find((d) => d.id === dayId);
      if (day && place) {
        day.activities.push({
          id: uid("act"),
          time: place.estimatedTime || "flex",
          icon: "📍",
          title: place.name,
          desc: place.desc || place.note || "",
          tags: [place.category || "custom"]
        });
        showToast(`เพิ่ม ${place.name} ลง Day ${dayId} แล้ว`);
        state.movingPlaceId = null;
        persist();
      }
    }
    if (action === "inline-add-itinerary") {
      const trip = getActiveTrip();
      const rec = (trip.recommendedPlaces || []).find((r) => r.id === target.dataset.recId);
      const day = trip.days.find((d) => String(d.id) === String(target.dataset.dayId));
      if (rec && day) {
        day.activities.push({
          id: uid("act"),
          time: rec.estimatedTime || "flex",
          icon: "📍",
          title: rec.name,
          desc: rec.desc || "",
          tags: [rec.category || "custom"]
        });
        showToast(`เพิ่ม ${rec.name} ลง Day ${day.id} แล้ว`);
        persist();
      }
    }
    if (action === "edit-place-note") {
      const trip = getActiveTrip();
      const place = trip.placesList.find((p) => p.id === target.dataset.placeId);
      if (!place) return;
      openModal({
        type: "place-note", kicker: "Note", title: place.name,
        targetId: place.id,
        fields: { name: false, region: false, category: false, time: false, url: false, text: true },
        values: { text: place.note || "" }
      });
    }
    if (action === "add-place-link") {
      const trip = getActiveTrip();
      const place = trip.placesList.find((p) => p.id === target.dataset.placeId);
      if (!place) return;
      openModal({
        type: "place-link", kicker: "Link", title: place.name,
        targetId: place.id,
        fields: { name: false, region: false, category: false, time: false, url: true, text: false },
        values: { url: "" }
      });
    }
    if (action === "remove-place-link") {
      const trip = getActiveTrip();
      const place = trip.placesList.find((p) => p.id === target.dataset.placeId);
      const idx = Number(target.dataset.linkIdx);
      if (place) { place.links.splice(idx, 1); persist(); }
    }
    if (action === "open-add-place-modal") {
      openModal({
        type: "add-place", kicker: "เพิ่มสถานที่", title: "สถานที่ใหม่",
        targetId: "",
        fields: { name: true, region: false, category: false, time: false, url: false, text: true, location: true },
        values: { name: "", text: "" }
      });
    }
    if (action === "pick-template") openTripFormModal(target.dataset.templateId);
    if (action === "create-trip") openTemplatePicker();
    if (action === "rename-trip") openTripModal("rename-trip");
    if (action === "save-trip-profile") saveTripProfileFromSettings();
    if (action === "delete-trip") {
      if (Object.keys(state.trips).length === 1) return showToast("ต้องมีอย่างน้อย 1 ทริป");
      delete state.trips[state.activeTripId];
      state.activeTripId = Object.keys(state.trips)[0];
      persist();
    }
  });

  app.addEventListener("change", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches("[data-action='update-budget']")) { handleBudgetInput(target); render(); }
    if (target.id === "import-json-input") {
      try { await importBackup(target.files?.[0]); } catch (error) { console.error(error); showToast("import ไม่สำเร็จ"); } finally { target.value = ""; }
    }
    if (target.id === "doc-file") updateDocFileMeta(target.files?.[0] || null);
  });

  // Drag-to-reorder custom spots
  app.addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-action='drag-spot']");
    if (!card) return;
    dragSrcSpotId = card.dataset.spotId;
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
  });

  app.addEventListener("dragend", (event) => {
    const card = event.target.closest("[data-action='drag-spot']");
    if (card) card.classList.remove("dragging");
    document.querySelectorAll(".backup-card.drag-over").forEach((el) => el.classList.remove("drag-over"));
  });

  app.addEventListener("dragover", (event) => {
    const card = event.target.closest("[data-action='drag-spot']");
    if (!card || card.dataset.spotId === dragSrcSpotId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    document.querySelectorAll(".backup-card.drag-over").forEach((el) => el.classList.remove("drag-over"));
    card.classList.add("drag-over");
  });

  app.addEventListener("drop", (event) => {
    const card = event.target.closest("[data-action='drag-spot']");
    if (!card || !dragSrcSpotId || card.dataset.spotId === dragSrcSpotId) return;
    event.preventDefault();
    const trip = getActiveTrip();
    const spots = trip.customSpots;
    const fromIdx = spots.findIndex((s) => s.id === dragSrcSpotId);
    const toIdx = spots.findIndex((s) => s.id === card.dataset.spotId);
    if (fromIdx === -1 || toIdx === -1) return;
    const [moved] = spots.splice(fromIdx, 1);
    spots.splice(toIdx, 0, moved);
    dragSrcSpotId = null;
    persist();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  // updateViaCache: 'none' → browser ไม่ใช้ HTTP cache ในการตรวจ sw.js
  // ทำให้ browser เห็น sw.js ใหม่ทันทีหลัง deploy โดยไม่ต้องรอ max-age หมด
  navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then((reg) => {
    // ตรวจ update ทันทีเมื่อโหลดหน้า (ไม่รอ browser trigger เอง)
    reg.update();

    // เมื่อ SW ใหม่ active (ผ่าน skipWaiting + clients.claim) → reload อัตโนมัติ
    // ทำให้ทุกอุปกรณ์เห็น version ใหม่ใน page load ถัดไปโดยไม่ต้อง hard refresh
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }).catch(() => {});
}

function wireAuthEvents() {
  authOverlay.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email")?.value?.trim();
    if (!email) return;
    const btn = e.target.querySelector("[type='submit']");
    if (btn) { btn.disabled = true; btn.textContent = "กำลังส่ง..."; }
    const error = await signInWithEmail(email);
    if (error) {
      showToast("ส่งไม่สำเร็จ: " + error.message);
      if (btn) { btn.disabled = false; btn.textContent = "ส่ง Magic Link"; }
    } else {
      showAuthOverlay(true);
    }
  });

  authOverlay.addEventListener("click", (e) => {
    if (e.target.id === "auth-skip") {
      localStorage.setItem("ll-auth-skipped", "1");
      hideAuthOverlay();
    }
  });

  if (authBtn) {
    authBtn.addEventListener("click", async () => {
      if (currentUserId) {
        await signOut();
        currentUserId = null;
        updateAuthBtn();
        showToast("ออกจากระบบแล้ว");
      } else {
        showAuthOverlay();
      }
    });
  }
}

async function boot() {
  applyTheme();
  render();
  wireEvents();
  wireAuthEvents();
  registerServiceWorker();

  try {
    const session = await getSession();
    if (session) {
      currentUserId = session.user.id;
      await loadCloudTrips();
      render();
    }
    updateAuthBtn();

    if (!session && !localStorage.getItem("ll-auth-skipped")) {
      showAuthOverlay();
    }

    supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (event === "SIGNED_IN" && newSession) {
        currentUserId = newSession.user.id;
        localStorage.removeItem("ll-auth-skipped");
        await loadCloudTrips();
        hideAuthOverlay();
        updateAuthBtn();
        render();
        showToast("เข้าสู่ระบบสำเร็จ ✓");
      }
      if (event === "SIGNED_OUT") {
        currentUserId = null;
        updateAuthBtn();
      }
    });
  } catch (err) {
    console.error("[boot] Supabase error:", err);
    updateAuthBtn();
    // แสดง overlay ถ้า Supabase โหลดไม่สำเร็จและยังไม่ได้ skip
    if (!localStorage.getItem("ll-auth-skipped")) {
      showAuthOverlay();
    }
  }
}

boot();
