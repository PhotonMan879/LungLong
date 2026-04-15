import { DAYS, DEFAULT_BUDGET_PLAN } from "../data/trip-data.js";
import { flattenActivities } from "./utils.js";

const STORAGE_KEY = "kansai-project-2-state";

function createActivityState() {
  return flattenActivities().reduce((acc, activity) => {
    acc[activity.id] = { checked: false, note: "", links: [] };
    return acc;
  }, {});
}

export function createDefaultState() {
  return {
    view: "dashboard",
    dayId: 1,
    filter: "all",
    theme: "light",
    search: "",
    activities: createActivityState(),
    budgetPlan: { ...DEFAULT_BUDGET_PLAN },
    budgetActual: {},
    docs: [],
    customSpots: [],
    checklistState: {},
    checklistCustom: []
  };
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    const state = {
      ...createDefaultState(),
      ...(saved || {})
    };

    const defaults = createActivityState();
    state.activities = Object.keys(defaults).reduce((acc, id) => {
      acc[id] = {
        ...defaults[id],
        ...(saved?.activities?.[id] || {})
      };
      return acc;
    }, {});

    state.budgetPlan = { ...DEFAULT_BUDGET_PLAN, ...(saved?.budgetPlan || {}) };
    state.budgetActual = saved?.budgetActual || {};
    state.docs = saved?.docs || [];
    state.customSpots = saved?.customSpots || [];
    state.checklistState = saved?.checklistState || {};
    state.checklistCustom = saved?.checklistCustom || [];
    return state;
  } catch {
    return createDefaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  const next = createDefaultState();
  saveState(next);
  return next;
}

export function serializeState(state) {
  return {
    ...state,
    exportedAt: new Date().toISOString(),
    version: 2,
    dayCount: DAYS.length
  };
}
