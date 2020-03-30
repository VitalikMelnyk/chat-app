import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SERVER_URL } from "../../shared/constants";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  chatContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const socket = io.connect(`${SERVER_URL}`);

const Chat = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  socket.on("news", function(data) {
    console.log(data);
    socket.emit("my other event", { my: "data" });
  });

  const textChange = event => {
    event.preventDefault();
    const newValue = event.target.value;
    // console.log(114141, newValue);
    setMessage(newValue);
  };
  const onMessageSubmit = event => {
    console.log(event);
    socket.emit("chat message", message);
  };

  return (
    <div className={classes.chatContainer}>
      <form action="">
        <TextField
          value={message}
          onChange={textChange}
          id="standard-basic"
          label="Standard"
        />
        <Button color="primary" onClick={onMessageSubmit}>
          Send
        </Button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Chat;
