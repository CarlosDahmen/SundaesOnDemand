import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm Tests", () => {
  test("Checkbox is unchecked by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });

    const button = screen.getByRole("button");

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("Checking checkbox enables button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });

    const button = screen.getByRole("button");

    await user.click(checkbox);
    expect(button).toBeEnabled();
  });

  test("Unchecking checkbox again disables button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });

    const button = screen.getByRole("button");

    await user.click(checkbox);
    await user.click(checkbox);
    expect(button).toBeDisabled();
  });

  test("popover response to hover", async () => {
    render(<SummaryForm />);
    const user = userEvent.setup();

    //check that popover starts out hidden
    const nullPopover = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    //popover appears on mousover of checkbox label

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);

    const popover = screen.getByText(
      /No ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    //dissapears when we mouse out
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
  });
});
