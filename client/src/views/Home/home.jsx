import React, { useEffect, useState } from "react";
import s from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SingleDogs from "../SingleDog/singleDogs";
import NavBar from "../NavBar/NavBar";
import {
  clearHome,
  filterDogsN,
  getAllDog,
  getTemperaments,
  orderDogs,
  filterTemp,
} from "../../actions/index";




function Home() {
  const dogs = useSelector((state) => state.Dogs);
  const temps = useSelector((state) => state.Temperaments);
  const [page, setPage] = useState(1);
  const [selectedTemps, setSelectedTemps] = useState([]);
  const { push } = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDog());
    setPage(1)
    dispatch(getTemperaments());
    return () => dispatch(clearHome(),clearState())
  }, [dispatch]);

  const clearState = () => {
    setSelectedTemps([]);
  };

  const handlePage = (e) => {
    console.log(page);
    if (e.target.name === "next") {
      if (page === Math.ceil(dogs.length / 8))
        return alert("No hay mas paginas");
      setPage(page + 1);
    } else {
      if (page === 1) return alert("No hay Paginas Anteriores");
      setPage(page - 1);
    }
  };

  const onfilter = (e) => {
    console.log(e);
    if (e.target.value !== "all") return dispatch(filterDogsN(dogs));
    else {
      
      return dispatch(getAllDog() , clearState());
    }
  };

  const paginate = (dogs, page) => {
    //chekeo que sea posible el paginado
    if (dogs.length < 8 && dogs.length !== 0) {
      //setPage(page - page +1)
      return dogs; // de no serlo devuelvo los dogs entregados
    }
    //caso contrario, procedo a paginar
    else {
      const offset = page * 8;
      const initial = offset - 8;
      window.scrollTo(0, 0)
      return dogs.slice(initial, offset);
    }
  };

  const onOrder = (e) => {
    let params = e.target.value;
    dispatch(orderDogs(dogs, params));
    setTimeout(push("/home"), 1000);
  };

  const handleTemp = (e) => {
    if(selectedTemps.includes(e.target.value)) return
    setSelectedTemps([...selectedTemps, e.target.value]);
    dispatch(filterTemp(dogs, e.target.value));
  };

  const closeTemps = (e) => {
    e.preventDefault();
    setSelectedTemps([]);
    dispatch(clearHome())
    dispatch(filterTemp());
  };

  const handlePageFL = (e) =>{
    if(e.target.name === "first") return setPage(1);
    return setPage(Math.ceil(dogs.length/8))
  }

  return (

    <div className={dogs ? null :  s.test}>
        <div >
          <div className={s.container}>
          <NavBar />
          <select className={s.select2} onChange={(e) => onfilter(e)}>
            <option value disabled>
              filtrar
            </option>
            <option value="all">All</option>
            <option value="myDogs">My Dogs</option>
          </select>
          <select className={s.select2} onChange={(e) => handleTemp(e)}>
            <option value disabled>
              temperaments
            </option>
            {temps &&
              temps.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
          </select>
          <select className={s.select}name="order" onChange={(e) => onOrder(e)}>
            <option value disabled>
              order
            </option>
            <option value="alf">A-Z</option>
            <option value="notAlf">Z-A</option>
            <option value="weight">Weight ⬆</option>
            <option value="notWeight">Weight ⬇</option>
          </select>
          <div>
          {selectedTemps.length > 0 ? (
            <button className={s.btn} onClick={(e) => closeTemps(e)}>Eliminate Filters</button>
          ) : null}
            {selectedTemps
              ? selectedTemps.map((st) => {
                  return <span key={s.temp} className={s.temp}>{st}</span>;
                })
              : null}
          </div>
          <Link className={s.btn} to="/createdog">Create New Dog</Link>
          </div>
          

          <ul className={s.container}>
            { dogs &&
              paginate(dogs, page).map((doges) => {
                return (
                  <SingleDogs
                    key={doges.id}
                    name={doges.name}
                    id={doges.id}
                    image={doges.image}
                    temperaments={doges.temperaments}
                  />
                );
              })}
          </ul>
          {dogs && dogs.length<8 ? <div className={s.container}><button value="all" className={s.btnB} onClick={closeTemps}>Back</button></div> : dogs && dogs.length>0 ?<div className={s.btnCont}>
          <button className={page !== 1 ? s.btnFL : s.inv} onClick={handlePageFL} name="first"> First Page </button>
            <button className={s.btnPage} onClick={handlePage} name="prev">
              ◀
            </button>
            <p className={s.PageN}>{page}</p>
            <button className={s.btnPage} onClick={handlePage} name="next">
            ▶
            </button>
             <button className={page !== Math.ceil(dogs.length/8) ? s.btnFL : s.inv} onClick={handlePageFL} name="last">Last Page</button>
          </div> : null}
        </div>
    </div>
  );
}

export default Home;
