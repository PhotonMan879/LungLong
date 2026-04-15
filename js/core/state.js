import { cloneDefaultTripTemplate } from "../data/trip-data.js";
import { flattenActivities } from "./utils.js";

const STORAGE_KEY = "kansai-project-2-state";

function createActivityState(days) {
  return flattenActivities(days).reduce((acc, activity) => {
    acc[activity.id] = { checked: false, note: "", links: [] };
    return acc;
  }, {});
}

export function createTripState(overrides = {}) {
  const template = cloneDefaultTripTemplate();
  const days = overrides.days || template.days;
  const defaults = createActivityState(days);
  return {
    id: overrides.id || `trip-${Date.now()}`,
    name: overrides.name || template.info.title,
    info: { ...template.info, ...(overrides.info || {}) },
    days,
    dayId: overrides.dayId || days[0]?.id || 1,
    backupRegions: overrides.backupRegions || template.backupRegions,
    defaultChecklist: overrides.defaultChecklist || template.defaultChecklist,
    japaneseScripts: overrides.japaneseScripts || template.japaneseScripts,
    activities: Object.keys(defaults).reduce((acc, id) => {
      acc[id] = { ...defaults[id], ...(overrides.activities?.[id] || {}) };
      return acc;
    }, {}),
    budgetPlan: { ...template.defaultBudgetPlan, ...(overrides.budgetPlan || {}) },
    budgetActual: overrides.budgetActual || {},
    docs: overrides.docs || [],
    customSpots: overrides.customSpots || [],
    checklistState: overrides.checklistState || {},
    checklistCustom: overrides.checklistCustom || [],
    createdAt: overrides.createdAt || new Date().toISOString()
  };
}

export function createDefaultState() {
  const trip = createTripState({ id: "kansai-2026", name: "Kansai 2026" });
  return {
    view: "dashboard",
    filter: "all",
    theme: "light",
    search: "",
    activeTripId: trip.id,
    trips: { [trip.id]: trip }
  };
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return createDefaultState();

    if (saved.trips) {
      const trips = Object.fromEntries(Object.entries(saved.trips).map(([id, trip]) => [id, createTripState({ ...trip, id })]));
      return {
        ...createDefaultState(),
        ...saved,
        trips,
        activeTripId: saved.activeTripId && trips[saved.activeTripId] ? saved.activeTripId : Object.keys(trips)[0]
      };
    }

    const migratedTrip = createTripState({
      id: "kansai-2026",
      name: "Kansai 2026",
      activities: saved.activities,
      budgetPlan: saved.budgetPlan,
      budgetActual: saved.budgetActual,
      docs: saved.docs,
      customSpots: saved.customSpots,
      checklistState: saved.checklistState,
      checklistCustom: saved.checklistCustom
    });
    return {
      view: saved.view || "dashboard",
      filter: saved.filter || "all",
      theme: saved.theme || "light",
      search: saved.search || "",
      activeTripId: migratedTrip.id,
      trips: { [migratedTrip.id]: migratedTrip }
    };
  } catch {
    return createDefaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
