import { IconType } from "react-icons";

export interface CartItem {
  id: number;
  name: string;
  icon: IconType;
  number: number;
  iconClass: string;
  desc: string;
}

export interface CartListItem {
  id: number;
  name: string;
  email: string;
  company: string;
  status: "New" | "Qualified" | "Proposal" | "Contacted" | "Won";
  value: string;
  source: string;
  created_at: string;
  is_active: boolean;
}
