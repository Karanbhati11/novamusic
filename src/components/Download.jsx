import React, { useState } from "react";

const Download = () => {
  const [test, settest] = useState("");
  const url =
    "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";
  const fetcher = (e) => {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let temp = URL.createObjectURL(file);
        console.log(temp);
        settest(temp);
      });
  };

  return (
    <>
      <a href={test} download="sample.png">
        download
      </a>
      <button className="btn btn-dark" onClick={fetcher}>
        download
      </button>
    </>
  );
};

export default Download;
