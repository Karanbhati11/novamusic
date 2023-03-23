import React from "react";
import ReactAudioPlayer from "react-audio-player";

const MyPlayerPlaylist = ({
  // video_url,
  // id,
  meta,
  audiourl,
  // storageID,
  DeleteFunction,
}) => {
  return (
    <div className="playermain">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={meta.thumbnail}
          alt="Song Thumbnail"
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {meta.title}
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{ background: "#f1f3f4" }}>
            <ReactAudioPlayer
              style={{
                width: " 17.5rem",
                marginLeft: "-12.5px",
                outline: "none",
                backgroundColor: "#f1f3f4",
                color: "red",
              }}
              src={audiourl}
              autoPlay={false}
              controls
            />
          </li>
          <button
            className="list-group-item"
            style={{
              textAlign: "center",
              backgroundColor: "#010203",
              color: "red",
              fontStyle: "bold",
            }}
            onClick={(e) => {
              DeleteFunction(e);
            }}
          >
            DELETE
          </button>
        </ul>
      </div>
    </div>
  );
};

export default MyPlayerPlaylist;
