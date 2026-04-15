const modules = [
  "./../js/data/trip-data.js",
  "./../js/core/utils.js",
  "./../js/core/storage.js",
  "./../js/core/state.js",
  "./../js/views/dashboard.js",
  "./../js/views/itinerary.js",
  "./../js/views/backup.js",
  "./../js/views/docs.js",
  "./../js/views/checklist.js",
  "./../js/views/budget.js",
  "./../js/views/settings.js"
];

for (const modulePath of modules) {
  await import(new URL(modulePath, import.meta.url));
}

Object.defineProperty(globalThis, "document", {
  value: {
    getElementById() {
      return {
        value: "",
        files: [],
        addEventListener() {},
        querySelectorAll() { return []; },
        innerHTML: "",
        classList: { add() {}, remove() {}, toggle() {} },
        textContent: "",
        click() {},
        matches() { return false; }
      };
    },
    documentElement: { dataset: {} },
    createElement() {
      return { click() {} };
    }
  },
  configurable: true
});

Object.defineProperty(globalThis, "window", {
  value: {
    open() {},
    setTimeout,
    clearTimeout
  },
  configurable: true
});

Object.defineProperty(globalThis, "navigator", {
  value: {
    serviceWorker: {
      register() {
        return Promise.resolve();
      }
    },
    clipboard: {
      writeText() {
        return Promise.resolve();
      }
    }
  },
  configurable: true
});

await import(new URL("./../js/main.js", import.meta.url));

console.log("kansai-trip-app-v2: check passed");
