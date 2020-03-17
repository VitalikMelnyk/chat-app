import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { useStyles } from "./styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const NavigationPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logo
          </Typography>
          
          <Button
            color="secondary"
            component={RouterLink}
            to="/home"
            activeClassName={classes.active}
          >
            Home
          </Button>
          <Button
            color="secondary"
            component={RouterLink}
            to="/register"
            activeClassName={classes.active}
          >
            Register
          </Button>
          <Button
            color="secondary"
            component={RouterLink}
            to="/login"
            activeClassName={classes.active}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationPanel;
