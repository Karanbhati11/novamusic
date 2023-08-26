import { combineReducers } from "redux";
import { playListReducer } from "./PlaylistReducer";
import { nextsongReducer } from "./NextSongReducer";
const MainReducer = combineReducers({
  playlistdata: playListReducer,
  nextsongdata: nextsongReducer,
});

export default MainReducer;
