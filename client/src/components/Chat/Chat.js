import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";
import { Paper, Grid, Typography, Box, Container } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { getMessages } from "../../api/services/messages";
import { getAllRooms, createRoom, removeRoom } from "../../store/Chat/actions";
import InfiniteScrollComponent from "./components/InfiniteScrollComponent";
import RoomList from "./components/RoomList";
import SendMessage from "./components/SendMessage";
import CreateRoom from "./components/CreateRoom";
import Spinner from "../GeneralComponents/Spinner";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
import { SERVER_URL } from "../../shared/constants";
import { useStyles } from "./styles";

const Chat = () => {
  const classes = useStyles();
  const { t } = useTranslation();
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
  //------------------ For Pagination
  const [limitPagination] = useState(10);
  const [countMessages, setCountMessages] = useState(0);
  const [pageStart] = useState(0);
  const scrollToBottom = useRef(null);
  const [initialLoad] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  // ----------------
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [toggleDrawer] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const socket = useRef(io.connect(`${SERVER_URL}/`));
  // Functions
  // When you click on room automatically scroll to bottom of room
  const scrollToBottomFunction = (isSmoothly) => {
    // console.log("scrollToBottom :", scrollToBottom);
    if (isSmoothly) {
      scrollToBottom.current.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      scrollToBottom.current.scrollIntoView(false);
    }
  };

  const setSelectedRoom = async (index, room) => {
    const page = 0;
    if (index === selectedRoomIndex || room._id === currentRoom._id) {
      setTimeout(() => {
        scrollToBottomFunction(true);
      }, 500);
    } else {
      setSpinner(true);
      setSelectedRoomIndex(index);
      setCurrentRoom(room);
      try {
        const responseMesssages = await getMessages(
          room._id,
          limitPagination,
          page
        );
        // console.log("Response: ", responseMesssages);
        // It's necessary to reverse array from backend
        // in order to set messages from end to start
        setMessages([...responseMesssages.data.messages.reverse()]);
        setCountMessages(responseMesssages.data.count);
        setHasMoreItems(responseMesssages.data.count > limitPagination);
        setSpinner(false);
        scrollToBottomFunction(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMoreMessages = async (page) => {
    const pages = Math.floor(countMessages / limitPagination);
    // console.log("Page", page);
    // console.log("Pages", pages);
    if (page > pages) {
      setHasMoreItems(false);
    } else {
      const responseMoreMesssages = await getMessages(
        currentRoom._id,
        limitPagination,
        page
      );
      // console.log("responseMoreMesssages :", responseMoreMesssages);
      // It's necessary to reverse array from backend
      // in order to set messages from end to start
      setMessages([
        ...responseMoreMesssages.data.messages.reverse(),
        ...messages,
      ]);
      setCountMessages(responseMoreMesssages.data.count);
      setHasMoreItems(
        responseMoreMesssages.data.count > pages * limitPagination
      );
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
    const date = new Date().toJSON();
    const messageObject = {
      date,
      message,
      room: currentRoom._id,
      user: {
        _id: userId,
        firstName,
        secondName,
      },
    };
    console.log("messageObject", messageObject);
    setMessages((prevMessages) => [...prevMessages, messageObject]);
    socketIO.emit("new message", {
      message,
      userId,
      roomId: currentRoom._id,
      roomName: currentRoom.name,
      date,
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
    const getRooms = async () => {
      dispatch(getAllRooms());
    };
    getRooms();
  }, [dispatch]);

  useEffect(() => {
    // const socket = io.connect(`${SERVER_URL}/`);

    setSocketIO(socket.current);

    socket.current.on("receive message", ({ lastMessage }) => {
      const parseLastMessgeDate = Date.parse(lastMessage.date);
      setMessages((prevMessages) => {
        const isExistingMessage = prevMessages.some(
          (currentMessage) =>
            Date.parse(currentMessage.date) === parseLastMessgeDate
        );
        if (isExistingMessage) {
          const updateMessages = prevMessages.map((currentMessage) =>
            Date.parse(currentMessage.date) === parseLastMessgeDate
              ? lastMessage
              : currentMessage
          );
          return [...updateMessages];
        } else {
          return [...prevMessages, lastMessage];
        }
      });
      scrollToBottomFunction(true);
    });
    return () => {};
  }, []);

  useEffect(() => {
    socket.current.on("user typing", ({ userName }) => {
      setTypingUserName(userName);
    });
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
                      {t("Select a contact to start a conversation")}!
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
                  {messages.length ? (
                    spinner ? (
                      <Spinner
                        color="secondary"
                        keyId={userId}
                        className={classes.loader}
                      />
                    ) : (
                      <Grid item className={classes.messagesInner}>
                        <InfiniteScrollComponent
                          pageStart={pageStart}
                          initialLoad={initialLoad}
                          currentRoomId={currentRoom._id}
                          messages={messages}
                          getMoreMessages={getMoreMessages}
                          hasMoreItems={hasMoreItems}
                          userId={userId}
                        />
                        {/* Dumpy Box for scrollToBottomRef */}
                        <Box ref={scrollToBottom}></Box>
                      </Grid>
                    )
                  ) : (
                    <Grid item className={classes.messagesBoxEmpty}>
                      <Box>
                        <ChatIcon
                          style={{ fontSize: "100px" }}
                          color="secondary"
                        />
                        <Typography variant="h5" component="h2">
                          {t("There aren't any messages")}!
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  <Grid item className={classes.messagesBtn}>
                    <SendMessage
                      userTyping={userTyping}
                      onMessageSubmit={onMessageSubmit}
                    />
                    {typingUserName && `${typingUserName} ${t("is typing")}...`}
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
          text={t(isAddRoom.message)}
        />
      )}
      {isRemoveRoom && (
        <SnackBarMessage
          duration={2500}
          severity={isRemoveRoom.severity}
          open={isRemoveRoom.toggleOpen}
          handleClose={() => setIsRemoveRoom({ toggleOpen: false })}
          text={t(isRemoveRoom.message)}
        />
      )}
    </>
  );
};

export default Chat;
