import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    background: theme.palette.background.default,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center"
  },
  signUpContainer: {},
  signUpHeader: {
    margin: "45px 0 30px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  signUpMain: {
    background: theme.palette.background.signupForm,
    borderRadius: "30px",
    boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)"
  },
  signUpTitle: {
    fontSize: "35px",
    fontWeight: "900"
  },
  signUpSubtitle: {},
  signUpFormBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: "10px",
    padding: "30px 10px 30px",
    borderRadius: "20px",
    // minHeight: "450px",
    "& .MuiButtonGroup-root": {
      justifyContent: "space-between"
    }
  },
  DetailsForm: {
    padding: "20px 0"
  },
  credentialFields: {
    display: "flex",
    justifyContent: "space-around",
    "& .MuiFormControl-root": {
      margin: "10px"
    }
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiFormControl-root": {
      margin: "10px 5px 20px"
    },
    "& .MuiFormGroup-root": {
      flexDirection: "row",
      justifyContent: "center"
    },
    "& .MuiFormLabel-root": {
      textAlign: "center",
      fontWeight: "700"
    }
  },

  switchThemeToggle: {
    "& .MuiTypography-root.MuiFormControlLabel-label": {
      color: theme.palette.text.primary
    }
  },
  selectLanguage: {
    "& .MuiTypography-root.MuiFormControlLabel-label": {
      color: theme.palette.text.primary
    }
  },
  btn: {
    "& .MuiButton-root": {
      marginRight: "15px"
    }
  },
  personalDetailsBtn: {
    display: "flex"
  },
  contactBtn: {
    display: "flex",
    justifyContent: "space-between"
  },
  contactBtnItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));
