import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    background: theme.palette.background.default,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardItem: {
    minHeight: "100vh",
    background: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  homeDescription: {
    textAlign: "center",
    margin: "0 auto"
  },
  homeImage: {
    height: "auto"
  },
  homeBtn: {
    borderRadius: "30px",
    "& .MuiButton-label": {
      fontWeight: '700'
    }
  }
}));
