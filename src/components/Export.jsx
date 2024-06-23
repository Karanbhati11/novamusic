import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AES, enc } from "crypto-js";
import Api from "./Api";
import "./Export.css";

const Export = () => {
  const [importtext, setImportText] = useState("");
  const secret = "test key";

  const ExportFunction = (e) => {
    const playlists = localStorage.getItem("Playlists");
    if (!playlists) {
      toast.error("No playlists");
    } else {
      const cipherText = AES.encrypt(playlists, secret).toString();
      navigator.clipboard.writeText(cipherText);
      toast("Copied!");
    }
  };

  const updateDatabase = async (playlists) => {
    try {
      const token = localStorage.getItem("token");
      await Api.post(
        "/save",
        {
          email: localStorage.getItem("email"),
          playlist: playlists,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Playlists updated in database");
    } catch (error) {
      console.error("Error updating playlists in database:", error);
      toast.error("Failed to update playlists in database");
    }
  };

  const ImportFunction = async (e) => {
    if (importtext === "") {
      toast.error("Please enter code");
    } else {
      let playlists;
      try {
        // Try to parse as JSON directly
        playlists = JSON.parse(importtext);
      } catch {
        try {
          // If JSON parsing fails, try to decrypt
          const bytes = AES.decrypt(importtext, secret);
          const decrypted = bytes.toString(enc.Utf8);
          playlists = JSON.parse(decrypted);
        } catch (err) {
          toast.error("Invalid code or decryption failed");
          return;
        }
      }

      localStorage.setItem("Playlists", JSON.stringify(playlists));
      setImportText("");
      toast.success("IMPORTED!");
      await updateDatabase(playlists);
    }
  };

  const ImportOneHandler = async (e) => {
    if (importtext === "") {
      toast.error("Please enter code");
    } else if (
      importtext.includes("{") ||
      importtext.includes(":") ||
      importtext.includes("[")
    ) {
      toast.error("Wrong code");
    } else {
      try {
        const bytes = AES.decrypt(importtext, secret);
        const decrypted = bytes.toString(enc.Utf8);
        const dataaa = JSON.parse(decrypted);
        const pname = Object.keys(dataaa)[0];
        const currentPlaylists =
          JSON.parse(localStorage.getItem("Playlists")) || {};
        currentPlaylists[pname] = dataaa[pname];
        localStorage.setItem("Playlists", JSON.stringify(currentPlaylists));
        toast.success("Imported one playlist!");
        await updateDatabase(currentPlaylists);
      } catch (err) {
        console.log("Unable to decipher", err);
        toast.error("Wrong data");
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container">
        <div className="main">
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
            value={importtext}
            type="text"
            onChange={(e) => setImportText(e.target.value)}
          />
          <button className="btn btn-dark" onClick={ImportOneHandler}>
            Import One
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Export;
