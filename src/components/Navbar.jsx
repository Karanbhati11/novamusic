import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ name ,pname}) => {
  let navigate = useNavigate();

  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span
            className="navbar-brand mb-0 h1"
            style={{ color: "wheat" ,cursor:"pointer"}}
            onClick={() => navigate("/")}
          >
            {name}
          </span>
          <span
            className="navbar-brand mb-0 h1"
            style={{ color: "white" ,cursor:"pointer"}}
            onClick={() => navigate("/")}
          >
            {pname}
          </span>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ marginRight: "20px" }}
            >
              OPTIONS
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/">
                Home
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/playlist">
                Playlist
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/Export">
                Export
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
