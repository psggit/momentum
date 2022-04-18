import React from "react";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  labelStyle: {
    fontSize: "13px !important",
    fontWeight: "400 !important",
    color: "#102453 !important",
  },
}));

function CustomInputLabel(props) {
  const classes = useStyles();

  const { id, style, classname, children } = props;

  const InputLabelProps = {
    id,
    style: { ...style },
  };

  return (
    <InputLabel
      {...InputLabelProps}
      variant="standard"
      className={clsx(classes.labelStyle, classname)}
    >
      {children}
    </InputLabel>
  );
}

CustomInputLabel.defaultProps = {
  style: {},
  id: "standard-label",
  className: "input-label",
};

CustomInputLabel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default CustomInputLabel;
