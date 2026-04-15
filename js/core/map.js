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
}

export function updateMapMarkers(trip, viewName) {
  if (!window.mapInstance || !window.L) return;

  if (window.mapMarkers) {
    window.mapMarkers.forEach((m) => window.mapInstance.removeLayer(m));
  }
  window.mapMarkers = [];
  const points = [];

  const mainColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || "#b8342f";

  // Shared function to add pin
  function addPin(lat, lng, title, highlight) {
    const marker = L.circleMarker([lat, lng], {
      radius: highlight ? 8 : 6,
      color: highlight ? "#1f8a5b" : mainColor,
      fillColor: highlight ? "#1f8a5b" : mainColor,
      fillOpacity: highlight ? 0.9 : 0.6,
      weight: 2
    })
      .bindPopup(`<strong>${title}</strong>`)
      .addTo(window.mapInstance);
    window.mapMarkers.push(marker);
    points.push([lat, lng]);
  }

  if (viewName === "places") {
    const recPlaces = trip.recommendedPlaces || [];
    recPlaces.forEach((p) => {
      if (p.lat && p.lng) {
        const added = trip.placesList.some((s) => s.sourceId === p.id);
        addPin(p.lat, p.lng, p.name, added);
      }
    });
  } else if (viewName === "itinerary") {
    const recMap = new Map((trip.recommendedPlaces || []).map(r => [r.name, r]));
    trip.days.forEach((day) => {
      day.activities.forEach((act) => {
        const rec = recMap.get(act.title);
        if (rec && rec.lat && rec.lng) {
          // Highlight if it's the currently viewed day (we might lack active dayId here natively, but we show all for now)
          addPin(rec.lat, rec.lng, `Day ${day.id}: ${act.title}`, true);
        }
      });
    });
  }

  if (points.length > 0) {
    window.mapInstance.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  } else {
    window.mapInstance.setView([34.6937, 135.5023], 10);
  }
  
  // Invalidate size in case pane just became visible
  setTimeout(() => window.mapInstance.invalidateSize(), 300);
}
