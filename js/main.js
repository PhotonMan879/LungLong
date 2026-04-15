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

function addCustomSpotFromPrompt(base = null) {
  const name = window.prompt("ชื่อสถานที่", base?.name || "");
  if (!name) return;
  const region = window.prompt("region / category ของมัน", base?.region || "Custom spot");
  const desc = window.prompt("โน้ตสั้นๆ", base?.desc || "");
  const time = window.prompt("ใช้เวลาเท่าไร", base?.time || "flexible");
  const cat = window.prompt("หมวดหมู่", base?.cat || "custom");
  state.customSpots.unshift({
    id: uid("spot"),
    name,
    region: region || "Custom spot",
    desc: desc || "",
    time: time || "flexible",
    cat: cat || "custom"
  });
  persist();
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
  const next = window.prompt("Note สำหรับกิจกรรมนี้", current.note || "");
  if (next === null) return;
  state.activities[activityId] = { ...current, note: next.trim() };
  persist();
  showToast("อัปเดต note แล้ว");
}

function handleActivityLink(activityId) {
  const current = state.activities[activityId] || { checked: false, note: "", links: [] };
  const next = window.prompt("วาง URL ที่เกี่ยวข้องกับกิจกรรมนี้");
  if (!next) return;
  state.activities[activityId] = { ...current, links: [...(current.links || []), next.trim()] };
  persist();
  showToast("เพิ่ม link แล้ว");
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
    if (action === "open-maps") openInNewTab(mapsSearchUrl(target.dataset.query));
    if (action === "open-research") openInNewTab(researchUrl(target.dataset.query));
    if (action === "save-backup-spot") {
      const spot = getBackupSpotById(target.dataset.spotId);
      if (spot) addCustomSpotFromPrompt({ ...spot, region: "Shortlisted backup" });
    }
    if (action === "add-custom-spot") addCustomSpotFromPrompt();
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
