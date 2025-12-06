import { Router } from "express";

import { login, register } from "../api/rest/v1/controllers/authcontroller.js";


const authrouter = Router();

authrouter.post("/register", register);
authrouter.post("/login", login);

export default authrouter;
