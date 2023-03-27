import React, { useEffect, useState } from "react";
import MyPlayerPlaylist from "./MyPlayerPlaylist";
import Api from "./Api";
import { useNavigate } from "react-router";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const PlaylistDetails = () => {
  const mainURL = "/player?url=";
  const [PlaylistData, setPlaylistData] = useState([]);
  const Idarray = [];
  const [loader, setloader] = useState(true);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [Dragable, setDragable] = useState(false);
  const navigate = useNavigate();
  const { playlist } = useParams();

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
      Promise.all(hey).then((rest) => {
        var data = rest;
        var newarray = Idarray;
        var merged = data.map(function (value, index) {
          var newValue = value;
          newValue.data.storageID = newarray[index];
          return newValue;
        });
        setData(merged);
        setloader(false);
      });
    }
  };

  const DeleteFunction = (e) => {
    setloader(true);
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
    toast.success("song deleted");
    // console.log(a[playlist]);
    setFlag(!flag);
  };

  // save reference for dragitem and dragoveritem

  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  //handle dragsorting
  const HandleSort = () => {
    //duplicate items
    let playlistt = [...data];

    //remove and save drag item content
    const dragItemContent = playlistt.splice(dragItem.current, 1)[0];

    //switch the position

    playlistt.splice(dragOverItem.current, 0, dragItemContent);

    //reset the position of ref

    dragItem.current = null;
    dragOverItem.current = null;

    setData(playlistt);
    // console.log(playlistt);
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
        <>
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Oops! Something went wrong</h3>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/playlist")}
            >
              Back
            </button>
          </div>
        </>
      )}
      {/* Simple Loader */}
      {loader && playlist && (
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
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
        </div>
      )}

      {/* This is when play is click on playlist (all the music in playlist here). */}
      {!loader && playlist && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {data?.map((items, index) => {
            return (
              <div
                key={Math.random()}
                style={{ margin: "10px", cursor: `default` }}
                draggable={Dragable}
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={HandleSort}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => setDragable(false)}
              >
                <MyPlayerPlaylist
                  video_url={items.data.video_url}
                  id={items.data.id}
                  audiourl={items.data.url}
                  meta={items.data.meta}
                  storageID={items.data.storageID}
                  DeleteFunction={(e) => DeleteFunction(items.data.storageID)}
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
