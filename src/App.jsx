import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoutesJson } from "./routes/routes";
const Navbar = React.lazy(() => import("./components/Navbar"));


function App() {
  // const Results = useSelector((state) => state.playlistdata.results);
  return (
    <BrowserRouter>
      <Navbar name="Nova" />
      <Routes>
        {RoutesJson.map((items) => {
          return (
            <Route
              path={items.path}
              key={items.path}
              element={
                <React.Suspense fallback={<>...</>}>
                  {items.element}
                </React.Suspense>
              }
            ></Route>
          );
        })}
      </Routes>
     
    </BrowserRouter>
  );
}
export default App;
