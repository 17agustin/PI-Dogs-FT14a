const router = require("express").Router();
const { Dog } = require("../db.js");

router.post("/", async function (req, res,next) {
  const { name, height, weight, age, image, temperaments } = req.body;
  try {
    const newDoge = await Dog.create({
      name,
      created: true,
      height,
      weight,
      age,
      image,
    });

    (await temperaments) && newDoge.setTemperaments(temperaments);
    res.send(newDoge);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
