import { combineReducers } from "redux";
import { RegistrationReducer } from "../Registration/reducers";
import { ThemeReducer } from "../Theme/reducers";
import { LocaleReducer } from "../Locale/reducers";
export default combineReducers({
  RegistrationReducer,
  ThemeReducer,
  LocaleReducer,
});
