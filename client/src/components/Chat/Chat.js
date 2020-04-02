import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
import socket from "../../utils/socket";
// import DrawerList from "./components/DrawerList";
import SendMessage from "./components/SendMessage";
const useStyles = makeStyles(theme => ({
  chatContainer: {
    minHeight: "90vh"
  },
  chat: {
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

const Chat = () => {
  const classes = useStyles();
  const { LoginReducer } = useSelector(state => state);
  const { currentUserInfo } = LoginReducer;
  const { firstName, secondName } = currentUserInfo;
  const [messages, setMessages] = useState([]);
  const onMessageSubmit = message => {
    socket.emit("send message", {
      message,
      userName: `${firstName} ${secondName}`
    });
  };

  const newMessageArrive = newMessage => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    socket.on("receive message", newMessage => {
      console.log(newMessage);
      newMessageArrive(newMessage);
    });
  }, []);
  console.log("Chat", messages);

  return (
    <Grid container justify="space-around" className={classes.chatContainer}>
      {/* <Grid item xs={2} className="">
        <DrawerList />
      </Grid> */}
      <Grid item xs={9} mb={2} className="">
        <Paper>
          <Grid item xs>
            <Box boxShadow={5} p={2} mb={2}>
              <Typography variant="h5" component="h2">
                {firstName} {secondName}
              </Typography>
            </Box>
          </Grid>
        </Paper>
        <Paper className={classes.chat}>
          <Grid item xs={12}>
            {messages.map((message, index) => (
              <Box key={index}>
                <Typography>{message}</Typography>
              </Box>
            ))}
          </Grid>
          <Divider />
          <Grid item xs>
            <SendMessage onMessageSubmit={onMessageSubmit} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
