import { IconType } from "react-icons";

interface CartItem {
  id: number;
  name: string;
  icon: IconType;
  number: number;
  iconClass: string;
  desc: string;
}
export default CartItem;
