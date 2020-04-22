import React from "react";
import { CircularProgress } from "@material-ui/core";

const Spinner = ({ color, key, size = 40, className }) => {
  return (
    <CircularProgress
      className={className}
      color={color}
      key={key}
      size={size}
    />
  );
};

export default Spinner;
