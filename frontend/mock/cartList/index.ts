import { FiUsers, FiDollarSign, FiTarget, FiTrendingUp } from "react-icons/fi";

export const cartList = [
  {
    id: 1,
    name: "Total Leads",
    icon: FiUsers,
    number: "5",
    desc: "Active pipeline",
    color: "bg-[#1e75ff]", // Mavi
  },
  {
    id: 2,
    name: "Total Value",
    icon: FiDollarSign,
    number: "$235.000",
    desc: "Pipeline value",
    color: "bg-[#00b64f]", // Yaşıl
  },
  {
    id: 3,
    name: "Won Deals",
    icon: FiTarget,
    number: "1",
    desc: "Closed successfully",
    color: "bg-[#9c27ff]", // Bənövşəyi
  },
  {
    id: 4,
    name: "Conversion Rate",
    icon: FiTrendingUp,
    number: "20.0%",
    desc: "Win percentage",
    color: "bg-[#ff5b00]", // Narıncı
  },
];
