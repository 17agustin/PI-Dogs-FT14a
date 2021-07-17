const router = require('express').Router(); 
const {Temperament} = require('../db.js')


router.get('/', async function(_req, res,next) {
    try {
      let temps = await Temperament.findAll();
      temps ? res.send(temps) : res.status(404).send("error")
    } catch (error) {
        next(error)
    }  
   });

module.exports = router;
