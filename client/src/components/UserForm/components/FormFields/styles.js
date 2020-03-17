import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  genderLabel: {
    "& .MuiFormLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.secondary.main
      }
    }
  }
}));
