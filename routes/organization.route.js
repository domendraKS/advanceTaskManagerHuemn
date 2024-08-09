import express from "express";
import { createOrg, getOrg } from "../controllers/organization.controller.js";

const orgRoute = express.Router();

orgRoute.post("/create-org", createOrg);
orgRoute.get("/get/:orgId", getOrg);

export default orgRoute;
