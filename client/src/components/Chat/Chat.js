import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import RoomList from "./components/RoomList";
import SendMessage from "./components/SendMessage";
import CreateRoom from "./components/CreateRoom";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
import { SERVER_URL } from "../../shared/constants";
import chatBackground from "../../assets/img/darkgreenBack.jpg";
import {
  getAllRooms,
  createRoom,
  removeRoom,
  getCurrentRoom,
  updateRoomMessage,
} from "../../store/Chat/actions";
import { getFirstLetters, getDateOfMessage } from "../../shared/functions";
const useStyles = makeStyles((theme) => ({
  chatContainer: {
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  chatInner: {
    minHeight: "inherit",
  },
  chat: {
    minHeight: "80vh",
  },
  drawerList: {},
  messagesEmpty: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  messagesEmptyIcon: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: theme.palette.success.main,
  },
  messagesEmptyText: {
    textAlign: "center",
    fontSize: "20px",
    margin: "10px 0",
  },
  messages: {
    height: "100%",
    background: `url(${chatBackground}) center no-repeat`,
    backgroundSize: "cover",
  },
  messagesTitle: {
    padding: "15px 10px",
    background: theme.palette.primary.main,
  },
  messagesInner: {
    flexGrow: 1,
    maxHeight: "60vh",
    overflow: "auto",
  },
  messagesBtn: {
    padding: "0px 10px",
  },
  leftMessages: {
    textAlign: "left",
    display: "flex",
  },
  rightMessages: {
    textAlign: "right",
    display: "flex",
    flexDirection: "row-reverse",
  },
  messagesInnerItem: {
    flexGrow: 1,
  },
  messagesInnerItemMsg: {
    width: "fit-content",
    maxWidth: "100%",
    borderRadius: "20px",
    padding: "5px 15px",
    background: theme.palette.background.default,
    wordBreak: "break-all",
  },
  messagesInnerItemMsgLeft: {
    marginRight: "auto",
  },
  messagesInnerItemMsgRight: {
    marginLeft: "auto",
  },
}));

