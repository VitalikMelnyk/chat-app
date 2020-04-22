import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
  },
  selectLanguage: {
    "& .MuiTypography-root.MuiFormControlLabel-label": {
      color: theme.palette.text.primary,
    },
  },
}));
