import { combineReducers } from "redux";
import appStateReducer from "./appState/reducer";
import userReducer from "./user/reducer";
import calculatorReducer from "./calculator/reducer";

export default combineReducers({
  appState: appStateReducer,
  user: userReducer,
  calculator: calculatorReducer,
});
