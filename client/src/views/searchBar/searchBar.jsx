import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByQuery } from "../../actions";
import s from "./searchBar.module.css"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setQuery((query) => (query = e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogsByQuery(query));
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
        <button className={s.btn} type="submit">Buscar</button>
      </form>
    </div>
  );
}
