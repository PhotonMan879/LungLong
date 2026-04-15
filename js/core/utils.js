import { DAYS, TRIP_INFO } from "../data/trip-data.js";

export function currency(value) {
  return `¥${Number(value || 0).toLocaleString("en-US")}`;
}

export function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function mapsSearchUrl(query) {
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

export function researchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${query} japan travel tips`)}`;
}

export function flattenActivities() {
  return DAYS.flatMap((day) =>
    day.activities.map((activity) => ({
      ...activity,
      dayId: day.id,
      dayDate: day.date,
      dayTheme: day.theme,
      city: day.city
    }))
  );
}

export function getTripDayStatus(state) {
  const today = new Date();
  const start = new Date(TRIP_INFO.startDate);
  const diff = Math.floor((today.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / 86400000);
  if (diff >= 0 && diff < DAYS.length) {
    return DAYS[diff];
  }

  return DAYS.find((day) => day.activities.some((activity) => !state.activities?.[activity.id]?.checked)) || DAYS[0];
}

export function completionForDay(day, state) {
  const done = day.activities.filter((activity) => state.activities?.[activity.id]?.checked).length;
  return {
    done,
    total: day.activities.length,
    pct: day.activities.length ? Math.round((done / day.activities.length) * 100) : 0
  };
}

export function totalCompletion(state) {
  const all = flattenActivities();
  const done = all.filter((activity) => state.activities?.[activity.id]?.checked).length;
  return {
    done,
    total: all.length,
    pct: all.length ? Math.round((done / all.length) * 100) : 0
  };
}

export function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function textMatches(haystack, needle) {
  if (!needle) return true;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function openInNewTab(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function joinTags(tags = []) {
  return tags.map((tag) => `<span class="inline-tag">${escapeHtml(tag)}</span>`).join("");
}
