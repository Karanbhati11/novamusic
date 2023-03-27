import React from "react";
import SearchComponent from "./components/SearchComponent";
import Navbar from "./components/Navbar";
import "./App.css";
import PlaylistComponent from "./components/PlaylistComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Export from "./components/Export";
// import { useSelector } from "react-redux";
import PlaylistDetails from "./components/PlaylistDetails";
// import YoutubeApiSearch from "./components/YoutubeApiSearch";

function App() {
  // const Results = useSelector((state) => state.playlistdata.results);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchComponent />}></Route>
        <Route path={`/playlist/:playlist`} element={<PlaylistDetails />} />
        <Route path="/playlist" element={<PlaylistComponent />} />
        <Route path="/Export" element={<Export />} />
        {/* <Route path="/test" element={<YoutubeApiSearch />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
