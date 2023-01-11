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
});
