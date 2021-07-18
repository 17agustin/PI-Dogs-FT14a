import React from "react";
import { Link } from "react-router-dom";
import s from "./singleDogs.module.css";

const SingleDogs = ({ name, id, image, temperaments }) => {
  return (
    <div className={s.container}>
      <img className={temperaments ? temperaments.length>6 ? s.img3 : s.img: s.img2} src={image} width="100%" alt="img not found" />
      <div className={s.card}>
        <Link  className={s.btn} to={id === 0 ? "/error" :`/dogs/${id}`}>
          <span>{name}</span>
        </Link>
      
      <ul className={s.caja2}>
        {temperaments &&
          temperaments.map((t) => (
            <li className={temperaments ? temperaments.length> 5 ? s.li3 : temperaments.length> 3 ? s.li2 : s.li : s.li2} key={t}>
              {t}
            </li>
          ))}
      </ul>
      </div>
    </div>
  );
};

export default SingleDogs;
