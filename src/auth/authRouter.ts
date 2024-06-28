import { Router } from "express";
import { authUser } from "./authController";
import { getUserInformation } from "./getController";
import { authCheckValidation, inputCheckErrorsMiddleware } from "../middlewares/middlewareForAll";
import { bearerAuth } from "../middlewares/middlewareForAll";

export const authRouter = Router();

authRouter.post("/login", authCheckValidation, inputCheckErrorsMiddleware, authUser);
authRouter.get("/me", bearerAuth, getUserInformation);
