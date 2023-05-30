import { getApiTrains, postApiTrains } from "../../api/api";
import { TAppDispatch } from "../../hooks/hooks";
import { CLOSE_MODAL, GET_TRAINS, POST_TRAINS } from "../constants";
import { TTrain } from "../reducers/table-trains";

export interface ITrains {
  readonly type: typeof GET_TRAINS;
  readonly payload: any;
}

export interface IPostTrains {
  readonly type: typeof POST_TRAINS;
  readonly payload: TTrain[];
}

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
}

export type TTrains = ITrains | IPostTrains | ICloseModal;

export function getTrains() {
  return function (dispatch: TAppDispatch) {
    getApiTrains()
      .then((result) => {
        dispatch({
          type: GET_TRAINS,
          payload: result,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function postTrains(trainChangedSpeed: TTrain[]) {
  return function (dispatch: TAppDispatch) {
    postApiTrains(trainChangedSpeed)
      .then((result) => {
        if (result) {
          dispatch({
            type: POST_TRAINS,
            payload: trainChangedSpeed,
          });
        }
      })
      .catch((err) => console.log(err));
  };
}

export const closeModal = () => (dispatch: TAppDispatch) => {
  dispatch({ type: CLOSE_MODAL });
};
