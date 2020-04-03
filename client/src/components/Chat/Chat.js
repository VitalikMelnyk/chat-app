import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
import io from "socket.io-client";
import { SERVER_URL } from "../../shared/constants";
import DrawerList from "./components/DrawerList";
import SendMessage from "./components/SendMessage";
const useStyles = makeStyles(theme => ({
  chatContainer: {
    minHeight: "90vh"
  },
  chat: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

const Chat = () => {
  const classes = useStyles();
  const { LoginReducer } = useSelector(state => state);
  const [socketIO, setSocketIO] = useState({});
  const { currentUserInfo } = LoginReducer;
  const { firstName, secondName, _id } = currentUserInfo;
  const [room, setRoom] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const onMessageSubmit = message => {
    socketIO.emit("room", {
      message,
      userName: `${firstName} ${secondName}`,
      id: _id,
      room
    });
  };
  const newUserJoined = (user, message) => {
    console.log(user);
    
    setJoinedUsers(prevUsers => [...prevUsers, { user, message }]);
  };

  const newMessageArrive = ({ firstName, secondName }, newMessage) => {
    const messageInfo = {
      userName: `${firstName} ${secondName}`,
      message: newMessage
    };
    setMessages(prevMessages => [...prevMessages, messageInfo]);
  };

  useEffect(() => {
    const socket = io.connect(`${SERVER_URL}/`);
    setSocketIO(socket);
    socket.on("connect", () => {
      socket.on("receive message", ({ user, message }) => {
        console.log(message);
        console.log(user);
        newMessageArrive(user, message);
        console.log(1314314134431, socket);
      });
      socket.on("user joined", ({ user, userJoined }) => {
        console.log(user);
        console.log(userJoined);
        newUserJoined(user, userJoined);
      });
    });

    return () => {
      // socket.emit("leave room", ({ user, userLeave }) => {
      //   console.log(user);
      //   console.log(userLeave);
      //   newMessageArrive(user, userLeave);
      // });
    };
  }, []);
  console.log("Chat", messages);
  console.log("Set", joinedUsers);
  return (
    <Grid container justify="space-around" className={classes.chatContainer}>
      <Grid item xs={2} className="">
        <DrawerList joinedUsers={joinedUsers} />
      </Grid>
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
              <Box key={index} m={2}>
                <Typography variant="h6" color="textPrimary">
                  {message.userName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {message.message}
                </Typography>
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
