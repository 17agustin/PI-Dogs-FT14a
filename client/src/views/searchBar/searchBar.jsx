import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getDogsByQuery } from "../../actions";
import s from "./searchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleChange = (e) => {
    setQuery((query) => (query = e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(push("/home"), 1000);
    setTimeout(dispatch(getDogsByQuery(query)), 2000);
    setQuery((query) => (query = ""));
  };

  return (
    <div className={s.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={s.navbar}
          type="text"
          placeholder="Buscar perro..."
          value={query}
          onChange={handleChange}
        />
        <button className={s.btn} type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}
