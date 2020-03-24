import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  genderLabel: {
    "& .MuiFormLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.secondary.main
      }
    }
  },
  credentialFieldItem: {
    margin: "0 5px 0 10px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#787979",
        borderWidth: "2px"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
        borderWidth: "2px"
      }
    }
  },
  genderSelectItem: {
    margin: "10px"
  }
}));
