import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
import io from "socket.io-client";
import { SERVER_URL } from "../../shared/constants";
import DrawerList from "./components/DrawerList";
import SendMessage from "./components/SendMessage";
import CreateRoom from "./components/CreateRoom";
import { getAllRooms, createRoom, removeRoom } from "../../store/Chat/actions";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
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
  const { firstName, secondName, _id } = currentUserInfo;
  const dispatch = useDispatch();
  // Local State
  const [socketIO, setSocketIO] = useState({});
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [isRoom, setRoom] = useState({
    severity: null,
    toggleOpen: false,
    message: "",
  });

  useEffect(() => {
    const getRooms = async () => {
      dispatch(getAllRooms());
    };
    getRooms();
  }, [getAllRooms]);

  const addRoom = async (room) => {
    try {
      const responseAddRoomSuccess = await dispatch(createRoom(room));
      const { status, data } = responseAddRoomSuccess;
      if (status === 200) {
        setRoom({
          severity: "success",
          toggleOpen: true,
          message: data.message,
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setRoom({
          severity: "error",
          toggleOpen: true,
          message: error.response.data.message,
        });
      }
    }
  };

  const deleteRoom = async (roomId) => {
    const confirmed = window.confirm("Do you want to delete?");
    if (confirmed) {
      try {
        const responseRemoveRoomSuccess = await dispatch(removeRoom(roomId));
        const { status, data } = responseRemoveRoomSuccess;
        if (status === 200) {
          setRoom({
            severity: "success",
            toggleOpen: true,
            message: data.message,
          });
        }
      } catch (error) {
        if (error.response.status === 404) {
          setRoom({
            severity: "error",
            toggleOpen: true,
            message: error.response.data.message,
          });
        }
      }
    } else {
      alert("Okey!");
    }
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
            deleteRoom={deleteRoom}
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
        addRoom={addRoom}
        open={openRoomDialog}
        handleClose={() => setOpenRoomDialog(false)}
        setOpen={setOpenRoomDialog}
      />
      {isRoom && (
        <SnackBarMessage
          duration={6000}
          severity={isRoom.severity}
          open={isRoom.toggleOpen}
          handleClose={() => setRoom({ toggleOpen: false })}
          text={isRoom.message}
        />
      )}
    </>
  );
};

export default Chat;
