import React from "react";
import { CircularProgress } from "@material-ui/core";

const Spinner = ({ color, keyId, size = 40, className }) => {
  return (
    <CircularProgress
      className={className}
      color={color}
      key={keyId}
      size={size}
    />
  );
};

export default Spinner;
