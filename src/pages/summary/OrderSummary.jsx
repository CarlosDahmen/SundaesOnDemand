import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();
  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));
  const toppingArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {totals.toppings !== 0 ? (
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      ) : null}
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
