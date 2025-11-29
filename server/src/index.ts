import dotenv from "dotenv";
import express from "express";
import type { Request,Response } from "express";
import ConnectDb from "./config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import authrouter from "./routes/authroutes.js";



dotenv.config();
const app = express();
const PORT =3000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin:"http://192.168.1.4",
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

ConnectDb();
app.use("/api/auth",authrouter);
app.get("/",(req:Request,res:Response)=>{
 res.send("Backend for heartly")
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})

