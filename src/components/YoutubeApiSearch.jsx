/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import MyPlayer from "./MyPlayer";
import Api from "./Api";

const YoutubeApiSearch = () => {
  const URL = "https://ytdownloadbackend.netlify.app/download";
  const [Keynumber, setKeynumber] = useState(1);
  //   let navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const [flag, setFlag] = useState(para.Flag);
  const SearchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults";
  const API_KEY1 = "AIzaSyCHTfN6PwhBVOE1JGHh1fLFskP0-W2EGtk";
  const API_KEY2 = "AIzaSyBWJk1BqO7Wd36mSJk2PSIgx4H2Pm4NMHs";
  const API_KEY3 = "AIzaSyCoI8TWaoz2aZwe_T8FmmZgotKAKWH3ndg";
  const API_KEY4 = "AIzaSyAVDvfHJElsfWGMrKcZCX5uQ_LIQcd4HRA";
  const mainURL = "/player?url=";
  const MaxResults = 20;
  const NumberofKeys = 4;
  const [details, setDetails] = useState([]);
  const [Key, setKey] = useState(API_KEY1);
  const [Search, setSearch] = useState("");
  const [Results, setResults] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [IsCardClicked, setIsCardClicked] = useState(false);
  const SubmitHandler = (e) => {
    e.preventDefault();
    axios
      .get(`${SearchURL}=${MaxResults}&q=${Search}&type=video&key=${Key}`)
      .then((res) => {
        console.log(res.data.items);
        setResults(res.data.items);
      })
      .catch((error) => {
        // console.log(error);
        if (Keynumber < NumberofKeys) {
          setKeynumber(Keynumber + 1);
          var a = Keynumber + 1;
          // eslint-disable-next-line no-eval
          setKey(eval("API_KEY" + a));
        } else {
          console.log("MAXIMUM_SEARCH_LIMIT_REACHED");
        }
      });
  };
  // console.log(Submit);
  // console.log("ONCLICK", flag);

  //   useEffect(() => {
  //     setLoading(true);
  //     axios
  //       .get(`${SearchURL}=${MaxResults}&q=${Search}&type=video&key=${Key}`)
  //       .then((res) => {
  //         setResults(res.data.items);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         // console.log(error);
  //         if (Keynumber < NumberofKeys) {
  //           setKeynumber(Keynumber + 1);
  //           var a = Keynumber + 1;
  //           // eslint-disable-next-line no-eval
  //           setKey(eval("API_KEY" + a));
  //         } else {
  //           console.log("MAXIMUM_SEARCH_LIMIT_REACHED");
  //         }
  //       });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [Keynumber]);

  const CardClick = (e) => {
    setLoading(true);
    setIsCardClicked(true);
    Api.get(`${mainURL}https://www.youtube.com/watch?v=${e.id.videoId}`).then(
      (res) => {
        setDetails([res]);
        setLoading(false);
      }
    );
  };
  return (
    <React.Fragment>
      {/* Search Using Keyword */}
      <div>
        <input
          value={Search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "20px" }}
          onClick={(e) => SubmitHandler(e)}
        >
          Submit
        </button>
      </div>
      {Loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
          />{" "}
        </div>
      )}
      {!Loading && !IsCardClicked && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {Results.map((items) => {
            return (
              <div
                key={Math.random() * 456456465}
                className="card"
                style={{ width: "18rem", margin: "5px" }}
                onClick={() => CardClick(items)}
              >
                <img
                  className="card-img-top"
                  src={items.snippet.thumbnails.medium.url}
                  alt="Card im"
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <p className="card-text">{items.snippet.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {IsCardClicked &&
        details.map((items) => {
          console.log(items);
          return (
            <div key={Math.random()}>
              <MyPlayer
                video_url={items.data.video_url}
                id={items.data.id}
                audiourl={items.data.url}
                meta={items.data.meta}
              />
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default YoutubeApiSearch;
