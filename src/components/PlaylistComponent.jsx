import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { AES, enc } from "crypto-js";
import "./PlaylistComponent.css";
import Api from "./Api";

const PlaylistComponent = () => {
  const [loader, setLoader] = useState(true);
  const [availablePlaylist, setAvailablePlaylist] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [importText, setImportText] = useState("");
  const [importFlag, setImportFlag] = useState(false);
  const secret = "test key";
  let navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token || !email) {
        const playlists = JSON.parse(localStorage.getItem("Playlists"));
        if (playlists && Object.keys(playlists).length > 0) {
          setAvailablePlaylist(true);
        } else {
          setAvailablePlaylist(false);
        }
        setLoader(false);
        return;
      }

      const response = await Api.get("/retrieve", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email },
      });

      const playlists = response.data.playlist;
      if (playlists) {
        localStorage.setItem("Playlists", JSON.stringify(playlists));
        setAvailablePlaylist(true);
      } else {
        setAvailablePlaylist(false);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      toast.error("Failed to fetch playlists");
    } finally {
      setLoader(false);
    }
  };

  const PlaylistClicker = (e) => {
    if (JSON.parse(localStorage.getItem("Playlists"))[e].length === 0) {
      toast.error("Playlist is empty");
    } else {
      navigate(`/playlist/${e}`);
    }
  };

  const ImportFunction = async (e) => {
    if (importText === "") {
      toast.error("Please enter code");
    } else {
      let playlists;
      try {
        playlists = JSON.parse(importText);
      } catch {
        try {
          const bytes = AES.decrypt(importText, secret);
          const decrypted = bytes.toString(enc.Utf8);
          playlists = JSON.parse(decrypted);
        } catch (err) {
          toast.error("Invalid code or decryption failed");
          return;
        }
      }

      localStorage.setItem("Playlists", JSON.stringify(playlists));
      setImportText("");
      toast.success("Imported!");
      setImportFlag(true);

      const token = localStorage.getItem("token");
      if (token) {
        try {
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
      }
    }
  };

  const DeletePlaylistData = async (items, e) => {
    e.preventDefault();
    const response = window.confirm("Are you sure you want to delete?");
    if (response) {
      const playlists = JSON.parse(localStorage.getItem("Playlists"));
      delete playlists[items];
      localStorage.setItem("Playlists", JSON.stringify(playlists));

      const token = localStorage.getItem("token");
      if (token) {
        try {
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
          toast.success("Playlist deleted and updated in database");
        } catch (error) {
          console.error("Error updating playlist in database:", error);
          toast.error("Failed to update playlist in database");
        }
      }

      setDeleteFlag(!deleteFlag);
    } else {
      toast.error("Not deleted");
    }
  };

  const SharePlaylistHandler = (e, Pname) => {
    e.preventDefault();
    const playlist = JSON.parse(localStorage.getItem("Playlists"));
    const cipherText = AES.encrypt(
      JSON.stringify({ [Pname]: playlist[Pname] }),
      secret
    );

    if (navigator.share) {
      navigator.clipboard.writeText(cipherText.toString());
      toast.success("Copied!");
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [importFlag, deleteFlag]);

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {loader && (
        <ScaleLoader
          color="#000000"
          loading={true}
          size={500}
          height={70}
          width={10}
          radius={20}
          style={{ marginTop: "20px" }}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {!availablePlaylist && !loader && (
        <div className="container">
          <div className="main">
            <h2>Nothing to show...</h2>
            <button className="btn btn-dark" onClick={ImportFunction}>
              Import
            </button>
            <textarea
              className="form-control textarea"
              placeholder="Code goes here..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
          </div>
        </div>
      )}

      {availablePlaylist && !loader && (
        <div className="playlist-container">
          {Object.keys(JSON.parse(localStorage.getItem("Playlists"))).map(
            (items) => (
              <div className="playlist-item" key={items}>
                <img
                  src={require("../assets/fading-blue-background_53876-88684.png")}
                  alt="Playlist"
                />
                <div className="playlist-details">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faShareFromSquare}
                      onClick={(e) => SharePlaylistHandler(e, items)}
                    />
                  </div>
                  <h5 className="playlist-title">{items}</h5>
                  <div className="buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => PlaylistClicker(items)}
                    >
                      Play
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={(e) => DeletePlaylistData(items, e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default PlaylistComponent;
