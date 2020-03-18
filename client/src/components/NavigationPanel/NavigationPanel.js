import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import FormControlSwitch from "../GeneralComponents/SwitchThemeToggle";
import { SelectLanguage } from "../GeneralComponents/SelectLanguage";
import { setThemeType } from "../../store/Theme/actions";
import { useStyles } from "./styles";

const NavigationPanel = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { ThemeReducer } = useSelector(state => state);
  const { themeType, checkedSwitch } = ThemeReducer;
  const dispatch = useDispatch();
  const toggleTheme = () => {
    const newThemeType = themeType === "light" ? "dark" : "light";
    dispatch(setThemeType({ newThemeType, checkedSwitch }));
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="secondary" className={classes.title}>
            ChatApp
          </Typography>
          <SelectLanguage name="language" />
          <FormControlSwitch
            checkedSwitch={checkedSwitch}
            toggleTheme={toggleTheme}
            className={classes.switchThemeToggle}
            label={t("Switch Theme")}
          />
          <Button
            color="secondary"
            component={RouterLink}
            to="/home"
            activeClassName={classes.active}
          >
            {t("Home")}
          </Button>
          <Button
            color="secondary"
            component={RouterLink}
            to="/register"
            activeClassName={classes.active}
          >
            {t("Sign Up")}
          </Button>
          <Button
            color="secondary"
            component={RouterLink}
            to="/login"
            activeClassName={classes.active}
          >
            {t("Sign In")}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationPanel;
