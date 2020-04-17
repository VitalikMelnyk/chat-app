import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { getMessages } from "../../api/services/messages";
import { getAllRooms, createRoom, removeRoom } from "../../store/Chat/actions";
import { Paper, Grid, Typography, Box, Container } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import InfiniteScrollComponent from "./components/InfiniteScrollComponent";
import RoomList from "./components/RoomList";
import SendMessage from "./components/SendMessage";
import CreateRoom from "./components/CreateRoom";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
import { SERVER_URL } from "../../shared/constants";
import { useStyles } from "./styles";

const Chat = () => {
  const classes = useStyles();
  // Redux
  const { LoginReducer, ChatReducer } = useSelector((state) => state);
  const { currentUserInfo } = LoginReducer;
  const { firstName, secondName, _id: userId } = currentUserInfo;
  const { rooms } = ChatReducer;
  const dispatch = useDispatch();
  // Local State
  const [socketIO, setSocketIO] = useState({});
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
  const [currentRoom, setCurrentRoom] = useState({});
  const { name: roomName = "Name" } = currentRoom;
  const [messages, setMessages] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [typingUserName, setTypingUserName] = useState("");
  const [limitPagination] = useState(10);
  const [countMessages, setCountMessages] = useState(0);
  // Boolean
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [toggleDrawer] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  // Functions

  const setSelectedRoom = async (index, room) => {
    setSelectedRoomIndex(index);
    setCurrentRoom(room);
  };

  const getMoreMessages = async (page) => {
    const pages = Math.floor(countMessages / limitPagination);
    if (page - 1 > pages) {
      setHasMoreItems(false);
    } else {
      const responseMoreMesssages = await getMessages(
        currentRoom._id,
        limitPagination,
        page - 1
      );
      // It's necessary to reverse array from backend
      // in order to set messages from end to start
      setMessages([
        ...responseMoreMesssages.data.messages.reverse(),
        ...messages,
      ]);
      setCountMessages(responseMoreMesssages.data.count);
    }
  };

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
  // Effect

  useEffect(() => {
    const getRooms = async () => {
      dispatch(getAllRooms());
    };
    getRooms();
  }, [dispatch]);

  useEffect(() => {
    const socket = io.connect(`${SERVER_URL}/`);
    setSocketIO(socket);
    socket.on("receive message", ({ lastMessage }) => {
      setMessages((prevMessages) => [...prevMessages, lastMessage]);
    });
    socket.on("user typing", ({ userName }) => {
      setTypingUserName(userName);
    });
    return () => {};
  }, []);

  return (
    <>
      <Container maxWidth="xl" className={classes.chatContainer}>
        <Paper className={classes.chat} elevation={7}>
          <Grid container className={classes.chatInner}>
            <Grid item xs={3} className={classes.drawerList}>
              <RoomList
                selectedRoomIndex={selectedRoomIndex}
                setSelectedRoom={setSelectedRoom}
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
                    <InfiniteScrollComponent
                      messages={messages}
                      getMoreMessages={getMoreMessages}
                      hasMoreItems={hasMoreItems}
                      userId={userId}
                    />
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
