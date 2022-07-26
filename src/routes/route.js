const express = require('express')
const router = express.Router()
const {storeInDb,getData,getDataById,updateData,deleteData} = require("../controllers/controller")



router.post("/api/pet",storeInDb)
router.get("/api/pet",getData)
router.get("/api/pet/:petId",getDataById)
router.patch("/api/pet/:petId",updateData)
router.delete("/api/pet/:petId",deleteData)

module.exports =router