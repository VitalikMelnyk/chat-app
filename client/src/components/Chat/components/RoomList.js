import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Drawer,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/Folder";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  addRoom: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatslist: {
    maxHeight: "72vh",
    height: "100%",
    overflow: "auto",
  },
  drawer: {
    position: "static",
  },
}));

const RoomList = ({
  rooms = [],
  setOpen,
  deleteRoom,
  onJoinRoom,
  currentUserInfo,
  toggleDrawer,
  selectedRoomIndex,
  setSelectedRoomIndex,
}) => {
  const classes = useStyles();
  const onRoomListItemClick = (event, index, room) => {
    setSelectedRoomIndex(index);
    onJoinRoom(room, currentUserInfo);
  };
  return (
    <Drawer
      classes={{ root: classes.root, paper: classes.drawer }}
      variant="persistent"
      open={toggleDrawer}
    >
      <Box className={classes.addRoom}>
        <Typography variant="h5">List of Rooms</Typography>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>
      <List
        component="nav"
        aria-label="main mailbox folders"
        className={classes.chatslist}
      >
        {rooms.map((room, index) => (
          <Box key={index}>
            <ListItem
              button
              selected={selectedRoomIndex === index}
              onClick={(event) => onRoomListItemClick(event, index, room)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={room.name} />
              <Fab
                size="small"
                aria-label="exit"
                onClick={() => deleteRoom(room._id)}
              >
                <MoreVertIcon />
              </Fab>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default RoomList;
