import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import FormControlSwitch from "../GeneralComponents/SwitchThemeToggle";
import { SelectLanguage } from "../GeneralComponents/SelectLanguage";
import { setThemeType } from "../../store/Theme/actions";
import { useStyles } from "./styles";
import { setAuthToken } from "../../shared/functions";
import { setIsAuthenticated } from "../../store/Login/actions";
import ProfileDialog from "./components/ProfileDialog";

const NavigationPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const [isProfileDialog, setIsProfileDialog] = useState(false);
  const { ThemeReducer, LoginReducer } = useSelector(state => state);
  const { themeType, checkedSwitch } = ThemeReducer;
  const { isAuthenticated, currentUserInfo } = LoginReducer;
  const toggleTheme = () => {
    const newThemeType = themeType === "light" ? "dark" : "light";
    dispatch(setThemeType({ newThemeType, checkedSwitch }));
  };
  const openProfileDialog = () => {
    setIsProfileDialog(true);
  };
  const closeProfileDialog = () => {
    setIsProfileDialog(false);
  };
  const logoutUser = () => {
    setAuthToken(false);
    dispatch(setIsAuthenticated(false));
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
          {isAuthenticated && (
            <Button
              color="secondary"
              component={RouterLink}
              to="/dashboard"
              activeClassName={classes.active}
            >
              {t("Dashboard")}
            </Button>
          )}

          {isAuthenticated ? (
            <>
              <Button
                // activeClassName={classes.active}
                color="secondary"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Open Account
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Button color="secondary" onClick={openProfileDialog}>
                    Profile
                  </Button>
                  {isProfileDialog && (
                    <ProfileDialog
                      currentUserInfo={currentUserInfo}
                      open={isProfileDialog}
                      handleClose={closeProfileDialog}
                    />
                  )}
                </MenuItem>
                <MenuItem>
                  <Button
                    color="secondary"
                    component={RouterLink}
                    to="/"
                    // activeClassName={classes.active}
                    onClick={logoutUser}
                  >
                    {t("Log Out")}
                  </Button>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationPanel;