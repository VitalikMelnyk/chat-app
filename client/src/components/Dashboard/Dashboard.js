import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box } from "@material-ui/core";
import { getAllUsers } from "../../store/Dashboard/actions";
import UsersTable from "./components/UsersTable";

const Dashboard = () => {
  const { DashboardReducer } = useSelector((state) => state);
  const { users } = DashboardReducer;
  const dispatch = useDispatch();

  // get all users from app
  useEffect(() => {
    const getUsers = async () => {
      dispatch(getAllUsers());
    };
    getUsers();
  }, [dispatch]);

  return (
    <Box marginTop={10}>
      <Container>
        <UsersTable users={users} />
      </Container>
    </Box>
  );
};

export default Dashboard;
