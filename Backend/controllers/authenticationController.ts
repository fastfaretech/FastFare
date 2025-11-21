import { Request, Response } from "express"
import {verify, sign} from "jsonwebtoken"
import User from "../models/userModel"

export async function Register(req:Request,res:Response){
    const {name, email, gstNumber,contactNumber} = req.body
    if(!name || !email || !gstNumber || !contactNumber){
        console.log("All fields are Required!")
        res.status(400).send("All fileds are Required!")
    }
}

export async function Login(req:Request, res:Response){

}
