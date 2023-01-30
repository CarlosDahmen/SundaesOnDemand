import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/servers";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";

test("error response from server when submitting order", async () => {
  //override msw response for options endpoint with error response
  server.resetHandlers(rest.post("localhost:3030/order"), (req, res, ctx) =>
    res(ctx.status(500))
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error ocurred. Please try again later."
  );
});
