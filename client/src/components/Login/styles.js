import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    background: theme.palette.background.default,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center"
  },
  signInContainer: {},
  signInHeader: {
    margin: "45px 0 30px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  signInMain: {
    background: theme.palette.background.signupForm,
    maxWidth: "320px",
    width: "100%",
    minHeight: "350px",
    margin: "auto",

    borderRadius: "30px",
    boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
    display: "flex",
    justifyContent: "center"
  },
  signInTitle: {
    fontSize: "35px",
    fontWeight: "900"
  },
  LoginForm: {
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  credentialFields: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    "& .MuiFormControl-root": {
      margin: "10px"
    }
  },
  loginBtn: {
    display: "flex"
  }
}));
