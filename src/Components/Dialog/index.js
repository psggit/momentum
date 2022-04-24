import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "./../../Images/close.png";
import useDialogState from "./useDialogState";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        color: "#1C85E8",
        fontSize: "24px",
        fontWeight: 500,
        paddingLeft: "42px",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <img
          src={CloseIcon}
          alt="close"
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            cursor: "pointer",
          }}
          onClick={onClose}
        />
      ) : null}
    </DialogTitle>
  );
};

const DialogBox = React.memo((props) => {
  const { title, children, actions, styleObj, handleCloseDialog } = props;
  const [dialogRendered, dialogOpen, openDialog, closeDialog] = useDialogState({
    defaultOpen: true,
  });
  const classes = useStyles(props);

  const handleClose = () => {
    closeDialog();
    if (handleCloseDialog) {
      handleCloseDialog();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialogOpen}
      //className={classes.dialogPaper}
      classes={{ paper: classes.dialogPaper }}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <div className={classes.dialogStyle} style={{ ...styleObj }}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent
          className={classes.dialogContent}
          style={{ ...styleObj }}
        >
          {children}
          {actions ? actions.map((item) => item) : ""}
        </DialogContent>
      </div>
    </Dialog>
  );
});

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    margin: "0 !important",
  },
  dialogContent: {
    overflow: "scroll",
    padding: "0 42px 42px 42px !important",
    maxHeight: (props) =>
      `calc(${props.style?.maxHeight ? props.style?.maxHeight : 364}px - 70px)`,
    "@media (max-width: 900px)": {
      padding: "20px !important",
      maxHeight: "100vh !important",
    },
  },
  hideDialogFooter: {
    display: "none",
  },
  dialogFooter: {
    position: "relative",
    zIndex: "2",
    boxShadow: "0 -3px 6px 0 rgba(0, 0, 0, 0.16)",
    padding: "16px 32px 16px 32px",
  },
  dialogStyle: {
    minWidth: 320,
    maxHeight: 500,
    maxWidth: 672,
    overflow: "hidden",

    "@media (max-width: 900px)": {
      minWidth: 120,
      maxHeight: "100vh",
      maxWidth: "100vw",
    },
  },
}));

export default DialogBox;
