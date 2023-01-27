import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  //render app
  const { unmount } = render(<App />);

  // //add scoops and toppings
  // //add 2 vanilla scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  //add 1 chocolate scoop
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");
  // //add hot fudge topping
  const hotFudge = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  await user.click(hotFudge);
  const total = screen.getByText("Grand total:", { exact: false });
  expect(total).toHaveTextContent("7.50");

  // //find and click order button
  const orderButton = screen.getByRole("button", { name: "Order Sundae" });

  await user.click(orderButton);

  //check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  // //accept terms & conditions and click button to confirm order

  //find and click terms and conditions checkbox
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(termsAndConditionsCheckbox).not.toBeChecked();
  await user.click(termsAndConditionsCheckbox);
  expect(termsAndConditionsCheckbox).toBeChecked();

  //find and click confirm button
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  await user.click(confirmButton);

  // expect LOADING to show
  let loadingMessage = screen.getByText("LOADING", { name: false });
  expect(loadingMessage).toBeInTheDocument();

  // check page confirmation
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  //expect loading message to have dissapeared
  const notLoading = screen.queryByText("LOADING");
  expect(notLoading).not.toBeInTheDocument();

  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // //check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // unmount component
  unmount();

  // //do we need to await anything to avoid test errors
});

test("toppings not shown on confirmation page if none are selected", async () => {
  const user = userEvent.setup();
  //render app
  const { unmount } = render(<App />);

  // //add scoops and toppings
  // //add 2 vanilla scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  //add 1 chocolate scoop
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  const orderButton = screen.getByRole("button", { name: "Order Sundae" });
  await user.click(orderButton);

  //check scoop heading is on the document
  const scoopsHeading = screen.getByRole("heading", { name: /scoops/i });
  expect(scoopsHeading).toBeInTheDocument();

  //check topping heading is not on the document
  const toppingHeader = screen.queryByRole("heading", { name: /Topping/i });
  expect(toppingHeader).not.toBeInTheDocument();

  unmount();
});
