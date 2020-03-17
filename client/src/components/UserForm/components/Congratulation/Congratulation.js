import React from "react";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

const Congratulation = ({ handleResetAllForm }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.congratulationBox}>
      <Typography component="h2" variant="h5" color="textPrimary">
        {t("Congratulations!")}
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetAllForm}
        >
          {t("Reset Steps")}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Congratulation;
