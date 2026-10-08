import {
  IoBus,
  IoCart,
  IoFastFood,
  IoReceipt,
  IoStorefront,
  IoTicket,
} from "react-icons/io5";

type CategoryStyle = {
  color: string;
  tint: string;
  icon: React.ReactNode;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Food: {
    color: "#a5a0f9",
    tint: "rgba(244,162,114,0.18)",
    icon: <IoFastFood size={22} />,
  },
  Transport: {
    color: "#62bdf4",
    tint: "rgba(98,189,244,0.18)",
    icon: <IoBus size={22} />,
  },
  Bills: {
    color: "#f4a272",
    tint: "rgba(165,160,249,0.18)",
    icon: <IoReceipt size={22} />,
  },
  Fun: {
    color: "#6fd6a0",
    tint: "rgba(111,214,160,0.18)",
    icon: <IoTicket size={22} />,
  },
  Shopping: {
    color: "#f48fb1",
    tint: "rgba(244,143,177,0.18)",
    icon: <IoCart size={22} />,
  },
};

const FALLBACK_STYLE: CategoryStyle = {
  color: "#9aa0ad",
  tint: "rgba(154,160,173,0.18)",
  icon: <IoStorefront size={22} />,
};

export const getCategoryStyle = (category: string): CategoryStyle =>
  CATEGORY_STYLES[category] ?? FALLBACK_STYLE;
