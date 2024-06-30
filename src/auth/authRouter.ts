import { Router } from "express";
import { authUser } from "./authController";
import { getUserInformation } from "./getController";
import { authCheckValidation, inputCheckErrorsMiddleware, registrationEmail, validationCode, userInputValidation } from "../middlewares/middlewareForAll";
import { bearerAuth } from "../middlewares/middlewareForAll";

export const authRouter = Router();

authRouter.post("/login", authCheckValidation, inputCheckErrorsMiddleware, authUser);
authRouter.post("/registration-confirmation", validationCode, inputCheckErrorsMiddleware, authUser);
authRouter.post("/registration", userInputValidation, inputCheckErrorsMiddleware, authUser);
authRouter.post("/registration-email-resending", registrationEmail, inputCheckErrorsMiddleware, authUser);
authRouter.get("/me", bearerAuth, getUserInformation);
