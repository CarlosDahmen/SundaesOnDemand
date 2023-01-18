import Options from "./Options";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

export default function OrderEntry() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}
