import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import store from "../services/store";

import { Action, ActionCreator } from "redux";
import { TTrains } from "../services/actions/table-trains";

export type TAppActions = TTrains;

export type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, TRootState, Action, TAppActions>
>;

export type TAppDispatch = ThunkDispatch<TRootState, never, TAppActions>;
export type TRootState = ReturnType<typeof store.getState>;

export const useDispatch: () => TAppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
