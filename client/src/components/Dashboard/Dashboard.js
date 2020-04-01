import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Grid, Container, Typography, Box } from "@material-ui/core";
import { useStyles } from "./styles";
import { getAllUsers } from "../../store/Dashboard/actions";
import UsersTable from "./components/UsersTable";

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
        <UsersTable users={users} />
      </Container>
    </Box>
  );
};
// How to used useDispatch hook in redux-thunk?
const mapDispatch = { getAllUsers };

export default connect(null, mapDispatch)(Dashboard);
