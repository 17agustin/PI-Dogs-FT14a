import React from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import spaceDog from "../../images/dogeRick.png";

function NavBar() {
  return (
    <header className={s.header}>
      <img src={spaceDog} className={s.img} alt="img not found" />
      <Link to="/home" className={s.link}>
        <h1>
          <span>SPACE - DOGS</span>
        </h1>
      </Link>
      <SearchBar className={s.SearchBar} />
    </header>
  );
}
export default NavBar;
