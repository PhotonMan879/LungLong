const CAT_COLORS = {
  food:     "#e67e22",
  temple:   "#8e44ad",
  nature:   "#27ae60",
  view:     "#2980b9",
  shopping: "#e91e8c",
  culture:  "#c0392b",
  onsen:    "#16a085",
  indoor:   "#7f8c8d",
  custom:   "#b8342f",
};

function catColor(category) {
  return CAT_COLORS[category] || CAT_COLORS.custom;
}

export function initMap() {
  if (window.mapInstance) return;
  const container = document.getElementById("map-container");
  if (!container || !window.L) return;

  window.mapInstance = L.map("map-container", { zoomControl: false }).setView([34.6937, 135.5023], 10);
  L.control.zoom({ position: 'bottomright' }).addTo(window.mapInstance);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OSM &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 20
  }).addTo(window.mapInstance);

  window.mapMarkers = [];
  window.mapPolylines = [];
}

export function updateMapMarkers(trip, viewName, activeDayId = null) {
  if (!window.mapInstance || !window.L) return;

  // Clear existing markers
  (window.mapMarkers || []).forEach((m) => window.mapInstance.removeLayer(m));
  (window.mapPolylines || []).forEach((p) => window.mapInstance.removeLayer(p));
  window.mapMarkers = [];
  window.mapPolylines = [];

  const points = [];

  function addPin(lat, lng, title, color, popupHtml, placeId = null) {
    const marker = L.circleMarker([lat, lng], {
      radius: 8,
      color: "#fff",
      weight: 2,
      fillColor: color,
      fillOpacity: 0.9,
    }).bindPopup(popupHtml, { maxWidth: 220 });

    if (placeId) marker.options.placeId = placeId;

    // Click → highlight saved card on left
    marker.on("click", () => {
      const card = document.getElementById(`place-${placeId}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.style.outline = "2px solid var(--accent)";
        setTimeout(() => { card.style.outline = ""; }, 1500);
      }
    });

    marker.addTo(window.mapInstance);
    window.mapMarkers.push(marker);
    points.push([lat, lng]);
  }

  if (viewName === "places") {
    const recPlaces = trip.recommendedPlaces || [];
    // Saved places (wishlist)
    trip.placesList.forEach((p) => {
      if (!p.lat || !p.lng) return;
      const color = catColor(p.category);
      const popup = `<strong>${p.name}</strong><br>
        <span style="color:${color}">● ${p.category || "custom"}</span><br>
        ${p.estimatedTime ? `⏱ ${p.estimatedTime}` : ""}
        ${p.note ? `<br><em>${p.note}</em>` : ""}`;
      addPin(p.lat, p.lng, p.name, color, popup, p.id);
    });
    // Recommended (not yet added) — dimmer
    recPlaces.forEach((p) => {
      if (!p.lat || !p.lng) return;
      if (trip.placesList.some((s) => s.sourceId === p.id)) return;
      const color = catColor(p.category);
      const marker = L.circleMarker([p.lat, p.lng], {
        radius: 5, color: "#fff", weight: 1.5,
        fillColor: color, fillOpacity: 0.35,
      }).bindPopup(`<strong>${p.name}</strong><br><span style="opacity:0.6">${p.category} · ${p.estimatedTime || ""}</span>`)
        .addTo(window.mapInstance);
      window.mapMarkers.push(marker);
      points.push([p.lat, p.lng]);
    });

  } else if (viewName === "itinerary") {
    const recMap = new Map((trip.recommendedPlaces || []).map((r) => [r.name, r]));
    const savedMap = new Map((trip.placesList || []).map((p) => [p.name, p]));

    const daysToShow = activeDayId
      ? trip.days.filter((d) => d.id === activeDayId)
      : trip.days;

    daysToShow.forEach((day) => {
      const dayPoints = [];

      day.activities.forEach((act) => {
        const src = recMap.get(act.title) || savedMap.get(act.title);
        if (!src || !src.lat || !src.lng) return;

        const color = catColor(src.category);
        const actState = trip.activities?.[act.id] || {};
        const note = actState.note || act.desc || "";
        const popup = `
          <strong>${act.title}</strong><br>
          <span style="opacity:0.7">Day ${day.id} · ${act.time || ""}</span><br>
          <span style="color:${color}">● ${src.category}</span>
          ${note ? `<br><em style="font-size:0.85em">${note}</em>` : ""}`;

        addPin(src.lat, src.lng, act.title, color, popup);
        dayPoints.push([src.lat, src.lng]);
      });

      // Polyline per day
      if (dayPoints.length > 1) {
        const line = L.polyline(dayPoints, {
          color: day.color || "#b8342f",
          weight: 2.5,
          opacity: 0.6,
          dashArray: "6 4",
        }).addTo(window.mapInstance);
        window.mapPolylines.push(line);
      }
    });
  }

  if (points.length > 0) {
    window.mapInstance.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  } else {
    window.mapInstance.setView([34.6937, 135.5023], 10);
  }

  setTimeout(() => window.mapInstance.invalidateSize(), 300);
}

// Pan the main map to a coordinate
export function panMapTo(lat, lng, zoom = 15) {
  if (!window.mapInstance) return;
  window.mapInstance.setView([lat, lng], zoom, { animate: true });
}

