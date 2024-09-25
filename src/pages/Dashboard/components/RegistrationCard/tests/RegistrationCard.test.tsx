import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import RegistrationCard from "../index";
import { registrationsMocks } from "../../../../../services/dataMocks/registrations-mock";
import renderWithProviders from "../../../../../helpers/testing-library";

describe("RegistrationCard", () => {
  const registrationCardDefaultProps = {
    handleSnackbarFeedback: jest.fn(),
    refetchRegistrations: jest.fn(),
  };

  it("should render correctly for status APPROVED", () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[0]}
      />
    );

    expect(screen.getByText("Filipe Marins")).toBeVisible();
    expect(screen.getByText("22/10/2023")).toBeVisible();
    expect(screen.getByText("filipe@caju.com.br")).toBeVisible();

    expect(screen.getByText("Revisar novamente")).toBeVisible();
    expect(screen.queryByText("Aprovar")).not.toBeInTheDocument();
    expect(screen.queryByText("Reprovar")).not.toBeInTheDocument();
  });

  it("should render correctly for status REVIEW", () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[1]}
      />
    );

    expect(screen.getByText("teste julia")).toBeVisible();
    expect(screen.getByText("10/02/2001")).toBeVisible();
    expect(screen.getByText("ju@gmail.com")).toBeVisible();

    expect(screen.getByText("Aprovar")).toBeVisible();
    expect(screen.getByText("Reprovar")).toBeVisible();
    expect(screen.queryByText("Revisar novamente")).not.toBeInTheDocument();
  });

  it("should render correctly for status REPROVED", () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[2]}
      />
    );

    expect(screen.getByText("teste2 julia")).toBeVisible();
    expect(screen.getByText("10/10/1999")).toBeVisible();
    expect(screen.getByText("teste2@gmail.com")).toBeVisible();

    expect(screen.getByText("Revisar novamente")).toBeVisible();
    expect(screen.queryByText("Aprovar")).not.toBeInTheDocument();
    expect(screen.queryByText("Reprovar")).not.toBeInTheDocument();
  });

  it("should correctly display confirmation modal when delete button is clicked", async () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[0]}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /Excluir registro/i,
    });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Excluir cadastro")).toBeVisible();
      expect(
        screen.getByText("Tem certeza que deseja excluir este cadastro?")
      ).toBeVisible();
      expect(screen.getByText("Cancelar")).toBeVisible();
      expect(screen.getByText("Confirmar")).toBeVisible();
    });
  });

  it("should correctly display confirmation modal when approve button is clicked", async () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[1]}
      />
    );

    const approveButton = screen.getByRole("button", {
      name: /Aprovar/i,
    });
    userEvent.click(approveButton);

    await waitFor(() => {
      expect(screen.getByText("Atualizar cadastro")).toBeVisible();
      expect(
        screen.getByText("Tem certeza que deseja aprovar este cadastro?")
      ).toBeVisible();
      expect(screen.getByText("Cancelar")).toBeVisible();
      expect(screen.getByText("Confirmar")).toBeVisible();
    });
  });

  it("should correctly display confirmation modal when reprove button is clicked", async () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[1]}
      />
    );

    const reproveButton = screen.getByRole("button", {
      name: /Reprovar/i,
    });
    userEvent.click(reproveButton);

    await waitFor(() => {
      expect(screen.getByText("Atualizar cadastro")).toBeVisible();
      expect(
        screen.getByText("Tem certeza que deseja reprovar este cadastro?")
      ).toBeVisible();
      expect(screen.getByText("Cancelar")).toBeVisible();
      expect(screen.getByText("Confirmar")).toBeVisible();
    });
  });

  it("should correctly display confirmation modal when review button is clicked", async () => {
    renderWithProviders(
      <RegistrationCard
        {...registrationCardDefaultProps}
        data={registrationsMocks[2]}
      />
    );

    const reviewButton = screen.getByRole("button", {
      name: /Revisar novamente/i,
    });
    userEvent.click(reviewButton);

    await waitFor(() => {
      expect(screen.getByText("Atualizar cadastro")).toBeVisible();
      expect(
        screen.getByText(
          "Tem certeza que deseja revisar novamente este cadastro?"
        )
      ).toBeVisible();
      expect(screen.getByText("Cancelar")).toBeVisible();
      expect(screen.getByText("Confirmar")).toBeVisible();
    });
  });
});
