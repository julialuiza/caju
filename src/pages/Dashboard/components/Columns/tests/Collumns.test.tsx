import { screen } from "@testing-library/react";
import Collumns from "../index";
import { registrationsMocks } from "../../../../../services/dataMocks/registrations-mock";

import renderWithProviders from "../../../../../helpers/testing-library";

describe("Columns", () => {
  const columnsDefaultProps = {
    handleSnackbarFeedback: jest.fn(),
    refetchRegistrations: jest.fn(),
    registrations: registrationsMocks,
    isRegistrationsLoading: false,
  };

  it("should render columns correctly", () => {
    renderWithProviders(<Collumns {...columnsDefaultProps} />);

    expect(screen.getByText("Pronto para revisar")).toBeVisible();
    expect(screen.getByText("Aprovado")).toBeVisible();
    expect(screen.getByText("Reprovado")).toBeVisible();
  });

  it("should render registration cards correctly in each column", () => {
    renderWithProviders(<Collumns {...columnsDefaultProps} />);

    expect(screen.getAllByTestId("registration-card-REVIEW")).toHaveLength(1);
    expect(screen.getAllByTestId("registration-card-APPROVED")).toHaveLength(1);
    expect(screen.getAllByTestId("registration-card-REPROVED")).toHaveLength(1);
  });

  it("should render loading state correctly", () => {
    renderWithProviders(
      <Collumns {...columnsDefaultProps} isRegistrationsLoading />
    );

    expect(screen.getByTestId("collumns-loading-state")).toBeVisible();
  });
});
