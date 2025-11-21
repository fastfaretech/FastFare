import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    pwdhash:{
        type:String,
        required:true
    },
    contactNumber: {
        type: String,
    },
    age:{
        type: Number,
    },
    role:{
        type: String,
        enum: ["user", "admin", "logistic-partner"],
        default: "user"
    },
    companyDetails:{
        companyName:{
            type:String,
        },
        gstin:{
            type:String,
        },
        address:{
            type:String,
        }
    }
})
const User = mongoose.model("USER",userSchema)
export default User