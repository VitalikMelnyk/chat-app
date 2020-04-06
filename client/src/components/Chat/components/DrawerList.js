import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import InboxIcon from "@material-ui/icons/Inbox";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DrawerList = ({ rooms = [], setOpen, exitRoom }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (event, index) => {
    console.log(index);
    setSelectedIndex(index);
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="exit" onClick={() => exitRoom()}>
          <DeleteIcon />
        </Fab>
        {rooms.map((room, index) => (
          <Box key={index}>
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={room.name} />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </div>
  );
};

export default DrawerList;
