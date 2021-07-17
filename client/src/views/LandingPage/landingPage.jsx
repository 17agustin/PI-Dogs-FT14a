import React from "react";
import { Link } from "react-router-dom";
import s from "./landingPage.module.css";

//falta darle estilo y una imagen de fondo

function landingPage() {
  return (
    <div className={s.container}>
      <div className={s.box}>
        <div className={s.typingDemo}>
          Dogs are the humans best friends since eternal times
        </div>
        <hr />
        <div className={s.typingDemo1}>
          Do you wanna know some cool things about our friends?
        </div>
        <hr />
        <div className={s.typingDemo2}>this will be like a space travel</div>
        <hr />
        <Link to="/home" className={s.btn}>
          Begin
        </Link>
      </div>
    </div>
  );
}

export default landingPage;
