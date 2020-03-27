import { combineReducers } from "redux";
import RegistrationReducer from "../Registration/reducers";
import LoginReducer from "../Login/reducers";
import ThemeReducer from "../Theme/reducers";
import LocaleReducer from "../Locale/reducers";
import DashboardReducer from "../Dashboard/reducers";
export default combineReducers({
  RegistrationReducer,
  LoginReducer,
  ThemeReducer,
  LocaleReducer,
  DashboardReducer
});
