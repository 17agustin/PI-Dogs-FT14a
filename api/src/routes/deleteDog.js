const router = require("express").Router();
const { Dog } = require("../db.js");

router.delete("/:id", async function (req, res,next) {
    const {id} = req.params
try {
     await Dog.destroy({
        where:{
            id:id
        }
    })
    return res.send("dog eliminated")
} catch (error) {
    next(error)
}
})
module.exports = router;