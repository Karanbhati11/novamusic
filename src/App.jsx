import React from "react";
import SearchComponent from "./components/SearchComponent";
import Navbar from "./components/Navbar";
import "./App.css";
import PlaylistComponent from "./components/PlaylistComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Export from "./components/Export";
import { useSelector } from "react-redux";
import PlaylistDetails from "./components/PlaylistDetails";

function App() {
  const Results = useSelector((state) => state.playlistdata.results);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchComponent />}></Route>
        <Route
          path="/playlist/playlistdetails"
          element={<PlaylistDetails props={Results} />}
        />
        <Route path="/playlist" element={<PlaylistComponent />} />
        <Route path="/Export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
