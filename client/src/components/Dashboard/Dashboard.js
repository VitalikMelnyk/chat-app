import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Grid, Container, Typography, Box } from "@material-ui/core";
import { useStyles } from "./styles";
import { getAllUsers } from "../../store/Dashboard/actions";

const Dashboard = ({ getAllUsers }) => {
  const classes = useStyles();
  const { DashboardReducer } = useSelector(state => state);
  const { users } = DashboardReducer;
  useEffect(() => {
    const getUsers = async () => {
      await getAllUsers();
    };
    getUsers();
  }, [getAllUsers]);

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
// How to used useDispatch hook in redux-thunk?
const mapDispatch = { getAllUsers };

export default connect(null, mapDispatch)(Dashboard);
