import { cloneDefaultTripTemplate } from "./data/trip-data.js";
import { clearDocStore, dataUrlToBlob, deleteDocBlob, getDocBlob, putDocBlob, blobToDataUrl } from "./core/storage.js";
import { createDefaultState, createTripState, loadState, saveState } from "./core/state.js";
import { downloadJson, mapsSearchUrl, openInNewTab, researchUrl, uid } from "./core/utils.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderAssist } from "./views/assist.js";
import { renderItinerary } from "./views/itinerary.js";
import { renderBackup } from "./views/backup.js";
import { renderDocs } from "./views/docs.js";
import { renderChecklist } from "./views/checklist.js";
import { renderBudget } from "./views/budget.js";
import { renderSettings } from "./views/settings.js";

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

let state = loadState();
let toastTimer = null;

function getActiveTrip() {
  return state.trips[state.activeTripId];
}

function persist() {
  saveState(state);
  applyTheme();
  render();
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

  modalNameInput.value = config.values?.name || "";
  modalRegionInput.value = config.values?.region || "";
  modalCategoryInput.value = config.values?.category || "";
  modalTimeInput.value = config.values?.time || "";
  modalUrlInput.value = config.values?.url || "";
  modalTextInput.value = config.values?.text || "";

  modalShell.classList.add("open");
  modalShell.setAttribute("aria-hidden", "false");
}

function render() {
  const trip = getActiveTrip();
  applyTheme();

  primaryNav.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });

  tripSelect.innerHTML = Object.values(state.trips)
    .map((item) => `<option value="${item.id}" ${item.id === state.activeTripId ? "selected" : ""}>${item.name}</option>`)
    .join("");

  heroBadges.innerHTML = [
    `<span class="badge">${trip.info.base}</span>`,
    `<span class="badge">${trip.info.railPass}</span>`,
    `<span class="badge">${trip.docs.length} docs local</span>`
  ].join("");

  const views = { dashboard: renderDashboard, assist: renderAssist, itinerary: renderItinerary, backup: renderBackup, docs: renderDocs, checklist: renderChecklist, budget: renderBudget, settings: renderSettings };
  app.innerHTML = views[state.view]?.(state, trip) || renderDashboard(state, trip);
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

function openTripModal(mode) {
  const trip = getActiveTrip();
  const template = cloneDefaultTripTemplate();
  openModal({
    type: mode,
    kicker: mode === "create-trip" ? "Create trip" : "Rename trip",
    title: mode === "create-trip" ? "สร้างทริปใหม่" : "เปลี่ยนชื่อทริป",
    targetId: trip.id,
    fields: { name: true, region: false, category: false, time: false, url: false, text: true },
    values: {
      name: mode === "create-trip" ? `${template.info.title} Copy` : trip.name,
      text: mode === "create-trip" ? `${template.info.window}\n${template.info.base}` : `${trip.info.window}\n${trip.info.base}`
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
    const trip = createTripState({ id: uid("trip"), name, info: { title: name } });
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
  tripNewBtn.addEventListener("click", () => openTripModal("create-trip"));
  primaryNav.addEventListener("click", (event) => { const button = event.target.closest("[data-view]"); if (button) setView(button.dataset.view); });
  modalForm.addEventListener("submit", handleModalSubmit);
  modalShell.addEventListener("click", (event) => { if (event.target.closest("[data-action='close-modal']")) closeModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modalShell.classList.contains("open")) closeModal(); });

  app.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "switch-view") setView(target.dataset.view);
    if (action === "set-day") { getActiveTrip().dayId = Number(target.dataset.dayId); persist(); }
    if (action === "set-filter") { state.filter = target.dataset.filter; persist(); }
    if (action === "toggle-activity") handleActivityToggle(target.dataset.activityId);
    if (action === "edit-note") handleActivityNote(target.dataset.activityId);
    if (action === "add-link") handleActivityLink(target.dataset.activityId);
    if (action === "remove-link") removeActivityLink(target.dataset.activityId, Number(target.dataset.linkIndex));
    if (action === "open-link") openInNewTab(target.dataset.url);
    if (action === "close-modal") closeModal();
    if (action === "open-maps") openInNewTab(mapsSearchUrl(target.dataset.query));
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
    if (action === "copy-script") await navigator.clipboard.writeText(target.dataset.script);
    if (action === "trigger-import") document.getElementById("import-json-input")?.click();
    if (action === "export-json") await exportBackup();
    if (action === "set-theme") { state.theme = target.dataset.theme; persist(); }
    if (action === "create-trip") openTripModal("create-trip");
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
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
}

applyTheme();
render();
wireEvents();
registerServiceWorker();
