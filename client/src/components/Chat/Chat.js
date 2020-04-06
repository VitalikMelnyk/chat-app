import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
import io from "socket.io-client";
import { SERVER_URL } from "../../shared/constants";
import DrawerList from "./components/DrawerList";
import SendMessage from "./components/SendMessage";
import CreateRoom from "./components/CreateRoom";
import { getAllRooms } from "../../store/Chat/actions";
const useStyles = makeStyles((theme) => ({
  chatContainer: {
    minHeight: "90vh",
  },
  chat: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const Chat = () => {
  const classes = useStyles();
  // Redux
  const { LoginReducer, ChatReducer } = useSelector((state) => state);
  const { currentUserInfo } = LoginReducer;
  const { rooms } = ChatReducer;
  const dispatch = useDispatch();
  const { firstName, secondName, _id } = currentUserInfo;
  // Local State
  const [socketIO, setSocketIO] = useState({});
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [messages, setMessages] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      dispatch(getAllRooms());
    };
    getRooms();
  }, [getAllRooms]);

  const sendRoomName = (room) => {
    socketIO.emit("add room", {
      id: _id,
      roomName: room,
    });
  };

  const exitRoom = () => {
    socketIO.emit("delete room", {
      id: _id,
    });
  };

  const onMessageSubmit = (message) => {
    socketIO.emit("send message", {
      message,
      userName: `${firstName} ${secondName}`,
      id: _id,
    });
  };

  useEffect(() => {
    const socket = io.connect(`${SERVER_URL}/`);
    setSocketIO(socket);
    socket.on("broadcast", ({ description }) => {
      alert(description);
    });
    return () => {};
  }, []);

  return (
    <>
      <Grid container justify="space-around" className={classes.chatContainer}>
        <Grid item xs={3} className="">
          <DrawerList
            rooms={rooms}
            exitRoom={exitRoom}
            setOpen={setOpenRoomDialog}
          />
        </Grid>
        <Grid item xs={6} mb={2} className="">
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
              {/* {messages.map((message, index) => (
                <Box key={index} m={2}>
                  <Typography variant="h6" color="textPrimary">
                    {message.userName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {message.message}
                  </Typography>
                </Box>
              ))} */}
            </Grid>
            <Divider />
            <Grid item xs>
              <SendMessage onMessageSubmit={onMessageSubmit} />
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid item xs={3} className="">
          <DrawerList joinedUsers={joinedUsers} />
        </Grid> */}
      </Grid>
      <CreateRoom
        sendRoomName={sendRoomName}
        open={openRoomDialog}
        handleClose={() => setOpenRoomDialog(false)}
        setOpen={setOpenRoomDialog}
      />
    </>
  );
};

export default Chat;
