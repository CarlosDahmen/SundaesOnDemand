import { render, screen } from "@testing-library/react";

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
