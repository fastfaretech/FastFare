import { Request, Response } from "express"
import {sign, verify} from "jsonwebtoken"
import bcrypt from "bcrypt"

import { config } from "../../utils/envConfig"
import User from "../../models/userModel"
import { verifyGstin } from "../../services/gstinService"

const JWT_SECRET = config.JWT_SECRET;

interface Iregister {
    name:string,
    email:string,
    password:string
}
export async function Register(req:Request,res:Response){
    try{
        const {name, email, password}: Iregister = req.body
        if(!name || !email || !password){
            console.log("All fields are Required!")
            return res.status(400).json({ message: "All fields are required!" });

        }

        const user = await User.findOne({email:email})
        if(user){
            console.log("Error:User already exists!")
            return res.status(409).json({message:"User already exists with this email!"})
        }

        const saltRound = 10
        const pwdhash = await bcrypt.hash(password, saltRound)
        const newUser = new User({
            name,
            email,
            pwdhash
        })
        await newUser.save()
        const response = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
        console.log("User Registered Successfully!")
        return res.status(201).json({
            message:"User Registered Successfully!",
            response
        })
   
    }catch(error){
        console.log("Error:Internal Server Error!", error)
        return res.status(500).json({
            message:"Internal Server Error!",
            error
        })
    }
}

interface Ilogin {
    email:string,
    password:string
}
export async function Login(req:Request, res:Response){
    try{
        const {email, password}: Ilogin = req.body
        if(!email || !password){
            console.log("All fields are Required!")
            return res.status(400).json({message:"All fields are Required!"})
        }

        const user = await User.findOne({email:email})
        if(!user){
            console.log("Error:User does not exist!")
            return res.status(401).json({message:"Invalid Email or Password!"})
        }
        
        const passwordMatch = await bcrypt.compare(password, user.pwdhash)
        if(!passwordMatch){
            console.log("Invalid Credentials!")
            return res.status(401).json({message:"Invalid Email or Password!"})
        }

        const token = sign({email:user.email, role:user.role, id:user._id},JWT_SECRET,{expiresIn: "1h"})
        if(verify(token, JWT_SECRET))
            console.log("Token Verified Successfully")

        console.log("User Logged In Successfully!")
        return res.status(200).json({
            message:"User Logged In Successfully!",
             token 
        });
    }catch(error){
        console.log("Error:Internal Server Error!", error)
        return res.status(500).json({
            message:"Internal Server Error!",
            error
        })
    }
}


interface Iupdate {
    name?:string,
    contactNumber?:string,
    age?:number,
    companyDetails?:{
        companyName?:string,
        address?:string,
        gstin?:string
    }
}

export async function UpdateUser(req:Request, res:Response){
    try{
        const userId = req.params.id
        const data: Iupdate = req.body
        if(data.companyDetails && data.companyDetails.gstin){
            const gstinVerificationResult = await verifyGstin(data.companyDetails.gstin)
            if(gstinVerificationResult.flag !== "true"){
                console.log("Invalid GSTIN provided.")
                return res.status(400).json({ message: "Invalid GSTIN provided." });
            }
        }
        const user = await User.findByIdAndUpdate(
            userId,
            {$set: data},
            {new:true, runValidators:true}
        )

        if(!user){
            console.log("User Not Found!") 
            return res.status(404).json({
                message:"User Not Found!"
            })
        }
        console.log("User Details Updated Successfully!")
        return res.status(200).json({
            message:"User Details Updated Successfully!"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error!",
            error
        })
    }
}