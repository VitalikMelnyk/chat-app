import React, { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { getFirstLetters, getDateOfMessage } from "../../../shared/functions";
import { Typography, Box, Avatar, CircularProgress } from "@material-ui/core";
import { useStyles } from "../styles";
const InfiniteScrollComponent = ({
  messages,
  getMoreMessages,
  hasMoreItems,
  userId,
  currentRoomId = 0,
  initialLoad,
}) => {
  const scrollRef = useRef(null);
  const classes = useStyles();
  console.log("currentRoomId :", currentRoomId);
  // You need to reset page in scroll component when you change the room
  useEffect(() => {
    console.log("Scroll", scrollRef);
    scrollRef.current.pageLoaded = 0;
  }, [currentRoomId]);
  return (
    <InfiniteScroll
      // What is the threshold?
      // threshold={250}
      ref={scrollRef}
      pageStart={0}
      isReverse={true}
      loadMore={getMoreMessages}
      hasMore={hasMoreItems}
      initialLoad={initialLoad}
      className={classes.InfiniteScroll}
      loader={
        <CircularProgress
          className={classes.loader}
          color="secondary"
          key={0}
        />
      }
      useWindow={false}
    >
      {messages &&
        messages.map(
          ({ message, date, user: { firstName, secondName, _id } }, index) => (
            <Box key={index}>
              <Box
                m={2}
                className={
                  userId === _id ? classes.leftMessages : classes.rightMessages
                }
              >
                <Box marginX={1.5}>
                  <Avatar>{getFirstLetters(firstName, secondName)}</Avatar>
                </Box>
                <Box className={classes.messagesInnerItem}>
                  <Typography variant="subtitle2" color="textPrimary">
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
                  <Typography variant="subtitle2" color="textSecondary">
                    {getDateOfMessage(date)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        )}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
