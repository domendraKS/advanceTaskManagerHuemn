import express from "express";
import { signin, signout, signup } from "../controllers/user.controller.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);
authRoute.post("/signout", signout);

export default authRoute;
