import { ActionTypes } from "../constants/action_types";
export const resultPlaylist = (results) => {
  return {
    type: ActionTypes.PLAYLISTDETAILS,
    payload: results,
  };
};
export const nextSong = (results) => {
  return {
    type: ActionTypes.NEXTSONG,
    payload: results,
  };
};
