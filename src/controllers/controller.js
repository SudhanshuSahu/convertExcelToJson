const petModel = require("../petModel");
const ObjectId = require('mongoose').Types.ObjectId;

//importing xlsx package to implement in create Api function
const xlsx = require("xlsx");

  //ObjectId Validation which will be used in several API functions
  function isValidObjectId(objectId) {
    if (!ObjectId.isValid(objectId)) return false;
    return true;
  }


//******************************************************************************** */
//Create API function to fetch data from excel and store it in Mongo DB
const storeInDb = async function (req, res) {
  //Fetch data from Excel file
  const readExcelFile = xlsx.readFile("../pet.xlsx");
  const readExcelSheet = readExcelFile.Sheets["Sheet1"];

  //Converting Format of Data from Excel to JSON
  const data = xlsx.utils.sheet_to_json(readExcelSheet);

  //Checking if data is not present in Excel
  if (data.length === 0) {
    return res.status(404).send({ status: false, message: "Data not found" });
  }
  //Creating and storing data in database
  const storeExcelData = await petModel.create(data);

  return res.status(201).send({ status: true, data: storeExcelData });
};





//**************************************************************************************** */
//get API function to get all the data from data base
const getData = async function (req, res) {
  //Calling a DB to Get all the documents that are stored in it
  const fetchData = await petModel.find({ isDeleted: false });

  //If no document is present in a collection of database
  if (fetchData.length === 0) {
    return res
      .status(404)
      .send({ status: false, message: "Document not found" });
  }
  return res.status(200).send({ status: true, data: fetchData });
};




//********************************************************************************************** */
//get API function to get the document by using petId
const getDataById = async function (req, res) {
  let petId = req.params.petId;

  if(!isValidObjectId(petId)){
  return res.status(400).send({status:false,message:"petId is not valid"})
  }

  //Calling a DB to Get all the documents that are stored in it
  const getById = await petModel.findOne({ _id: petId });
  if (!getById) {
    return res.status(404).send({status: false,message: `Document with this id : ${petId} is not found`
      });
  }
  if (getById["isDeleted"] === true) {
    return res
      .status(400)
      .send({
        status: false,
        message: `Cannot access document as this document is Deleted Earlier`,
      });
  }

  //If no document is present in a collection of database
  return res.status(200).send({ status: true, data: getById });
};




//**************************************************************************** */
//Patch API function to update specific fields

const updateData = async function (req, res) {
  let petId = req.params.petId;

  //Checking if petId is valid ObjectId or not
if(!isValidObjectId(petId)){
  return res.status(400).send({status:false,message:"petId is not valid"})
  }

  let data = req.body;
  //Check if Body is empty or not
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .send({ status: false, message: "data must be required" });
  }
  let updateData = await petModel.findOneAndUpdate(
    { _id: petId, isDeleted: false},
    { $set: data },
    { new: true }
  );
  if (!updateData) {
    return res
      .status(404)
      .send({
        status: false,
        message: `Document with this id : ${petId} is not found`,
      });
  }

  return res.status(200).send({status:true,data:updateData})
};




//**********************************************************************************************/
//Delete api to delete specific document
const deleteData = async function(req,res){
let petId = req.params.petId

//Checking if petId is valid ObjectId or not
if(!isValidObjectId(petId)){
  return res.status(400).send({status:false,message:"petId is not valid"})
  }
const checkDeleteStatus = await petModel.findOne({_id:petId})
  if(!checkDeleteStatus){
    return res.status(404).send({status: false,message: `Document with this id : ${petId} is not found`
  })
  }
  if(checkDeleteStatus["isDeleted"]===true){
    return res
      .status(400)
      .send({
        status: false,
        message: `This document is already deleted`,
      })
  }

  const setDelete = await petModel.findOneAndUpdate({_id:petId},{$set:{isDeleted:true}},{new:true})

  return res.status(200).send({status:true, message: `Document with petId : ${petId} is successfully deleted`,data:setDelete})
}

module.exports = { storeInDb, getData, getDataById, updateData ,deleteData};
