import { combineReducers } from "redux";
import { playListReducer } from "./PlaylistReducer";
const MainReducer = combineReducers({
  playlistdata: playListReducer,
});

export default MainReducer;
