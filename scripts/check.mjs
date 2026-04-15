const modules = [
  "./../js/data/trip-data.js",
  "./../js/core/utils.js",
  "./../js/core/storage.js",
  "./../js/core/state.js",
  "./../js/views/dashboard.js",
  "./../js/views/assist.js",
  "./../js/views/prep.js",
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
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        textContent: "",
        click() {},
        reset() {},
        focus() {},
        setAttribute() {},
        matches() { return false; }
      };
    },
    documentElement: { dataset: {} },
    createElement() {
      return { click() {} };
    },
    addEventListener() {}
  },
  configurable: true
});

const _localStore = {};
Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (k) => _localStore[k] ?? null,
    setItem: (k, v) => { _localStore[k] = v; },
    removeItem: (k) => { delete _localStore[k]; }
  },
  configurable: true
});

Object.defineProperty(globalThis, "window", {
  value: {
    open() {},
    setTimeout,
    clearTimeout,
    location: { href: "http://localhost/" },
    supabase: {
      createClient: () => ({
        auth: {
          getSession: async () => ({ data: { session: null } }),
          signInWithOtp: async () => ({ error: null }),
          signOut: async () => {},
          onAuthStateChange: () => ({ data: { subscription: null } })
        },
        from: () => ({
          select: () => ({ eq: async () => ({ data: [], error: null }) }),
          upsert: async () => ({ error: null })
        }),
        storage: {
          from: () => ({
            upload: async () => ({ data: null, error: null }),
            download: async () => ({ data: null, error: null }),
            remove: async () => ({ data: null, error: null })
          })
        }
      })
    }
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
