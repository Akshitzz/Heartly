import dotenv from "dotenv";
import express from "express";
import type { Request,Response } from "express";
dotenv.config();

import ConnectDb from "./config/db.js";
const app = express();
const PORT =3000;

app.use(express.json());

ConnectDb();
app.get("/",(req:Request,res:Response)=>{
 res.send("Hello world")
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})

