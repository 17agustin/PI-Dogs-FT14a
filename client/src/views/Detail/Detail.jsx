import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getDogDetail, clearDetail, clearHome, deleteDog } from "../../actions";
import s from "./Detail.module.css";
import NavBar from "../NavBar/NavBar"

function Detail() {
  const doge = useSelector((state) => state.dogDetail);
  const {push} = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
 
  
  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => {
      dispatch(clearHome());
      dispatch(clearDetail());  
    };
  }, [id, dispatch]);


  const deleteDoge = ()=>{
     dispatch(deleteDog(id))
     alert(`${doge.name} has been eliminated`)
     return push("/home")
  }
  
  return (
    <div >
      <NavBar/>
      {doge ? (
        <div key={doge.id}>
          <div className={s.container}>
            <div>
              <h2 className={s.cardtitle}>{doge.name}</h2>
              <img className={s.photo} src={doge.image} alt="img not found" />
            </div>
            <div>
              <p className={s.data}>weight : {`${doge.weight} Kg`}</p> 
              <p className={s.data}>Height : {`${doge.height} cm`}</p>
              <p className={s.dataA}>life-span : {doge.age}</p>
            </div>
            <div className={doge.temperaments && doge.temperaments.length > 5 ?s.tempCL :s.tempC}>
            {doge.temperaments ? (
                <ul className={doge.temperaments.length > 5? s.ulL :s.ul}>
                  {doge.temperaments.map((t) => (
                    <li className={t.length >9 ? s.tempL :s.temp} key={t}>{t}</li>
                  ))}
                </ul>
            ) : (
              null
            )}
            </div>
            {doge && doge.created ? <button onClick={deleteDoge} className={s.btnD}>Delete Dog</button> : null}
            <Link className={s.btnS}to="/home">Home</Link>
          </div>
          
        </div>
      ) : doge === undefined ? (
        <div className={s.img} />
      ) : (
        <h1>there are no details to show</h1>
      )}
    </div>
  );
}

export default Detail;
