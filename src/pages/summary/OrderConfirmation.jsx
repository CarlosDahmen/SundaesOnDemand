import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    //call post method here
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true));
  }, []);

  const { resetOrder } = useOrderDetails();

  const handleClick = () => {
    //reset order details
    resetOrder();

    //send back to order page
    setOrderPhase("inProgress");
  };

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  return !orderNumber ? (
    <div>LOADING</div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: "25%" }}>
        as per our terms and conditions, nothing will happen now
      </p>
      {newOrderButton}
    </div>
  );
}
