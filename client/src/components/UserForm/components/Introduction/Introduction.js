import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";
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
