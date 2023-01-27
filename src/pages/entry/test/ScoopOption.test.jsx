import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import UserEvent from "@testing-library/user-event";

test("scoop form is red if an invalid selection is made", async () => {
  const user = UserEvent.setup();
  //render app
  render(<ScoopOption />);

  //input negative number of scoops; selection should be invalid
  const vanillaInput = screen.getByRole("spinbutton");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  //input decimal scoops; selection should be invalid
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.4");

  expect(vanillaInput).toHaveClass("is-invalid");

  //input too large a scoop quantity; selection should be invalid
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "13");
  expect(vanillaInput).toHaveClass("is-invalid");
});
