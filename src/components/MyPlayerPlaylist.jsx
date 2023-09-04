import React, { useState } from "react";
// import ReactAudioPlayer from "react-audio-player";
import {
  // faDownload,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { nextSong } from "../Redux/Actions/Action";
// import Api from "./Api";
import MediaSession from "@mebtte/react-media-session";

const MyPlayerPlaylist = ({
  // video_url,
  id,
  meta,
  audiourl,
  // storageID,
  DeleteFunction,
  index,
  autoPlay,
}) => {
  // const [test, settest] = useState("");
  const [loopColor, setColor] = useState("grey");
  const [loop, setLoop] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="playermain">
      <MediaSession
        title={meta.title}

        artwork={[
          {
            src: `${meta.thumbnail}`,
            sizes: "256x256,384x384,512x512",
            type: "image/jpeg",
          },
          {
            src: `${meta.thumbnail}`,
            sizes: "96x96,128x128,192x192",
            type: "image/jpeg",
          },
        ]}
        onPlay={audiourl.play}
        onPause={audiourl.pause}
        onSeekBackward={onSeekBackward}
        onSeekForward={onSeekForward}
        onPreviousTrack={playPreviousMusic}
        onNextTrack={()=>dispatch(nextSong(index + 1))}
      >
        children or null
      </MediaSession>

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
          <li
            className="list-group-item"
            style={{
              background: "#f1f3f4",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <audio
              style={{
                width: " 17.5rem",
                marginLeft: "-12.5px",
                outline: "none",
                backgroundColor: "#f1f3f4",
                color: "red",
              }}
              src={audiourl}
              autoPlay={autoPlay}
              controls
              // download={`${meta.title}.mp3`}
              title={`${meta.title}.mp3`}
              loop={loop}
              onEnded={() => dispatch(nextSong(index + 1))}
              controlsList="noplaybackrate"

              
            /> */}
            {/* <audio
              // download={`${meta.title}.mp3`}
              title={`${meta.title}.mp3`}
            /> */}
            <audio
              autoPlay={autoPlay}
              controls
              loop={loop}
              onEnded={() => dispatch(nextSong(index + 1))}
              controlsList="noplaybackrate"
              style={{
                width: " 17.5rem",
                marginLeft: "-12.5px",
                outline: "none",
                backgroundColor: "#f1f3f4",
                color: "red",
              }}
            >
              <source
                src={audiourl}
                type="audio/mp3"
                title={`${meta.title}.mp3`}
              />
            </audio>
            {/* <a
              href={test}
              download={`${meta.title}.mp3`}
              onClick={(e) => {
                // e.preventDefault();

                Api.get(`/download?url=${encodeURIComponent(audiourl)}`).then(
                  (res) => {
                    console.log(res.data);
                    const data = Uint8Array.from(res.data.data);
                    const content = new Blob([data.buffer]);
                    const encodedUri = URL.createObjectURL(content);
                    settest(encodedUri);
                  }
                );
              }}
            >
              <FontAwesomeIcon icon={faDownload} />
            </a> */}
            {/* <button onClick={()=>{console.log(audiourl)}}>
              <FontAwesomeIcon icon={faDownload} />
            </button> */}
            <FontAwesomeIcon
              icon={faRepeat}
              style={{
                marginLeft: "5px",
                color: `${loopColor}`,
                cursor: "pointer",
              }}
              onClick={() => {
                if (loopColor === "grey") {
                  setColor("blue");
                  setLoop(true);
                } else {
                  setColor("grey");
                  setLoop(false);
                }
              }}
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
