import { GET_TRAINS, POST_TRAINS, CLOSE_MODAL } from "../constants";

export type TTrain = {
  description: string;
  name: string;
  speedLimits: [{ name: string; speedLimit: number }];
};

export type TTrainsState = {
  trains: TTrain[] | null;
  modalOpen: boolean;
};

export const initialState: TTrainsState = {
  trains: null,
  modalOpen: true,
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

    // По идее сюда должен уже приходить ответ от сервера
    case POST_TRAINS: {
      return {
        ...state,
        modalOpen: false,
        trains: action.payload,
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
