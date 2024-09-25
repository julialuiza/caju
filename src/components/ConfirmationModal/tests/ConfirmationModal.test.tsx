import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ConfirmationModal } from "../index";

describe("ConfirmationModal", () => {
  const modalDefaultProps = {
    isLoading: false,
    isOpen: true,
    title: "Excluir cadastro",
    description: "Tem certeza que deseja excluir este cadastro?",
    onConfirm: jest.fn(),
    onClose: jest.fn(),
  };

  it("should render correctly", () => {
    render(<ConfirmationModal {...modalDefaultProps} />);

    expect(screen.getByText(modalDefaultProps.title)).toBeVisible();
    expect(screen.getByText(modalDefaultProps.description)).toBeVisible();
    expect(screen.getByText("Cancelar")).toBeVisible();
    expect(screen.getByText("Confirmar")).toBeVisible();
  });

  it("should correctly call onConfirm when confirm button is clicked", async () => {
    render(<ConfirmationModal {...modalDefaultProps} />);

    const confirmButton = screen.getByRole("button", { name: /confirmar/i });

    userEvent.click(confirmButton);

    await waitFor(() => {
      expect(modalDefaultProps.onConfirm).toHaveBeenCalled();
    });
  });

  it("should correctly call onClose when cancel button is clicked", async () => {
    render(<ConfirmationModal {...modalDefaultProps} />);

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });

    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(modalDefaultProps.onClose).toHaveBeenCalled();
    });
  });

  it("should disable confirm button when isLoading is true", () => {
    render(<ConfirmationModal {...modalDefaultProps} isLoading={true} />);

    const confirmButton = screen.getByRole("button", {
      name: /Atualizando.../i,
    });

    expect(confirmButton).toBeDisabled();
  });
});
