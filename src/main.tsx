import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "./serviceWorkerRegistration";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LanguageProvider } from "./components/contexts/LanguagecContext";
import { getCopy, type Language } from "./i18n/translations";

// Add global error handler for better debugging
window.addEventListener("error", (event) => {
  console.error("[Global Error Handler]", event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[Unhandled Promise Rejection]", event.reason);
});

const detectLanguage = (): Language => {
  if (typeof navigator === "undefined") return "vi";
  const navLang = navigator.language?.toLowerCase() ?? "";
  if (navLang.startsWith("zh")) return "zh";
  if (navLang.startsWith("en")) return "en";
  return "vi";
};

console.log("[App] Starting application");
console.log("[App] User Agent:", navigator.userAgent);

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  console.log("[App] Root element found, creating React root");
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );

  console.log("[App] React app rendered successfully");
  registerSW();
} catch (error) {
  console.error("[App] Failed to initialize app:", error);
  // Show a basic fallback UI if React fails to mount
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const fallbackLanguage = detectLanguage();
    const fallbackCopy = getCopy(fallbackLanguage).fallback;
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="max-width: 400px; padding: 30px; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h1 style="color: #e53e3e; margin-bottom: 16px;">${fallbackCopy.title}</h1>
          <p style="color: #4a5568; margin-bottom: 20px;">${fallbackCopy.messagePrimary}</p>
          <p style="color: #4a5568; margin-bottom: 20px;">${fallbackCopy.messageSecondary}</p>
          <button onclick="window.location.reload()" style="width: 100%; padding: 12px; background: #48bb78; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer;">
            ${fallbackCopy.reloadCta}
          </button>
        </div>
      </div>
    `;
  }
}
