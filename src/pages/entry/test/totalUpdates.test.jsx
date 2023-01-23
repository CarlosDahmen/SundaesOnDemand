import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("updates scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //check scoops subtotal starts out at 0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1, check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2, check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("updates toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //check toppings subtotal starts out at 0.00
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1, check subtotal
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesInput);
  expect(cherriesInput).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("1.50");

  //check if subtotal updates correctly when two boxes are checked
  const hotFudge = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  await user.click(hotFudge);
  expect(hotFudge).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("3.00");

  //check if subtotal updates correcly if a box is checked and then unchecked
  await user.click(hotFudge);
  expect(hotFudge).not.toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  const user = userEvent.setup();
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const total = screen.getByText("Grand total:", { exact: false });
    expect(total).toHaveTextContent("0.00");

    unmount();
  });
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    const total = screen.getByText("Grand total:", { exact: false });
    expect(total).toHaveTextContent("4.00");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const total = screen.getByText("Grand total:", { exact: false });
    expect(total).toHaveTextContent("3.50");
  });

  test("grand total updates properly if an item is removed", async () => {
    render(<OrderEntry />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput);

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "0");

    const total = screen.getByText("Grand total:", { exact: false });
    expect(total).toHaveTextContent("3.50");
  });
});
