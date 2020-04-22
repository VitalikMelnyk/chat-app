import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";

const Congratulation = ({ handleResetStep }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/login");
      handleResetStep();
    }, 2000);
  }, [history, handleResetStep]);
  return (
    <div className={classes.congratulationBox}>
      <Typography component="h2" variant="h5" color="textPrimary">
        {t("Congratulations!")}
      </Typography>
    </div>
  );
};

export default Congratulation;
