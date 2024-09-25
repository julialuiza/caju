import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmationModalProps = {
  isLoading: boolean;
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { isLoading, isOpen, title, description, onConfirm, onClose } = props;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} name="Cancelar">
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} name="Confirmar">
            {isLoading ? "Atualizando..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