const Chat = () => {
  const classes = useStyles();
  // Redux
  const { LoginReducer, ChatReducer } = useSelector((state) => state);
  const { currentUserInfo } = LoginReducer;
  const { firstName, secondName, _id: userId } = currentUserInfo;
  const { rooms, currentRoom } = ChatReducer;
  const { name: roomName = "Chat Name", messages = [] } = currentRoom;
  const dispatch = useDispatch();
  // Local State
  const [socketIO, setSocketIO] = useState({});
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [isAddRoom, setIsAddRoom] = useState({
    duration: null,
    severity: null,
    toggleOpen: false,
    message: "",
  });
  const [isRemoveRoom, setIsRemoveRoom] = useState({
    duration: null,
    severity: null,
    toggleOpen: false,
    message: "",
  });
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [typingUserName, setTypingUserName] = useState("");
  useEffect(() => {
    const getRooms = async () => {
      dispatch(getAllRooms());
    };
    getRooms();
  }, [dispatch]);

  const addRoom = async (room) => {
    try {
      const responseAddRoomSuccess = await dispatch(createRoom(room));
      const { status, data } = responseAddRoomSuccess;
      if (status === 200) {
        setIsAddRoom({
          duration: 2000,
          severity: "success",
          toggleOpen: true,
          message: data.message,
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsAddRoom({
          duration: 2000,
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
          setIsRemoveRoom({
            duration: 3000,
            severity: "info",
            toggleOpen: true,
            message: data.message,
          });
        }
      } catch (error) {
        console.log(error);
        // if (error.response.status === 404) {
        //   setRoom({
        //     severity: "error",
        //     toggleOpen: true,
        //     message: error.response.data.message,
        //   });
        // }
      }
    } else {
      alert("Okey!");
    }
  };

  const onJoinRoom = (room, user) => {
    dispatch(getCurrentRoom(room._id));
    socketIO.emit("join room", { room, user });
  };

  const onMessageSubmit = (message) => {
    socketIO.emit("new message", {
      message,
      userId,
      roomId: currentRoom._id,
      roomName: currentRoom.name,
    });
  };

  let timeout;
  const userTyping = () => {
    socketIO.emit("typing", {
      firstName,
      secondName,
      roomName: currentRoom.name,
      isTyping: true,
    });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      socketIO.emit("typing", {
        firstName,
        secondName,
        roomName: currentRoom.name,
        isTyping: false,
      });
    }, 3000);
  };
  useEffect(() => {
    const socket = io.connect(`${SERVER_URL}/`);
    setSocketIO(socket);
    socket.on("receive message", ({ lastMessage }) => {
      console.log(lastMessage);
      dispatch(updateRoomMessage(lastMessage));
    });
    socket.on("user typing", ({ userName }) => {
      console.log("qqqqqqqqqqqqqqqqqqqqqqqqq", userName);
      setTypingUserName(userName);
    });
    return () => {};
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="xl" className={classes.chatContainer}>
        <Paper className={classes.chat} elevation={7}>
          <Grid container className={classes.chatInner}>
            <Grid item xs={3} className={classes.drawerList}>
              <RoomList
                selectedRoomIndex={selectedRoomIndex}
                setSelectedRoomIndex={setSelectedRoomIndex}
                toggleDrawer={toggleDrawer}
                rooms={rooms}
                deleteRoom={deleteRoom}
                setOpen={setOpenRoomDialog}
                onJoinRoom={onJoinRoom}
                currentUserInfo={currentUserInfo}
              />
            </Grid>
            <Grid item xs={9}>
              {selectedRoomIndex === null ? (
                <Box className={classes.messagesEmpty}>
                  <Box className={classes.messagesEmptyIcon}>
                    <ChatIcon style={{ fontSize: "100px" }} color="primary" />
                  </Box>
                  <Box className={classes.messagesEmptyText}>
                    <Typography variant="h5" component="h2">
                      Chat App
                    </Typography>
                    <Typography variant="h6">
                      Select a contact to start a conversation!
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  className={classes.messages}
                >
                  <Grid item className={classes.messagesTitle}>
                    <Box>
                      <Typography variant="h5" component="h2">
                        {roomName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item className={classes.messagesInner}>
                    {messages.map(
                      (
                        { message, date, user: { firstName, secondName, _id } },
                        index
                      ) => (
                        <Box key={index}>
                          <Box
                            m={2}
                            className={
                              userId === _id
                                ? classes.leftMessages
                                : classes.rightMessages
                            }
                          >
                            <Box marginX={1.5}>
                              <Avatar>
                                {getFirstLetters(firstName, secondName)}
                              </Avatar>
                            </Box>
                            <Box className={classes.messagesInnerItem}>
                              <Typography
                                variant="subtitle2"
                                color="textPrimary"
                              >
                                {firstName} {secondName}
                              </Typography>
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                className={`${classes.messagesInnerItemMsg} ${
                                  userId === _id
                                    ? classes.messagesInnerItemMsgLeft
                                    : classes.messagesInnerItemMsgRight
                                }`}
                              >
                                {message}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                              >
                                {getDateOfMessage(date)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )
                    )}
                  </Grid>
                  <Grid item className={classes.messagesBtn}>
                    <SendMessage
                      userTyping={userTyping}
                      onMessageSubmit={onMessageSubmit}
                    />
                    {typingUserName && `${typingUserName} is typing...`}
                  </Grid>
                </Grid>
              )}
              {/* <Button
                color="primary"
                onClick={() => setToggleDrawer(!toggleDrawer)}
              >
                ToggleOpen
              </Button> */}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <CreateRoom
        addRoom={addRoom}
        open={openRoomDialog}
        handleClose={() => setOpenRoomDialog(false)}
        setOpen={setOpenRoomDialog}
      />
      {isAddRoom && (
        <SnackBarMessage
          duration={2500}
          severity={isAddRoom.severity}
          open={isAddRoom.toggleOpen}
          handleClose={() => setIsAddRoom({ toggleOpen: false })}
          text={isAddRoom.message}
        />
      )}
      {isRemoveRoom && (
        <SnackBarMessage
          duration={2500}
          severity={isRemoveRoom.severity}
          open={isRemoveRoom.toggleOpen}
          handleClose={() => setIsRemoveRoom({ toggleOpen: false })}
          text={isRemoveRoom.message}
        />
      )}
    </>
  );
};

export default Chat;
