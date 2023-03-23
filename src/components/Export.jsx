import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Export = () => {
  const [importtext, setImportText] = useState("");

  const ExportFunction = (e) => {
    if (localStorage.getItem("Playlists") === null) {
      toast.error("no playlists");
    } else {
      navigator.clipboard.writeText(
        localStorage.getItem("Playlists").toString()
      );
      toast("Copied!");
    }
  };
  const ImportFunction = (e) => {
    if (importtext === "") {
      toast.error("Plz Enter Code");
    } else if (
      !importtext.includes("{") ||
      !importtext.includes(":") ||
      !importtext.includes("[")
    ) {
      toast.error("Wrong code");
    } else {
      localStorage.setItem("Playlists", importtext);
      setImportText("");
      toast.success("IMPORTED !");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className="container"
        style={{ background: "cream ", height: "100vh", width: "100vw" }}
      >
        <div
          className="main"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "25px",
          }}
        >
          {/* <h3>EXPORT</h3> */}
          <button className="btn btn-dark" onClick={ExportFunction}>
            EXPORT
          </button>
          <h3>or</h3>
          <button className="btn btn-dark" onClick={ImportFunction}>
            Import
          </button>
          <textarea
            className="form-control"
            placeholder="Code goes here..."
            style={{
              marginTop: "15px",
              width: "500px",
              textAlign: "center",
              backgroundColor: "wheat",
            }}
            value={importtext}
            type="text"
            onChange={(e) => setImportText(e.target.value)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Export;
