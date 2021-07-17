const { Temperament } = require("../db.js");
const axios = require("axios");
const BASE_URL = "https://api.thedogapi.com/v1/breeds";


//Funcion para Cargar los temperamentos en la base de datos desde la API externa

const CargarTemperamentos = async () => {
  //primero checkeo que la db este vacia, caso contrario, no cargo datos.

  let check = await Temperament.findAll();
  if (check.length > 0)
  return console.log("Los temperamentos Ya estan cargados");

  //Debo cargar los datos desde la API externa

  try {
    var array = [];
    const response = await axios.get(`${BASE_URL}`);
    const temp = response.data;

    //guardo todos los temperamentos, se incluiran los repetidos, pero luego seran removidos

    const PromArray = temp.map((a) => a.temperament);

    //resuelvo las promesas (podria mejorarlo, quitando las repeticiones antes de resolver promesas)

    var SolvedPromises = await Promise.all(PromArray);

    //Con las Promesas ya resueltas, paso a remover aquellos temperamentos repetidos
    SolvedPromises.map(async (temp) => {
      var list = [];
      if (temp) list = temp.split(",");
      for (let i = 0; i < list.length; i++) {
        let itm = list[i].replace(" ", ""); //algunos temperamentos incluyen un espacio al inicio
        if (!array.includes(itm)) array.push(itm);
      }
    });

    //ahora creo los temperamentos a partir de un array con sus nombres!

    for (let i = 0; i < array.length; i++) {
      await Temperament.create({ // find or create es una buena alternativa, sin embargo aun asi, setea elementos repetidos
        name: array[i],
      });
    }
  } catch (error) {
    return console.log(error);
  }
};

// Funcion para pasar la data de libras a kilos, sera usada en mapDogs
const lbtoKg = (weight) =>{
  let weight1 = weight.split(" - ")
  let a = Math.ceil(weight1[0] * 0.453592)
  let b = Math.ceil(weight1[1] * 0.453592)
  var fw = [a,b].join(" - ")
  return fw;
}

//Funcion que recibe un array con objetos y asigna solos los datos necesarios, descartando los demas
//de esta manera no cargo data innecesaria
const mapDogs = (dogs) => {
  return (
    dogs &&
    dogs.map((doggo) => { 
      if (!doggo.temperament)
        doggo.temperament = " ";
      return (newDoggo = {
        weight: lbtoKg(doggo.weight.imperial), // el peso en metrico, trae ciertos problemas (NaN)
        id: doggo.id,
        created: false,
        name: doggo.name,
        temperaments: separateTemp(doggo.temperament),
        image: doggo.image ? doggo.image.url : "there's any image", //
      });
    })
  );
};

//funcion Para mapear los perros de DB, similar a mapDogs, pero con otras particularidades
const mapDBdogs = (dogs) => {
  return (
    dogs &&
    dogs.map((doggo) => {
      return (newDoggo = {
        weight: doggo.weight ? doggo.weight : null,
        id: doggo.id,
        created: true,
        name: doggo.name,
        temperaments:
          doggo.temperaments && doggo.temperaments.map((t) => t.name),
        image: doggo.image ? doggo.image : "there's any image",
      });
    })
  );
};

//Funcion para separa el string de temperamentos en un array con elementos unicos de temperamento

const separateTemp = (temperaments) => {
  if (temperaments) {
    let arrayTemps = temperaments.split(","); // separo el string unico, en un array de strings
    let TempsList = arrayTemps.map((t) => t.replace(" ", "")); // reemplazo los espacios, por vacio
    return TempsList;
  }
};

// funcion para modificar el query de manera que sea comparable
const modificateQuery = (query) => {
  let arr = query.split("%20").join(" "); // separo en %20 y reemplazo por espacios reales

  const modQuery = arr.toLocaleUpperCase(); // todo a mayusculas para una comparacion insensitiva

  return modQuery;
};

// FUNCION para paginar desde Back-End, es funcional, pero no ha sido implementada por fines practicos.
const paginate = (dogs, page) => {
  //chekeo que sea posible el paginado
  if (dogs.length < 8) {
    return dogs; // de no serlo devuelvo los dogs entregados
  }

  //caso contrario, procedo a paginar

  // si la pagina es 1 devuelvo los primeros 8
  console.log(dogs, "de Queryyyyyyys");
  if (page === "1") {
    return dogs.slice(0, 8);
  }

  // si no lo es, hago paginado
  else {
    const offset = page * 8 - 1;
    const initial = offset - 8;

    return dogs.slice(initial, offset);
  }
};

module.exports = {
  BASE_URL,
  CargarTemperamentos,
  mapDogs,
  separateTemp,
  modificateQuery,
  paginate,
  mapDBdogs,
  lbtoKg
};
