import React, { useEffect, useState } from "react";
import Api from "./Api";
import MyPlayer from "./MyPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SearchComponent = () => {
  const [details, setDetails] = useState([]);
  const [param, setParam] = useState("");
  const [submit, setSubmit] = useState(false);
  const mainURL = "/player?url=";

  const fetcher = async () => {
    // https://www.youtube.com/watch?v=mn7MKh3l1iM&ab_channel=IqlipseNova
    await Api.get(`${mainURL}${param}`)
      .then((res) => {
        setDetails([res]);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };
  useEffect(() => {
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

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
          }}
        >
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="ENTER URL"
              // value={param}
              style={{ width: "500px" }}
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
                e.preventDefault();
                setSubmit(!submit);
              }}
            >
              Submit
            </button>
          </div>
        </form>
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
