import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import video from "./error2.mp4";
import s from "./errorPage.module.css";

function ErrorPage() {
  return (
    <div className={s.container}>
      <h2 style={{ color: "yellow", cursor: "auto" }}>Page not found</h2>
      <ReactPlayer
        url={video}
        width="350px"
        height="350px"
        controls
        playing
        loop
        volume="0.5"
      />
      <h2 style={{ color: "yellow" }}>dont give up</h2>
      <Link className={s.btn} to="/home">
        HOME
      </Link>
    </div>
  );
}

export default ErrorPage;
