import { BACKUP_REGIONS, DAYS, TRIP_INFO } from "./data/trip-data.js";
import { clearDocStore, dataUrlToBlob, deleteDocBlob, getDocBlob, putDocBlob, blobToDataUrl } from "./core/storage.js";
import { createDefaultState, loadState, saveState } from "./core/state.js";
import { downloadJson, mapsSearchUrl, openInNewTab, researchUrl, uid } from "./core/utils.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderItinerary } from "./views/itinerary.js";
import { renderBackup } from "./views/backup.js";
import { renderDocs } from "./views/docs.js";
import { renderChecklist } from "./views/checklist.js";
import { renderBudget } from "./views/budget.js";
import { renderSettings } from "./views/settings.js";

const app = document.getElementById("app");
const searchInput = document.getElementById("global-search");
const themeToggle = document.getElementById("theme-toggle");
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

  const preferredTarget =
    (config.fields.text && modalTextInput) ||
    (config.fields.url && modalUrlInput) ||
    (config.fields.name && modalNameInput);
  preferredTarget?.focus();
}

function render() {
  applyTheme();

  primaryNav.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });

  heroBadges.innerHTML = [
    `<span class="badge">${TRIP_INFO.base}</span>`,
    `<span class="badge">${TRIP_INFO.railPass}</span>`,
    `<span class="badge">${state.docs.length} docs local</span>`
  ].join("");

  const views = {
    dashboard: renderDashboard,
    itinerary: renderItinerary,
    backup: renderBackup,
    docs: renderDocs,
    checklist: renderChecklist,
    budget: renderBudget,
    settings: renderSettings
  };

  app.innerHTML = views[state.view]?.(state) || renderDashboard(state);
}

function getBackupSpotById(id) {
  return BACKUP_REGIONS.flatMap((region) => region.spots).find((spot) => spot.id === id);
}

