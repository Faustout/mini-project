import { Response, Request, NextFunction } from "express";

import express, { Router } from "express";
import { UserController } from "../controllers/user";

export const route: Router = express.Router();

route.get("/", UserController.login);
route.get("/byid", UserController.keepLogin);
route.post("/", UserController.register);
route.patch("/", UserController.forgotPassword);
