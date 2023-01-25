import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import { Button } from "react-bootstrap";

export default function OrderEntry({ setOrderPhase }) {
  const { totals, grandTotal } = useOrderDetails();
  const disableButton = totals.scoops === 0;

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
      <Button disabled={disableButton} onClick={() => setOrderPhase("review")}>
        Order Sundae
      </Button>
    </div>
  );
}
