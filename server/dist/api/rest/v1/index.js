import dotenv from "dotenv";
import express from "express";
import ConnectDb from "../../../config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import authrouter from "./routes/authroutes.js";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
ConnectDb();
app.use("/api/auth", authrouter);
app.get("/", (req, res) => {
    res.send("Backend for heartly");
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
