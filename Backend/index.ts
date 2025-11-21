import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGOURI || "")
.then(()=>{console.log("MongoDb connected")})
.catch((error:Error)=>{console.log(`Error connecting MongoDB! ${error}`)})
app.get('/', (req, res)=>{
    console.log(`Received a request from ${req.ip}`)
    res.send('Health Check Passed')
})  

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})