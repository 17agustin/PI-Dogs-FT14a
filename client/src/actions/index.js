import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOGS_BY_QUERY = "GET_DOGS_BY_QUERY";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const DELETE_DOG = "DELETE_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const FILTERTEMP = "FILTERTEMP";
export const BASE_URL = "http://localhost:3001";

export function getAllDog() {
  return function (dispatch) {
    return axios
      .get(`${BASE_URL}/dogs`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_ALL_DOGS, payload: data });
      });
  };
}

export function getDogsByQuery(query) {
  return function (dispatch) {
    return axios
      .get(`${BASE_URL}/dogs?name=${query}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_DOGS_BY_QUERY, payload: data });
      });
  };
}

export function getDogDetail(id) {
  return function (dispatch) {
    return axios
      .get(`${BASE_URL}/dogs/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.created) {
          let send = {
            created: true,
            image: data.image,
            id: data.id,
            name: data.name,
            age: data.age,
            height: data.height,
            weight: data.weight,
            temperaments: data.temperaments.map((t) => t.name), // el dato llega en modo de obj, con la info de la tabla
          };
          return dispatch({ type: GET_DOG_DETAIL, payload: send });
        } else {
          return dispatch({ type: GET_DOG_DETAIL, payload: data });
        }
      });
  };
}

export function getTemperaments() {
  return function (dispatch) {
    return axios
      .get(`${BASE_URL}/temperament`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: data });
      });
  };
}

export function clearDetail() {
  return { type: GET_DOG_DETAIL, payload: undefined };
}

export function clearHome() {
  return { type: GET_ALL_DOGS, payload: undefined };
}

export function removeDog(id) {
  return { type: DELETE_DOG, payload: id };
}

export function filterDogsN(dogs) {
  return function (dispatch) {
    var send = dogs.filter((dog) => dog.created === true);
    dispatch({ type: FILTER, payload: send });
  };
}

const generaPesoProm = (weightA, weightB) => {
  let a, b, c, d, prom1, prom2;
  let weight1 = weightA.split(" - ");
  let weight2 = weightB.split(" - ");
  a = parseInt(weight1[0]);
  c = parseInt(weight2[0]);
  b = parseInt(weight1[1]);
  d = parseInt(weight2[1]);
  prom1 = (a + b) / 2;
  prom2 = (c + d) / 2;
  return { prom1, prom2 };
};

export function orderDogs(dogs, params) {
  return function (dispatch) {
    if (params === "notAlf") {
      var dog =
        dogs &&
        dogs.sort((a, b) => {
          let str1 = a.name.toLocaleUpperCase();
          let str2 = b.name.toLocaleUpperCase();
          return str1 === str2 ? 0 : str1 < str2 ? 1 : -1;
        });
    } else if (params === "alf") {
      dog =
        dogs &&
        dogs.sort((a, b) => {
          let str1 = a.name.toLocaleUpperCase();
          let str2 = b.name.toLocaleUpperCase();
          return str1 === str2 ? 0 : str1 > str2 ? 1 : -1;
        });
    } else if (params === "weight") {
      dog =
        dogs &&
        dogs.sort((a, b) => {
          let { prom1, prom2 } = generaPesoProm(a.weight, b.weight);
          return prom1 === prom2 ? 0 : prom1 > prom2 ? 1 : -1;
        });
    } else if (params === "notWeight") {
      dog =
        dogs &&
        dogs.sort((a, b) => {
          let { prom1, prom2 } = generaPesoProm(a.weight, b.weight);
          return prom1 === prom2 ? 0 : prom2 > prom1 ? 1 : -1;
        });
    }
    dispatch({ type: ORDER, payload: dog });
  };
}

export function filterTemp(dogs, temps) {
  return function (dispatch) {
    if (temps) {
      var filtered = dogs.filter((dog) => {
        if (dog.temperaments && dog.temperaments.includes(temps)) return dog;
        else return null;
      });
      return dispatch({ type: FILTERTEMP, payload: filtered });
    } else {
      dispatch(getAllDog());
    }
  };
}

export function deleteDog(id) {
  return function (dispatch) {
    axios.delete(`${BASE_URL}/delete/${id}`).then((rta) => {
      return dispatch({
        type: DELETE_DOG,
        payload: rta.data,
      });
    });
  };
}
