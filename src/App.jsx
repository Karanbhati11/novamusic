import React from "react";
// import SearchComponent from "./components/SearchComponent";
// import Navbar from "./components/Navbar";
import "./App.css";
// import PlaylistComponent from "./components/PlaylistComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Export from "./components/Export";
// import { useSelector } from "react-redux";
// import PlaylistDetails from "./components/PlaylistDetails";
// import Download from "./components/Download";
// import YoutubeApiSearch from "./components/YoutubeApiSearch";

const SearchComponent = React.lazy(() =>
  import("./components/SearchComponent")
);
const Navbar = React.lazy(() => import("./components/Navbar"));
const PlaylistComponent = React.lazy(() =>
  import("./components/PlaylistComponent")
);
const Export = React.lazy(() => import("./components/Export"));
const PlaylistDetails = React.lazy(() =>
  import("./components/PlaylistDetails")
);
const Download = React.lazy(() => import("./components/Download"));

function App() {
  // const Results = useSelector((state) => state.playlistdata.results);
  return (
    <BrowserRouter>
      <Navbar name="Nova" />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <SearchComponent />
            </React.Suspense>
          }
        ></Route>
        <Route
          path={`/playlist/:playlist`}
          element={
            <React.Suspense fallback={<>...</>}>
              <PlaylistDetails />
            </React.Suspense>
          }
        />
        <Route
          path="/playlist"
          element={
            <React.Suspense fallback={<>...</>}>
              <PlaylistComponent />
            </React.Suspense>
          }
        />
        <Route
          path="/Export"
          element={
            <React.Suspense fallback={<>...</>}>
              <Export />
            </React.Suspense>
          }
        />
        <Route
          path="/test"
          element={
            <React.Suspense fallback={<>...</>}>
              <Download />{" "}
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
