export type Language = "vi" | "en" | "zh";

const formatNumber = {
  vi: (value: number) => value.toLocaleString("vi-VN"),
  en: (value: number) => value.toLocaleString("en-US"),
  zh: (value: number) => value.toLocaleString("zh-CN"),
} satisfies Record<Language, (value: number) => string>;

const formatNotes = {
  vi: (count: number) => `${formatNumber.vi(count)} tờ`,
  en: (count: number) => `${formatNumber.en(count)} notes`,
  zh: (count: number) => `${formatNumber.zh(count)} 张`,
} satisfies Record<Language, (count: number) => string>;

type SheetCopy = {
  denominationLabel: string;
  toggleDirect: string;
  toggleStepper: string;
  countLabel: string;
  decrementAria: string;
  incrementAria: string;
  inputLabel: (_max: string) => string;
  directInputAria: string;
  subtotalLabel: string;
  confirm: string;
  cancel: string;
  delete: string;
  invalidCount: string;
  maxCount: (_max: string) => string;
};

type ResetCopy = {
  button: string;
  confirmTitle: string;
  confirmMessage: string;
  skipLabel: string;
  cancel: string;
  confirm: string;
};

type ErrorCopy = {
  title: string;
  description: string;
  detailsLabel: string;
  reloadCta: string;
};

type FallbackCopy = {
  title: string;
  messagePrimary: string;
  messageSecondary: string;
  reloadCta: string;
};

export interface CashCounterTranslations {
  titleSuffix: string;
  totalLabel: string;
  gridSectionLabel: string;
  notesCount: (_count: number) => string;
  denominationsCount: (_count: number) => string;
  emptyListHint: string;
  gridSelectAria: (_value: string, _count: number) => string;
  gridCountBadge: (_count: number) => string;
  listEditAria: (_value: string, _count: number) => string;
  listCountLabel: (_count: number) => string;
  listSubtotalLabel: string;
  sheet: SheetCopy;
  reset: ResetCopy;
  homeLinkLabel: string;
  errors: ErrorCopy;
  fallback: FallbackCopy;
}

export interface Translations {
  vietnamese: string;
  english: string;
  chinese: string;
  closeLanguageMenu: string;
  cashCounter: CashCounterTranslations;
}

