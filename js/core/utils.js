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

export function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function mapsSearchUrl(query) {
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

export function researchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${query} japan travel tips`)}`;
}

export function flattenActivities(days = []) {
  return days.flatMap((day) =>
    day.activities.map((activity) => ({
      ...activity,
      dayId: day.id,
      dayDate: day.date,
      dayTheme: day.theme,
      city: day.city
    }))
  );
}

export function getTripDayStatus(trip) {
  const today = new Date();
  const start = new Date(trip.info.startDate);
  const diff = Math.floor((today.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / 86400000);
  if (diff >= 0 && diff < trip.days.length) {
    return trip.days[diff];
  }

  return trip.days.find((day) => day.activities.some((activity) => !trip.activities?.[activity.id]?.checked)) || trip.days[0];
}

export function completionForDay(day, trip) {
  const done = day.activities.filter((activity) => trip.activities?.[activity.id]?.checked).length;
  return { done, total: day.activities.length, pct: day.activities.length ? Math.round((done / day.activities.length) * 100) : 0 };
}

export function totalCompletion(trip) {
  const all = flattenActivities(trip.days);
  const done = all.filter((activity) => trip.activities?.[activity.id]?.checked).length;
  return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 };
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

function getYouTubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v") || null;
    }
    return null;
  } catch {
    return null;
  }
}

export function getLinkPreview(url) {
  const fallback = {
    type: "link",
    label: "Link",
    badgeClass: "link-badge-generic",
    icon: "🔗",
    thumbnail: "",
    displayUrl: url
  };

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");
    const youtubeId = getYouTubeId(url);

    if (youtubeId) {
      return {
        type: "youtube",
        label: "YouTube",
        badgeClass: "link-badge-youtube",
        icon: "▶",
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        displayUrl: host,
        videoId: youtubeId
      };
    }

    if (host.includes("instagram.com")) {
      return { ...fallback, type: "instagram", label: "Instagram", badgeClass: "link-badge-instagram", icon: "◎", displayUrl: host };
    }

    if (host.includes("tiktok.com")) {
      return { ...fallback, type: "tiktok", label: "TikTok", badgeClass: "link-badge-tiktok", icon: "♪", displayUrl: host };
    }

    if (host.includes("facebook.com") || host.includes("fb.watch")) {
      return { ...fallback, type: "facebook", label: "Facebook", badgeClass: "link-badge-facebook", icon: "f", displayUrl: host };
    }

    return { ...fallback, displayUrl: host };
  } catch {
    return fallback;
  }
}
