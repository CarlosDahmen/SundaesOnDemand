import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/*Summary page and entry page both need the provider*/}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* The confirmation page does not need the provider */}
    </Container>
  );
}

export default App;
