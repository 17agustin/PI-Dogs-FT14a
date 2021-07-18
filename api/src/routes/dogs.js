const router = require("express").Router();
const { Dog, Temperament } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const {
  mapDogs,
  separateTemp,
  modificateQuery,
  mapDBdogs,
  lbtoKg,
  BASE_URL,
} = require("../utils/utils.js");

router.get("/", async (req, res,next) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}`); //GET a la API externa
    const found = response.data;
    const doges = mapDogs(found); //utilizo la funcion mapDogs, para extraer los datos necesarios
    if (name) {
      var modQuery = modificateQuery(name); //en caso de recibir query, lo cambio a Mayus, para hacer comparaciones insensitivas

      const queryDogs = doges.filter((dog) => {
        //almaceno en queryDogs, todos los perros que coincidan de la API
        let comp = dog.name.toLocaleUpperCase();

        if (comp.includes(modQuery)) return dog;
      });
      //-----------------------------SEARCH IN DB
      var dogesDB = await Dog.findAll({
        //un findAll de los perros DB
        where: {
          name: {
            [Op.or]: {
              [Op.iLike]: `%${name}`,
              [Op.iLike]: `%${name}%`,
              [Op.iLike]: `${name}%`,
            },
          },
        },
        include: Temperament,
      });

      if (dogesDB.length > 0) {
        var d = mapDBdogs(dogesDB); // la funcion mapDBdogs incluye una funcionalidad especial para los perros almacenados en DB
        for (let i = 0; i < d.length; i++) {
          queryDogs.push(d[i]);
        }
      }
      //--------------------------------SEARCH IN DB
      console.log("Searched By Query");
      if (queryDogs.length > 0) {
        return res.send(queryDogs);
      } else {
        var perro = [
          {
            name: "Dog not found", //SETEANDO PERRO RANDOM
            image:
              "https://image.freepik.com/free-vector/paper-ad-wall-about-missing-dog_124715-589.jpg",
            id: 0,
          },
        ];
        res.send(perro);
      }
    } else {
      console.log("All dogs");
      var dogesDB = await Dog.findAll({ include: Temperament }); //busco los dogs de la database

      if (dogesDB.length > 0) {
        var d = mapDBdogs(dogesDB);
        for (let i = 0; i < d.length; i++) {//los uno con los de la api
          doges.unshift(d[i]);
        }
      }
      return res.send(doges); //los envio
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    let found = await Dog.findByPk(id, { include: Temperament }); // findByPk({where: {alphacode : id}})
    console.log("searched in db");
    return res.send(found);
  } catch (error) {
    let found = await axios.get(`${BASE_URL}`);
    let allDogs = found.data;
    let ThatDog = allDogs.filter((d) => d.id === parseInt(id));
    if (ThatDog.length > 0) {
      let finalDoge = {
        name: ThatDog[0].name,
        height: ThatDog[0].height.metric,
        weight: lbtoKg(ThatDog[0].weight.imperial),
        age: ThatDog[0].life_span,
        image: ThatDog[0].image.url,
        temperaments: separateTemp(ThatDog[0].temperament),
      };
      console.log("returning Dog");
      return res.send(finalDoge);
    }
    console.log("Dog not found");
    return res.send("dog not found");
  }
});

module.exports = router;
