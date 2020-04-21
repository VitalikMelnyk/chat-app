import { makeStyles } from "@material-ui/core";
import chatBackground from "../../assets/img/darkgreenBack.jpg";
export const useStyles = makeStyles((theme) => ({
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
  messagesBoxEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
  InfiniteScroll: {
    display: "flex",
    flexDirection: "column",
  },
  loader: {
    alignSelf: "center",
  },
}));
