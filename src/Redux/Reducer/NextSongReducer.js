import { ActionTypes } from "../constants/action_types";
const initialstate = {
  results: "",
};

export const nextsongReducer = (
  state = initialstate.results,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.NEXTSONG:
      return { ...state, results: payload };
    default:
      return state;
  }
};
