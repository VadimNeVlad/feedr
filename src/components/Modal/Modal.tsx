import { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  /** Locks the dialog while the confirmed action runs. */
  isPending?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Modal = ({
  open,
  title,
  children,
  isPending,
  onClose,
  onConfirm,
}: ModalProps) => (
  <Dialog
    open={open}
    onClose={isPending ? undefined : onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <DialogTitle id="modal-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="modal-description">{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button disabled={isPending} onClick={onClose}>
        Cancel
      </Button>
      <Button color="error" disabled={isPending} onClick={onConfirm}>
        {title}
      </Button>
    </DialogActions>
  </Dialog>
);
