import { render, screen } from "../../../test-utils/testing-library-utils";
import UserEvent from "@testing-library/user-event";
import Options from "../Options";

test("It displays image from each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  //confirm images text
  const altText = scoopImages.map((element) => element.alt);

  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("It dispays image from each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  //confirm images text
  const altText = toppingImages.map((topping) => topping.alt);

  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});

test("scoops total does not update if count is invalid", async () => {
  const user = UserEvent.setup();
  render(<Options optionType="scoops" />);

  //input negative number of scoops; subtotal should be $0.00
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");

  const scoopSubtotal = screen.getByText("Scoops total", {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent("$0.00");

  //input decimal numebr of scoops; subtotal should be $0.00
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(scoopSubtotal).toHaveTextContent("$0.00");

  //input too many scoops; subtotal should be $0.00
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "13");
  expect(scoopSubtotal).toHaveTextContent("$0.00");
});
