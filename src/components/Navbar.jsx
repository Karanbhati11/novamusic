import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ name, pname }) => {
  let navigate = useNavigate();

  const navigationLinks = ["Home", "Playlist", "Export", "Login", "Signup"];
  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span
            className="navbar-brand mb-0 h1"
            style={{ color: "wheat", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            {name}
          </span>
          <span
            className="navbar-brand mb-0 h1"
            style={{ color: "white", cursor: "pointer" }}
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
              {navigationLinks.map((items) => {
                return (
                  <div>
                    <Link className="dropdown-item" to={`/${items}`}>
                      {items}
                    </Link>
                    <div className="dropdown-divider"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
