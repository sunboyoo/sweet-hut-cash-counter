import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
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
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-surface via-white to-surface p-4 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card dark:bg-neutral-900">
            <h1 className="mb-4 text-2xl font-bold text-accent-dark">Đã xảy ra lỗi / 发生错误</h1>
            <p className="mb-4 text-neutral-600 dark:text-neutral-300">
              Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.
            </p>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">
              抱歉，出现了错误。请重试。
            </p>
            {this.state.error && (
              <details className="mb-4 rounded-2xl bg-neutral-100 p-4 text-sm dark:bg-neutral-800">
                <summary className="cursor-pointer font-semibold text-neutral-700 dark:text-neutral-200">
                  Chi tiết lỗi / 错误详情
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
              Tải lại trang / 重新加载
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

