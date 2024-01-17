import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { ModalProps } from "../../utils/types/props";
import LoadingButton from "@mui/lab/LoadingButton";

export const Modal: React.FC<ModalProps> = ({
  open,
  children,
  title,
  isDeleting,
  handleClose,
  deleteAction,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton autoFocus loading={isDeleting} onClick={deleteAction}>
          {title}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
