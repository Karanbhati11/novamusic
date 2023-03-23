import { ActionTypes } from "../constants/action_types";
export const resultPlaylist = (results) => {
  return {
    type: ActionTypes.PLAYLISTDETAILS,
    payload: results,
  };
};
