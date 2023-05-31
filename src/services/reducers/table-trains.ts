import { GET_TRAINS, POST_TRAINS, CLOSE_MODAL, SHOW_TRAIN } from "../constants";

export type TTrain = {
  description: string;
  name: string;
  speedLimits: [{ name: string; speedLimit: number }];
};

export type TTrainsState = {
  trains: TTrain[] | null;
  modalOpen: boolean;
  train: TTrain | null;
};

export const initialState: TTrainsState = {
  trains: null,
  modalOpen: true,
  train: null,
};

export const tableTrainsReducer = (
  state = initialState,
  action: any
): TTrainsState => {
  switch (action.type) {
    case GET_TRAINS: {
      return {
        ...state,
        trains: action.payload,
      };
    }

    case POST_TRAINS: {
      return {
        ...state,
        modalOpen: false,
        train: action.payload,
      };
    }

    case SHOW_TRAIN: {
      return {
        ...state,
        train: action.payload,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        modalOpen: true,
      };
    }

    default: {
      return state;
    }
  }
};
