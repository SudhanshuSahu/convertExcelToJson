const mongoose = require("mongoose")
 const userSchema = new mongoose.Schema({
    name:{  
        type:String ,
        trim:true
    },  
    type:{  
        type:String ,
        trim:true
    }, 
    breed:{
        type:String,
        trim:true
    },   
    ageInYear:{  
        type:Number  
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
     },{timestamps : true})


 module.exports = mongoose.model("Excel",userSchema)