function openCustomSpotModal(base = null) {
  openModal({
    type: "custom-spot",
    kicker: base ? "Shortlist backup spot" : "Add custom spot",
    title: base ? "เพิ่มจาก backup list" : "เพิ่มสถานที่เอง",
    targetId: base?.id || "",
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

function saveCustomSpotFromModal() {
  const name = modalNameInput.value.trim();
  if (!name) {
    showToast("กรอกชื่อสถานที่ก่อน");
    modalNameInput.focus();
    return;
  }

  state.customSpots.unshift({
    id: uid("spot"),
    name,
    region: modalRegionInput.value.trim() || "Custom spot",
    desc: modalTextInput.value.trim(),
    time: modalTimeInput.value.trim() || "flexible",
    cat: modalCategoryInput.value.trim() || "custom"
  });
  persist();
  closeModal();
  showToast("เพิ่ม custom spot แล้ว");
}

async function handleDocSave() {
  const nameInput = document.getElementById("doc-name");
  const tagsInput = document.getElementById("doc-tags");
  const fileInput = document.getElementById("doc-file");
  const file = fileInput?.files?.[0];
  const name = nameInput?.value?.trim() || file?.name?.trim();

  if (!file || !name) {
    showToast("กรอกชื่อเอกสารและเลือกไฟล์ก่อน");
    return;
  }

  const id = uid("doc");
  await putDocBlob(id, file);
  state.docs.unshift({
    id,
    name,
    type: file.type || "file",
    tags: tagsInput?.value?.split(",").map((tag) => tag.trim()).filter(Boolean) || [],
    size: file.size,
    createdAt: new Date().toISOString()
  });

  persist();
  nameInput.value = "";
  tagsInput.value = "";
  fileInput.value = "";
  showToast("บันทึกเอกสารแล้ว");
}

async function handleOpenDoc(docId) {
  const blob = await getDocBlob(docId);
  if (!blob) {
    showToast("หาไฟล์ไม่เจอใน IndexedDB");
    return;
  }
  const url = URL.createObjectURL(blob);
  openInNewTab(url);
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function handleDeleteDoc(docId) {
  state.docs = state.docs.filter((doc) => doc.id !== docId);
  await deleteDocBlob(docId);
  persist();
  showToast("ลบเอกสารแล้ว");
}

async function exportBackup() {
  const docs = await Promise.all(
    state.docs.map(async (doc) => {
      const blob = await getDocBlob(doc.id);
      return blob
        ? {
            ...doc,
            dataUrl: await blobToDataUrl(blob)
          }
        : doc;
    })
  );

  downloadJson("kansai-project-2-backup.json", {
    meta: {
      exportedAt: new Date().toISOString(),
      project: TRIP_INFO.title,
      format: "kansai-project-2"
    },
    state: {
      ...state,
      docs
    }
  });
  showToast("export backup เรียบร้อย");
}

async function importBackup(file) {
  if (!file) return;
  const text = await file.text();
  const parsed = JSON.parse(text);
  const imported = parsed?.state;
  if (!imported) throw new Error("invalid backup");

  await clearDocStore();
  const docs = [];
  for (const doc of imported.docs || []) {
    if (doc.dataUrl) {
      const blob = await dataUrlToBlob(doc.dataUrl);
      await putDocBlob(doc.id, blob);
    }
    const { dataUrl, ...rest } = doc;
    docs.push(rest);
  }

  state = {
    ...createDefaultState(),
    ...imported,
    docs
  };
  persist();
  showToast("import backup เสร็จแล้ว");
}

function handleActivityToggle(activityId) {
  const current = state.activities[activityId] || { checked: false, note: "", links: [] };
  state.activities[activityId] = { ...current, checked: !current.checked };
  persist();
}

function handleActivityNote(activityId) {
  const current = state.activities[activityId] || { checked: false, note: "", links: [] };
  openModal({
    type: "activity-note",
    kicker: "Activity note",
    title: "แก้โน้ตกิจกรรม",
    targetId: activityId,
    fields: { name: false, region: false, category: false, time: false, url: false, text: true },
    values: { text: current.note || "" }
  });
}

function handleActivityLink(activityId) {
  openModal({
    type: "activity-link",
    kicker: "Activity link",
    title: "เพิ่มลิงก์กิจกรรม",
    targetId: activityId,
    fields: { name: false, region: false, category: false, time: false, url: true, text: false },
    values: { url: "" }
  });
}

function removeActivityLink(activityId, index) {
  const current = state.activities[activityId] || { checked: false, note: "", links: [] };
  current.links.splice(index, 1);
  state.activities[activityId] = { ...current, links: [...current.links] };
  persist();
}

function handleChecklistToggle(id) {
  state.checklistState[id] = !state.checklistState[id];
  persist();
}

function handleChecklistAdd() {
  const input = document.getElementById("custom-checklist-text");
  const text = input?.value?.trim();
  if (!text) {
    showToast("กรอก checklist item ก่อน");
    return;
  }
  state.checklistCustom.push({ id: uid("check"), cat: "Custom", text });
  input.value = "";
  persist();
  showToast("เพิ่ม checklist item แล้ว");
}

function removeChecklistItem(id) {
  state.checklistCustom = state.checklistCustom.filter((item) => item.id !== id);
  delete state.checklistState[id];
  persist();
}

function handleBudgetInput(target) {
  const dayId = Number(target.dataset.dayId);
  const nextValue = Number(target.value || 0);
  if (target.dataset.budgetKind === "plan") {
    state.budgetPlan[dayId] = nextValue;
  } else {
    state.budgetActual[dayId] = nextValue;
  }
  saveState(state);
}

function handleModalSubmit(event) {
  event.preventDefault();
  const type = modalTypeInput.value;
  const targetId = modalTargetIdInput.value;

  if (type === "custom-spot") {
    saveCustomSpotFromModal();
    return;
  }

  if (type === "activity-note") {
    const current = state.activities[targetId] || { checked: false, note: "", links: [] };
    state.activities[targetId] = { ...current, note: modalTextInput.value.trim() };
    persist();
    closeModal();
    showToast("อัปเดต note แล้ว");
    return;
  }

  if (type === "activity-link") {
    const next = modalUrlInput.value.trim();
    if (!next) {
      showToast("วาง URL ก่อน");
      modalUrlInput.focus();
      return;
    }
    const current = state.activities[targetId] || { checked: false, note: "", links: [] };
    state.activities[targetId] = { ...current, links: [...(current.links || []), next] };
    persist();
    closeModal();
    showToast("เพิ่ม link แล้ว");
  }
}

function updateDocFileMeta(file) {
  const meta = document.getElementById("doc-file-meta");
  const nameInput = document.getElementById("doc-name");
  if (!meta) return;

  if (!file) {
    meta.textContent = "ยังไม่ได้เลือกไฟล์";
    return;
  }

  meta.textContent = `${file.name} · ${Math.round(file.size / 1024)} KB`;
  if (nameInput && !nameInput.value.trim()) {
    nameInput.value = file.name.replace(/\.[^.]+$/, "");
  }
}

function wireEvents() {
  searchInput.value = state.search || "";
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState(state);
    render();
  });

  themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    persist();
  });

  primaryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    setView(button.dataset.view);
  });

  modalForm.addEventListener("submit", handleModalSubmit);
  modalShell.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action='close-modal']");
    if (!target) return;
    closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalShell.classList.contains("open")) {
      closeModal();
    }
  });

  app.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const action = target.dataset.action;

    if (action === "switch-view") setView(target.dataset.view);
    if (action === "set-day") {
      state.dayId = Number(target.dataset.dayId);
      persist();
    }
    if (action === "set-filter") {
      state.filter = target.dataset.filter;
      persist();
    }
    if (action === "toggle-activity") handleActivityToggle(target.dataset.activityId);
    if (action === "edit-note") handleActivityNote(target.dataset.activityId);
    if (action === "add-link") handleActivityLink(target.dataset.activityId);
    if (action === "remove-link") removeActivityLink(target.dataset.activityId, Number(target.dataset.linkIndex));
    if (action === "close-modal") closeModal();
    if (action === "open-maps") openInNewTab(mapsSearchUrl(target.dataset.query));
    if (action === "open-research") openInNewTab(researchUrl(target.dataset.query));
    if (action === "save-backup-spot") {
      const spot = getBackupSpotById(target.dataset.spotId);
      if (spot) openCustomSpotModal({ ...spot, region: "Shortlisted backup" });
    }
    if (action === "add-custom-spot") openCustomSpotModal();
    if (action === "remove-custom-spot") {
      state.customSpots = state.customSpots.filter((spot) => spot.id !== target.dataset.spotId);
      persist();
    }
    if (action === "save-doc") await handleDocSave();
    if (action === "open-doc") await handleOpenDoc(target.dataset.docId);
    if (action === "delete-doc") await handleDeleteDoc(target.dataset.docId);
    if (action === "toggle-checklist") handleChecklistToggle(target.dataset.checklistId);
    if (action === "add-checklist-item") handleChecklistAdd();
    if (action === "delete-checklist-item") removeChecklistItem(target.dataset.checklistId);
    if (action === "copy-script") {
      await navigator.clipboard.writeText(target.dataset.script);
      showToast("คัดลอกประโยคแล้ว");
    }
    if (action === "trigger-import") {
      document.getElementById("import-json-input")?.click();
    }
    if (action === "export-json") await exportBackup();
    if (action === "set-theme") {
      state.theme = target.dataset.theme;
      persist();
    }
  });

  app.addEventListener("change", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches("[data-action='update-budget']")) {
      handleBudgetInput(target);
      render();
    }

    if (target.id === "import-json-input") {
      try {
        await importBackup(target.files?.[0]);
      } catch (error) {
        console.error(error);
        showToast("import ไม่สำเร็จ");
      } finally {
        target.value = "";
      }
    }

    if (target.id === "doc-file") {
      updateDocFileMeta(target.files?.[0] || null);
    }
  });

  app.addEventListener("dragover", (event) => {
    const zone = event.target.closest("#doc-dropzone");
    if (!zone) return;
    event.preventDefault();
    zone.classList.add("dragover");
  });

  app.addEventListener("dragleave", (event) => {
    const zone = event.target.closest("#doc-dropzone");
    if (!zone) return;
    zone.classList.remove("dragover");
  });

  app.addEventListener("drop", (event) => {
    const zone = event.target.closest("#doc-dropzone");
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove("dragover");
    const fileInput = document.getElementById("doc-file");
    const file = event.dataTransfer?.files?.[0];
    if (!fileInput || !file) return;

    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
    updateDocFileMeta(file);
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("SW registration failed", error);
    });
  }
}

applyTheme();
render();
wireEvents();
registerServiceWorker();
