import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@material-ui/core";
import { useStyles } from "./styles";

const Introduction = ({ handleNextStep }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.introBox}>
      <ButtonGroup>
        <Button variant="contained" color="primary" onClick={handleNextStep}>
          {t("Let's Start")}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Introduction;
