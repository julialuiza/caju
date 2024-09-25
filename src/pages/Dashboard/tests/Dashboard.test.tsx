import { screen, waitFor } from "@testing-library/react";
import Dashboard from "../index";
import renderWithProviders from "../../../helpers/testing-library";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      registration: "new",
    },
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Dashboard ", () => {
  it("should correctly display snackbar feedback if it is new registration origin", async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Cadastro realizado com sucesso!")).toBeVisible();
    });
  });
});
