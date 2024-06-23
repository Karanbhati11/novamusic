import React, { useEffect, useState, useRef } from "react";
import MyPlayerPlaylist from "./MyPlayerPlaylist";
import Api from "./Api";
import { useNavigate } from "react-router";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "./PlaylistDetails.css";

const PlaylistDetails = () => {
  const mainURL = "/player?url=";
  const [PlaylistData, setPlaylistData] = useState([]);
  const Idarray = [];
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [Dragable, setDragable] = useState(false);
  const navigate = useNavigate();
  const { playlist } = useParams();
  const Results = useSelector((state) => state.nextsongdata.results);

  const Initialiazation = async () => {
    if (playlist === undefined) {
      setError(true);
    } else {
      const a = JSON.parse(localStorage.getItem("Playlists"));
      const hey = await a[playlist]?.map(async (items) => {
        if (!Idarray.includes(items.id)) {
          Idarray.push(items.id);
        }
        const fetccherr = Promise.resolve(
          Api.get(`${mainURL}${items.VideoID}`)
        );
        return fetccherr;
      });
      const results = await Promise.all(hey.map((p) => p.catch((e) => e)));
      const validResults = results.filter(
        (result) => !(result instanceof Error)
      );

      var newarray = Idarray;
      var merged = validResults.map(function (value, index) {
        var newValue = value;
        newValue.data.storageID = newarray[index];
        return newValue;
      });
      setData(merged);
      setLoader(false);
    }
  };

  const DeleteFunction = (e) => {
    setLoader(true);
    const arr = JSON.parse(localStorage.getItem("Playlists"))[playlist].filter(
      (items) => {
        return items.id !== e;
      }
    );
    localStorage.setItem(
      "Playlists",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("Playlists")),
        [playlist]: arr,
      })
    );
    const a = JSON.parse(localStorage.getItem("Playlists"));
    setPlaylistData(a[playlist]);
    toast.success("Song deleted");
    setFlag(!flag);
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const HandleSort = () => {
    let playlistt = [...data];
    const dragItemContent = playlistt.splice(dragItem.current, 1)[0];
    playlistt.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setData(playlistt);

    const a = playlistt.map((items) => {
      return { id: items.data.storageID, VideoID: items.data.video_url };
    });
    localStorage.setItem(
      "Playlists",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("Playlists")),
        [playlist]: a,
      })
    );
  };

  useEffect(() => {
    Initialiazation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, PlaylistData]);

  return (
    <>
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

      {(!playlist || error) && (
        <div className="error-container container">
          <h3>Oops! Something went wrong</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/playlist")}
          >
            Back
          </button>
        </div>
      )}

      {loader && playlist && (
        <div className="loader-container container">
          <ScaleLoader
            color="#000000"
            loading={true}
            size={500}
            height={70}
            width={10}
            radius={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {!loader && playlist && (
        <div className="playlist-container">
          {data?.map((items, index) => {
            const auto = index === Results;
            return (
              <div
                key={items.data.storageID}
                className="playlist-item"
                draggable={Dragable}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={HandleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <MyPlayerPlaylist
                  video_url={items.data.video_url}
                  songs={data}
                  index={index}
                  nextIndex={Results}
                  autoPlay={auto}
                  id={items.data.id}
                  audiourl={items.data.url}
                  meta={items.data.meta}
                  storageID={items.data.storageID}
                  DeleteFunction={() => DeleteFunction(items.data.storageID)}
                  loader={loader}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PlaylistDetails;
