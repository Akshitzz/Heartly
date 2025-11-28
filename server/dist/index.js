import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ConnectDb from "./config/db.js";
const app = express();
const PORT = 3000;
app.use(express.json());
ConnectDb();
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
