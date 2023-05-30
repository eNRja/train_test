import { combineReducers } from "redux";
import { tableTrainsReducer } from "./table-trains";

export const rootReducer = combineReducers({
  tableTrains: tableTrainsReducer,
});
