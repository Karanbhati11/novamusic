"use client";
import React, { useEffect, useState } from "react";
import "./myplayer.css";
import ReactAudioPlayer from "react-audio-player";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "./Api";
const MyPlayer = ({ video_url, id, meta, audiourl }) => {
  Modal.setAppElement("#root");
  const [pname, setPname] = useState("");
  const [availableplaylist, setAvailablePlaylist] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const url = "/save";
  const token = localStorage.token;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const ADDER = async (e) => {
    e.preventDefault();

    const a = JSON.parse(localStorage.getItem("Playlists"));
    if (a !== null) {
      if (
        Object.keys(JSON.parse(localStorage.getItem("Playlists"))).includes(
          pname
        )
      ) {
        toast.error("playlist with same name exists");
      } else {
        //playlist not created
        localStorage.setItem(
          "Playlists",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("Playlists")),
            [pname]: [
              {
                id: Math.floor(Math.random() * Date.now()),
                VideoID: video_url,
              },
            ],
          })
        );

        await Api.post(
          url,
          {
            email: localStorage.email,
            playlist: JSON.parse(localStorage.Playlists),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("ADDED");
      }
    } else {
      //for first time when there is no playlist
      localStorage.setItem(
        "Playlists",
        JSON.stringify({
          [pname]: [
            {
              id: Math.floor(Math.random() * Date.now()),
              VideoID: video_url,
            },
          ],
        })
      );
      toast.success("ADDED");
    }
    await Api.post(
      url,
      {
        email: localStorage.email,
        playlist: JSON.parse(localStorage.Playlists),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setIsOpen(false);
  };

  const PlaylistClicker = async (e) => {
    //shows already created playlists
    const a = JSON.parse(localStorage.getItem("Playlists"));

    const aaa = JSON.parse(localStorage.getItem("Playlists"))[e].map(
      // eslint-disable-next-line array-callback-return
      (items) => {
        if (items.VideoID === video_url) {
          return items.VideoID === video_url;
        }
      }
    );

    if (
      Object.keys(JSON.parse(localStorage.getItem("Playlists"))).includes(e)
    ) {
      if (aaa.filter((e) => e).length !== 0) {
        toast.error("Already Added");
      } else {
        localStorage.setItem(
          "Playlists",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("Playlists")),
            [e]: [
              ...a[e],
              {
                id: Math.floor(Math.random() * Date.now()),
                VideoID: video_url,
              },
            ],
          })
        );
        toast.success("ADDED");
        await Api.post(
          url,
          {
            email: localStorage.email,
            playlist: JSON.parse(localStorage.Playlists),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } else {
      localStorage.setItem(
        "Playlists",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("Playlists")),
          [e]: [
            {
              id: Math.floor(Math.random() * Date.now()),
              VideoID: video_url,
            },
          ],
        })
      );
      toast.success("ADDED");
      await Api.post(
        url,
        {
          email: localStorage.email,
          playlist: JSON.parse(localStorage.Playlists),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Playlists")) === null) {
      setAvailablePlaylist(false);
    } else {
      setAvailablePlaylist(true);
    }
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
        <img className="card-img-top" src={meta.thumbnail} alt="Card  cap" />
        <div className="card-body">
          <h5 className="card-title">{meta.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{ background: "#f1f3f4" }}>
            <ReactAudioPlayer
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
                  onClick={(e) => ADDER(e)}
                >
                  ADD
                </button>
              </div>
            </form>
            {availableplaylist &&
              Object.keys(JSON.parse(localStorage.getItem("Playlists"))).map(
                (items) => {
                  return (
                    <button
                      className="btn btn-dark"
                      style={{ margin: "20px" }}
                      key={Math.random()}
                      onClick={() => PlaylistClicker(items)}
                    >
                      {items}
                    </button>
                  );
                }
              )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyPlayer;
