import axios from "axios";
import MyPlayer from "./MyPlayer";
import Api from "./Api";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SearchComponent = () => {
  const [details, setDetails] = useState([]);
  const [param, setParam] = useState("");
  const mainURL = "/player?url=";
  const [Keynumber, setKeynumber] = useState(1);
  //   let navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const [flag, setFlag] = useState(para.Flag);
  const SearchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults";
  const API_KEY1 = "AIzaSyCHTfN6PwhBVOE1JGHh1fLFskP0-W2EGtk";
  // eslint-disable-next-line no-unused-vars
  const API_KEY2 = "AIzaSyBWJk1BqO7Wd36mSJk2PSIgx4H2Pm4NMHs";
  // eslint-disable-next-line no-unused-vars
  const API_KEY3 = "AIzaSyCoI8TWaoz2aZwe_T8FmmZgotKAKWH3ndg";
  // eslint-disable-next-line no-unused-vars
  const API_KEY4 = "AIzaSyAVDvfHJElsfWGMrKcZCX5uQ_LIQcd4HRA";
  const MaxResults = 20;
  const NumberofKeys = 4;
  const [Key, setKey] = useState(API_KEY1);
  const [Results, setResults] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [IsCardClicked, setIsCardClicked] = useState(false);
  const fetcher = async () => {
    setLoading(true);
    await Api.get(`${mainURL}${param}`)
      .then((res) => {
        setDetails([res]);
        setLoading(true);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };

  const fetcherParam = (e) => {
    e.preventDefault();
    setDetails([]);
    setLoading(true);
    axios
      .get(`${SearchURL}=${MaxResults}&q=${param}&type=video&key=${Key}`)
      .then((res) => {
        setResults(res.data.items);
        setIsCardClicked(false);
        setLoading(false);
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
  const Submitter = (e) => {
    e.preventDefault();
    if (param === "") {
      alert("please enter url");
    } else if (param.includes("https://www.youtube.com")) {
      fetcher(e);
    } else {
      fetcherParam(e);
    }
  };

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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <form
          className="row g-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="search or enter youtube url"
              // value={param}
              style={{ width: "40vw" }}
              onChange={(e) => {
                setParam(e.target.value);
              }}
            />
          </div>

          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              style={{ marginTop: "10px" }}
              onClick={(e) => {
                Submitter(e);
              }}
            >
              Submit
            </button>
          </div>
        </form>

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

        {details.map((items) => {
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
      </div>
    </>
  );
};

export default SearchComponent;
