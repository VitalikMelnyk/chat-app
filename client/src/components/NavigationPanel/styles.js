import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    background: theme.palette.background.default,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  active: {
    color: "red"
  },
  switchThemeToggle: {
    "& .MuiTypography-root.MuiFormControlLabel-label": {
      color: theme.palette.text.hint
    }
  }
}));
