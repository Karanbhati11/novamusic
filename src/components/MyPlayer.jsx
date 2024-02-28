import React, { useEffect, useState } from "react";
import "./myplayer.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Api from "./Api";

const MyPlayer = ({ video_url, id, meta, audiourl }) => {
  const [pname, setPname] = useState("");
  const [availableplaylist, setAvailablePlaylist] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const audio = document.getElementById("audio");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const ADDER = async (e) => {
    e.preventDefault();
    try {
      const playlistData = {
        name: pname,
        videos: [
          {
            id: Math.floor(Math.random() * Date.now()),
            video_url: video_url,
          },
        ],
      };
      const token = localStorage.getItem("token");
      const response = await Api.post("/save", playlistData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      toast.success("Playlist saved successfully");
    } catch (error) {
      console.error("Error saving playlist:", error);
      toast.error("Failed to save playlist");
    }
    setIsOpen(false);
  };

  const PlaylistClicker = async (playlistName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.post(
        "/save",
        {
          name: playlistName,
          videos: [{ id: Math.floor(Math.random() * Date.now()), video_url }],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      toast.success("Playlist updated successfully");
    } catch (error) {
      console.error("Error updating playlist:", error);
      toast.error("Failed to update playlist");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    setAvailablePlaylist(localStorage.getItem("Playlists") !== null);
  }, [openModal]);

  return (
    <div className="playermain">
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
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={meta.thumbnail} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{meta.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{ background: "#f1f3f4" }}>
            <audio
              id="audio"
              src={audiourl}
              download={`${meta.title}.mp3`}
              autoPlay={false}
              controls
            />
          </li>
          <button
            className="list-group-item"
            style={{
              textAlign: "center",
              backgroundColor: "#010203",
              color: "white",
              fontStyle: "bold",
            }}
            onClick={openModal}
          >
            ADD TO PLAYLIST
          </button>
        </ul>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <div className="container">
            <form
              className="row g-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CREATE NEW"
                  style={{ width: "500px" }}
                  onChange={(e) => setPname(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  className="btn btn-primary mb-3"
                  style={{ marginTop: "10px" }}
                  onClick={ADDER}
                >
                  ADD
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyPlayer;
