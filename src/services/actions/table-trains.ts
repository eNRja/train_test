import { getApiTrains, postApiTrains } from "../../api/api";
import { TAppDispatch } from "../../hooks/hooks";
import { CLOSE_MODAL, GET_TRAINS, POST_TRAINS, SHOW_TRAIN } from "../constants";
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

export interface IShowTrain {
  readonly type: typeof SHOW_TRAIN;
  readonly payload: TTrain;
}

export type TTrains = ITrains | IPostTrains | ICloseModal | IShowTrain;

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

export function postTrains(trainChangedSpeed: any) {
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

export const showTrain = (train: TTrain) => (dispatch: TAppDispatch) => {
  dispatch({
    type: SHOW_TRAIN,
    payload: train,
  });
};
