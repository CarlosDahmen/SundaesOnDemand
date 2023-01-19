import { render, screen } from "../../../test-utils/testing-library-utils";

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
