import { ActionTypes } from "../constants/action_types";
const initialstate = {
  results: "",
};

export const playListReducer = (
  state = initialstate.results,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.PLAYLISTDETAILS:
      return { ...state, results: payload };
    default:
      return state;
  }
};
