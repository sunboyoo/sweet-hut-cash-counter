export type Language = "vi" | "zh";

const withCount = (count: number, unit: string) => `${count.toLocaleString("vi-VN")} ${unit}`;

const translations = {
  zh: {
    titleSuffix: "点钞工具",
    totalLabel: "总金额",
    notesCount: (count: number) => `${count.toLocaleString("zh-CN")} 张`,
    denominationsCount: (count: number) => `${count.toLocaleString("zh-CN")} 种面额`,
    emptyListHint: "录入的面额会显示在这里，点按即可修改。",
    gridSelectAria: (value: string, count: number) => `面额 ${value} 当前 ${count.toLocaleString("zh-CN")} 张`,
    gridCountBadge: (count: number) => `${count.toLocaleString("zh-CN")} 张`,
    listEditAria: (value: string, count: number) => `编辑 ${value} 当前 ${count.toLocaleString("zh-CN")} 张`,
    listCountLabel: (count: number) => `${count.toLocaleString("zh-CN")} 张`,
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
    language: {
      label: "语言",
      vi: "Tiếng Việt",
      zh: "简体中文",
    },
    links: {
      cards: [
        {
          id: 1,
          title: 'SWEET HUT 导航',
          description: 'SWEET HUT 导航',
          url: 'https://sweet-hut-nav.vercel.app/'
        },
        {
          id: 2,
          title: '工作时间和工资',
          description: '根据每天的工作时间，计算总工作时长和工资',
          url: 'https://sweet-hut-salary.vercel.app/'
        }
      ]
    },
  },
  vi: {
    titleSuffix: "Công Cụ Đếm Tiền",
    totalLabel: "Tổng tiền",
    notesCount: (count: number) => withCount(count, "tờ"),
    denominationsCount: (count: number) => `${count.toLocaleString("vi-VN")} loại mệnh giá`,
    emptyListHint: "Các mệnh giá đã nhập sẽ hiển thị tại đây, chạm để chỉnh sửa.",
    gridSelectAria: (value: string, count: number) => `Mệnh giá ${value} hiện ${withCount(count, "tờ")}`,
    gridCountBadge: (count: number) => withCount(count, "tờ"),
    listEditAria: (value: string, count: number) => `Chỉnh sửa ${value} hiện ${withCount(count, "tờ")}`,
    listCountLabel: (count: number) => withCount(count, "tờ"),
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
    language: {
      label: "Ngôn ngữ",
      vi: "Tiếng Việt",
      zh: "简体中文",
    },
    links: {
      cards: [
        {
          id: 1,
          title: 'SWEET HUT Trang chủ',
          description: 'SWEET HUT Trang chủ',
          url: 'https://sweet-hut-nav.vercel.app/'
        },
        {
          id: 2,
          title: 'Thời Gian Làm Việc và Lương',
          description: 'Tính lương và giờ làm việc theo ngày',
          url: 'https://sweet-hut-salary.vercel.app/'
        }
      ]
    },
  },
} satisfies Record<Language, {
  titleSuffix: string;
  totalLabel: string;
  notesCount: (_count: number) => string;
  denominationsCount: (_count: number) => string;
  emptyListHint: string;
  gridSelectAria: (_value: string, _count: number) => string;
  gridCountBadge: (_count: number) => string;
  listEditAria: (_value: string, _count: number) => string;
  listCountLabel: (_count: number) => string;
  listSubtotalLabel: string;
  sheet: {
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
  reset: {
    button: string;
    confirmTitle: string;
    confirmMessage: string;
    skipLabel: string;
    cancel: string;
    confirm: string;
  };
  language: {
    label: string;
    vi: string;
    zh: string;
  };
  links: {
    cards: Array<{
      id: number;
      title: string;
      description: string;
      url: string;
    }>;
  };
}>;

export const getCopy = (language: Language) => translations[language];
