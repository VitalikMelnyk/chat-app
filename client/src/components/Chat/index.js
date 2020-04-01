import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SERVER_URL } from "../../shared/constants";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  chatContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chat: {
    minHeight: "400px",
    minWidth: "550px",
    borderRadius: "30px"
  }
}));

const socket = io.connect(`${SERVER_URL}`);

const Chat = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("news", function(data) {
      console.log(data);
      socket.emit("my other event", { my: "data" });
    });
  }, []);

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
        <Paper className={classes.chat}>
          <TextField
            value={message}
            onChange={textChange}
            id="standard-basic"
            label="Standard"
          />
          <Button color="primary" onClick={onMessageSubmit}>
            Send
          </Button>
        </Paper>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Chat;
