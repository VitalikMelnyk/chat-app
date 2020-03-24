import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../shared/constants";
import { Grid, Container, Typography, Box } from "@material-ui/core";
import { useStyles } from "./styles";

const Dashboard = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  console.log(users);
  const getUsers = () => {
    axios
      .get(`${SERVER_URL}/dashboard`, {
        headers: {
          Authorization: `${Cookies.get("AccessToken")}`
        }
      })
      .then(res => {
        const users = res.data;
        setUsers(users);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box marginTop={10}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h4"
              className={classes.dashboardTitle}
            >
              List of registered users!
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          {users.map(user => (
            <Grid container item xs key={user._id}>
              <Typography component="p" variant="h6">
                {user.firstName} {user.secondName}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
