export function registerSW() {
  if (import.meta.env.DEV || typeof window === "undefined" || !("serviceWorker" in navigator)) {
    console.log("[SW] Service worker not available or in dev mode");
    return;
  }

  const register = async () => {
    try {
      console.log("[SW] Attempting to register service worker");
      const registration = await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
      });
      console.log("[SW] Service worker registered successfully");

      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.info("[SW] New content is available; reload to update.");
          }
        });
      });
    } catch (error) {
      console.error("[SW] Service worker registration failed", error);
      // Don't throw - allow app to continue without SW
    }
  };

  // Use setTimeout as a fallback for Safari
  if (document.readyState === "complete") {
    setTimeout(register, 0);
  } else {
    window.addEventListener("load", register, { once: true });
  }
}
