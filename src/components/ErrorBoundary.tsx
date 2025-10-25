import React from "react";
import { getCopy } from "../i18n/translations";
import { LanguageContext, type LanguageContextType } from "./contexts/LanguagecContext";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  static contextType = LanguageContext;

  declare context: LanguageContextType | undefined;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("[ErrorBoundary] Caught error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Error details:", error, errorInfo);
  }

  render() {
    const language = this.context?.language ?? "vi";
    const copy = getCopy(language);
    const errorCopy = copy.errors;

    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4 dark:bg-neutral-950">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card dark:bg-neutral-900">
            <h1 className="mb-4 text-2xl font-bold text-accent-dark">{errorCopy.title}</h1>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">{errorCopy.description}</p>
            {this.state.error && (
              <details className="mb-4 rounded-2xl bg-neutral-100 p-4 text-sm dark:bg-neutral-800">
                <summary className="cursor-pointer font-semibold text-neutral-700 dark:text-neutral-200">
                  {errorCopy.detailsLabel}
                </summary>
                <pre className="mt-2 overflow-x-auto text-xs text-neutral-600 dark:text-neutral-400">
                  {this.state.error.message}
                  {"\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              type="button"
              className="w-full rounded-3xl bg-primary px-4 py-3 font-semibold text-white shadow-card transition hover:bg-primary-dark"
              onClick={() => {
                window.location.reload();
              }}
            >
              {errorCopy.reloadCta}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
