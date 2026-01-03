import dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express";
import ConnectDb from "../../../config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import authrouter from "./routes/authroutes.js";
import doctorrouter from "./routes/doctorroutes.js";
import hospitalrouter from "./routes/hospitalsroutes.js";
import patientrouter from "./routes/patientroutes.js";
import userrouter from "./routes/userroutes.js";

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

// API Routes
app.use("/api/auth", authrouter);
app.use("/api/doctors", doctorrouter);
app.use("/api/hospitals", hospitalrouter);
app.use("/api/patients", patientrouter);
app.use("/api/users", userrouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Backend for heartly");
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

