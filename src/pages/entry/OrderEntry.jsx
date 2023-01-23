import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderEntry() {
  const { grandTotal } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
    </div>
  );
}
