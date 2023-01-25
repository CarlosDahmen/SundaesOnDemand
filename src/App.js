import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderConfirmation from "./pages/summary/OrderConfirmation";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;

  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {/*Summary page and entry page both need the provider*/}
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
      {/* The confirmation page does not need the provider */}
    </Container>
  );
}

export default App;
