import { combineReducers } from "redux";
import { RegistrationReducer } from "../Registration/reducers";
import { ContactDetailsReducer } from "../Registration/ContactDetails/reducers";
import { PersonalDetailsReducer } from "../Registration/PersonalDetails/reducers";
import { PaymentDetailsReducer } from "../Registration/PaymentDetails/reducers";
import { ThemeReducer } from "../Theme/reducers";
import { LocaleReducer } from "../Locale/reducers";
export default combineReducers({
  RegistrationReducer,
  ThemeReducer,
  LocaleReducer,
  PersonalDetailsReducer,
  ContactDetailsReducer,
  PaymentDetailsReducer
});
