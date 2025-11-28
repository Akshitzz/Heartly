import express from "express";
import type { Request,Response } from "express";
const app = express();
const PORT =3000;

app.use(express.json());


app.get("/",(res:Response,req:Request)=>{
 res.send("Hello world")
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})

