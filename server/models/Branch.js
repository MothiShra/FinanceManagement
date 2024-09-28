const mongoose =require('mongoose')

const BranchSchema = new mongoose.Schema({

    LastName :String,
    FirstName :String,
    Email :String,
    Address :String,
    Role:{
        type:String,
        default:"User",
    },
    isActive:{
        type:Boolean,
        default:true,
    }
}) 
const BranchModel=mongoose.model("Branch",BranchSchema)
module.exports=BranchModel