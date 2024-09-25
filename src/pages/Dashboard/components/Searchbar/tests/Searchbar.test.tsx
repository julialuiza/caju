import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Searchbar from "../index";
import routes from "../../../../../router/routes";

const mockHistoryPush = jest.fn();
const mockRefetchRegistrations = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Searchbar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const searchBarDefaultProps = {
    refetchRegistrations: mockRefetchRegistrations,
    setCPFValueForSearch: jest.fn(),
  };

  it("should render correctly", () => {
    render(<Searchbar {...searchBarDefaultProps} />);

    const searchInput = screen.getByPlaceholderText(/Digite um CPF válido/i);
    const refreshButton = screen.getByRole("button", {
      name: /Atualizar registros/i,
    });
    const newRegistrationButton = screen.getByRole("button", {
      name: /Nova Admissão/i,
    });

    expect(searchInput).toBeVisible();
    expect(refreshButton).toBeVisible();
    expect(newRegistrationButton).toBeVisible();
  });

  it("should call refetchRegistrations when refresh button is clicked", async () => {
    render(<Searchbar {...searchBarDefaultProps} />);
    const refreshButton = screen.getByRole("button", {
      name: /Atualizar registros/i,
    });

    userEvent.click(refreshButton);

    await waitFor(() => {
      expect(mockRefetchRegistrations).toHaveBeenCalled();
    });
  });

  it("should call goToNewAdmissionPage when new registration button is clicked", async () => {
    render(<Searchbar {...searchBarDefaultProps} />);
    const newRegistrationButton = screen.getByRole("button", {
      name: /Nova Admissão/i,
    });

    userEvent.click(newRegistrationButton);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith(routes.newUser);
    });
  });

  it("should call refetchRegistrations when CPF input changes and it is valid", async () => {
    render(<Searchbar {...searchBarDefaultProps} />);
    const searchInput = screen.getByPlaceholderText(/Digite um CPF válido/i);

    userEvent.type(searchInput, "12345678901");

    await waitFor(() => {
      expect(mockRefetchRegistrations).toHaveBeenCalled();
    });
  });

  it("should display error message when CPF input changes and it is invalid", async () => {
    render(<Searchbar {...searchBarDefaultProps} />);
    const searchInput = screen.getByPlaceholderText(/Digite um CPF válido/i);

    userEvent.type(searchInput, "1234567");

    await waitFor(() => {
      expect(screen.getByText(/CPF Inválido/i)).toBeVisible();
    });
  });
});
