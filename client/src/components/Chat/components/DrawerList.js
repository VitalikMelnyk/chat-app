import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/Folder";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  addRoom: {
    padding: "0 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const DrawerList = ({ rooms = [], setOpen, deleteRoom }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (event, index) => {
    console.log(index);
    setSelectedIndex(index);
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
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

        {rooms.map((room, index) => (
          <Box key={index}>
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
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
    </div>
  );
};

export default DrawerList;
