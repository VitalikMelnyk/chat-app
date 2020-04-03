import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const DrawerList = ({ joinedUsers }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { DashboardReducer } = useSelector(state => state);
  const { users } = DashboardReducer;
  const handleListItemClick = (event, index) => {
    console.log(index);
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {joinedUsers.map(({ user, message }, index) => (
          <Box key={index}>
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={event => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={user.firstName} secondary={message} />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </div>
  );
};

export default DrawerList;