const cashCounter: Record<Language, CashCounterTranslations> = {
  vi: {
    titleSuffix: "Công Cụ Đếm Tiền",
    totalLabel: "Tổng tiền",
    gridSectionLabel: "Chọn mệnh giá",
    notesCount: formatNotes.vi,
    denominationsCount: (count: number) => `${formatNumber.vi(count)} loại mệnh giá`,
    emptyListHint: "Các mệnh giá đã nhập sẽ hiển thị tại đây, chạm để chỉnh sửa.",
    gridSelectAria: (value: string, count: number) => `Mệnh giá ${value} hiện ${formatNotes.vi(count)}`,
    gridCountBadge: formatNotes.vi,
    listEditAria: (value: string, count: number) => `Chỉnh sửa ${value} hiện ${formatNotes.vi(count)}`,
    listCountLabel: formatNotes.vi,
    listSubtotalLabel: "Tổng phụ",
    sheet: {
      denominationLabel: "Mệnh giá",
      toggleDirect: "Nhập trực tiếp",
      toggleStepper: "Quay lại bước nhấn",
      countLabel: "Số tờ",
      decrementAria: "Giảm một tờ",
      incrementAria: "Tăng một tờ",
      inputLabel: (max: string) => `Nhập số tờ (0 - ${max})`,
      directInputAria: "Nhập số tờ trực tiếp",
      subtotalLabel: "Tổng phụ",
      confirm: "Xác nhận",
      cancel: "Hủy",
      delete: "Xóa",
      invalidCount: "Vui lòng nhập số tờ hợp lệ",
      maxCount: (max: string) => `Tối đa ${max} tờ`,
    },
    reset: {
      button: "Xóa dữ liệu",
      confirmTitle: "Xác nhận xóa toàn bộ dữ liệu?",
      confirmMessage: "Thao tác này sẽ xóa tất cả mệnh giá đã nhập và dữ liệu lưu trữ.",
      skipLabel: "Lần sau không hỏi lại",
      cancel: "Hủy",
      confirm: "Xóa sạch",
    },
    homeLinkLabel: "SWEET HUT Trang chủ",
    errors: {
      title: "Đã xảy ra lỗi",
      description: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
      detailsLabel: "Chi tiết lỗi",
      reloadCta: "Tải lại trang",
    },
    fallback: {
      title: "Không thể khởi chạy ứng dụng",
      messagePrimary: "Vui lòng kiểm tra xem trình duyệt của bạn có hỗ trợ ứng dụng này hay không.",
      messageSecondary: "Nếu vấn đề vẫn tiếp diễn, hãy thử tải lại trang.",
      reloadCta: "Tải lại trang",
    },
  },
  en: {
    titleSuffix: "Cash Counter",
    totalLabel: "Total Amount",
    gridSectionLabel: "Choose denomination",
    notesCount: formatNotes.en,
    denominationsCount: (count: number) => `${formatNumber.en(count)} denominations`,
    emptyListHint: "Entered denominations will appear here. Tap to edit.",
    gridSelectAria: (value: string, count: number) =>
      `Denomination ${value} currently ${formatNotes.en(count)}`,
    gridCountBadge: formatNotes.en,
    listEditAria: (value: string, count: number) => `Edit ${value}, currently ${formatNotes.en(count)}`,
    listCountLabel: formatNotes.en,
    listSubtotalLabel: "Subtotal",
    sheet: {
      denominationLabel: "Denomination",
      toggleDirect: "Enter directly",
      toggleStepper: "Back to stepper",
      countLabel: "Count",
      decrementAria: "Decrease by one note",
      incrementAria: "Increase by one note",
      inputLabel: (max: string) => `Enter note count (0 - ${max})`,
      directInputAria: "Enter note count directly",
      subtotalLabel: "Subtotal",
      confirm: "Confirm",
      cancel: "Cancel",
      delete: "Delete",
      invalidCount: "Please enter a valid note count",
      maxCount: (max: string) => `Supports up to ${max} notes`,
    },
    reset: {
      button: "Clear All",
      confirmTitle: "Clear all data?",
      confirmMessage: "This will remove every entered denomination and clear local storage.",
      skipLabel: "Don't ask again next time",
      cancel: "Cancel",
      confirm: "Clear now",
    },
    homeLinkLabel: "SWEET HUT Home",
    errors: {
      title: "Something went wrong",
      description: "Sorry, something went wrong. Please try again.",
      detailsLabel: "Error details",
      reloadCta: "Reload page",
    },
    fallback: {
      title: "App failed to load",
      messagePrimary: "Please check if your browser supports this application.",
      messageSecondary: "If the problem persists, try reloading the page.",
      reloadCta: "Reload",
    },
  },
  zh: {
    titleSuffix: "点钞工具",
    totalLabel: "总金额",
    gridSectionLabel: "选择面额",
    notesCount: formatNotes.zh,
    denominationsCount: (count: number) => `${formatNumber.zh(count)} 种面额`,
    emptyListHint: "录入的面额会显示在这里，点按即可修改。",
    gridSelectAria: (value: string, count: number) => `面额 ${value} 当前 ${formatNotes.zh(count)}`,
    gridCountBadge: formatNotes.zh,
    listEditAria: (value: string, count: number) => `编辑 ${value} 当前 ${formatNotes.zh(count)}`,
    listCountLabel: formatNotes.zh,
    listSubtotalLabel: "小计",
    sheet: {
      denominationLabel: "面额",
      toggleDirect: "直接输入",
      toggleStepper: "返回步进",
      countLabel: "张数",
      decrementAria: "减一张",
      incrementAria: "加一张",
      inputLabel: (max: string) => `输入张数 (0 - ${max})`,
      directInputAria: "直接输入张数",
      subtotalLabel: "小计",
      confirm: "确认",
      cancel: "取消",
      delete: "删除",
      invalidCount: "请输入有效张数",
      maxCount: (max: string) => `最多支持 ${max} 张`,
    },
    reset: {
      button: "清空",
      confirmTitle: "确认清空全部金额？",
      confirmMessage: "此操作会移除所有已录入的面额并清除本地存储。",
      skipLabel: "本次清空不再提示",
      cancel: "取消",
      confirm: "确认清空",
    },
    homeLinkLabel: "SWEET HUT 首页",
    errors: {
      title: "发生错误",
      description: "抱歉，出现了错误。请重试。",
      detailsLabel: "错误详情",
      reloadCta: "重新加载",
    },
    fallback: {
      title: "应用加载失败",
      messagePrimary: "请检查您的浏览器是否支持此应用。",
      messageSecondary: "如果问题仍然存在，请尝试重新加载页面。",
      reloadCta: "重新加载",
    },
  },
};

export const translations: Record<Language, Translations> = {
  vi: {
    vietnamese: "Tiếng Việt",
    english: "English",
    chinese: "简体中文",
    closeLanguageMenu: "Đóng menu ngôn ngữ",
    cashCounter: cashCounter.vi,
  },
  en: {
    vietnamese: "Tiếng Việt",
    english: "English",
    chinese: "简体中文",
    closeLanguageMenu: "Close language menu",
    cashCounter: cashCounter.en,
  },
  zh: {
    vietnamese: "Tiếng Việt",
    english: "English",
    chinese: "简体中文",
    closeLanguageMenu: "关闭语言菜单",
    cashCounter: cashCounter.zh,
  },
};

export type CashCounterCopy = CashCounterTranslations;

export const getCopy = (language: Language): CashCounterCopy =>
  translations[language]?.cashCounter ?? cashCounter.vi;
