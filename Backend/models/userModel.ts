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
    gstNumber:{
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    }
})
const User = mongoose.model("USER",userSchema)
export default User