import { fireEvent, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import NewUserPage from "../index";
import renderWithProviders from "../../../helpers/testing-library";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("NewUserPage ", () => {
  it("should display error message when name input changes and it is invalid", async () => {
    renderWithProviders(<NewUserPage />);
    const nameInput = screen.getByPlaceholderText(/Nome/i);

    userEvent.type(nameInput, "a");

    await waitFor(() => {
      expect(
        screen.getByText(
          "Por favor, forneça um nome válido (com pelo menos 2 palavras, e que a primeira letra não seja um número.)"
        )
      ).toBeVisible();
    });
  });

  it("should display error message when email input changes and it is invalid", async () => {
    renderWithProviders(<NewUserPage />);
    const emailInput = screen.getByPlaceholderText(/Email/i);

    userEvent.type(emailInput, "a");

    await waitFor(() => {
      expect(
        screen.getByText("Por favor, forneça um email válido.")
      ).toBeVisible();
    });
  });

  it("should display error message when CPF input changes and it is invalid", async () => {
    renderWithProviders(<NewUserPage />);
    const CPFInput = screen.getByPlaceholderText(/CPF/i);

    userEvent.type(CPFInput, "123");

    await waitFor(() => {
      expect(screen.getByText("CPF Inválido")).toBeVisible();
    });
  });

  it("should disable register button if inputs are empty", async () => {
    renderWithProviders(<NewUserPage />);
    const registerButton = screen.getByRole("button", {
      name: /Cadastrar/i,
    });

    expect(registerButton).toBeDisabled();
  });

  it("should disable register button if any input is invalid", async () => {
    renderWithProviders(<NewUserPage />);
    const registerButton = screen.getByRole("button", {
      name: /Cadastrar/i,
    });

    const nameInput = screen.getByPlaceholderText(/Nome/i);

    userEvent.type(nameInput, "a");

    await waitFor(() => {
      expect(registerButton).toBeDisabled();
    });
  });

  it("should enable register button if all inputs are valid", async () => {
    renderWithProviders(<NewUserPage />);

    const registerButton = screen.getByRole("button", {
      name: /Cadastrar/i,
    });

    const nameInput = screen.getByPlaceholderText(/Nome/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const CPFInput = screen.getByPlaceholderText(/CPF/i);
    const admissionDateInput = screen.getByTestId("admission-date");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "teste@teste.com" } });
    fireEvent.change(CPFInput, { target: { value: "12345678909" } });
    fireEvent.change(admissionDateInput, { target: { value: "2021-10-10" } });

    await waitFor(() => {
      expect(registerButton).toBeEnabled();
    });
  });
});
