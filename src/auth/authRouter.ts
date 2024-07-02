import { Router } from "express";
import { authLoginUser } from "./authLoginController";
import { getUserInformation } from "./getController";
import { authCheckValidation, inputCheckErrorsMiddleware, registrationEmail, validationCode, userInputValidation } from "../middlewares/middlewareForAll";
import { bearerAuth } from "../middlewares/middlewareForAll";

export const authRouter = Router();

authRouter.post("/login", authCheckValidation, inputCheckErrorsMiddleware, authLoginUser);
authRouter.post("/registration", userInputValidation, inputCheckErrorsMiddleware, authregistration);
authRouter.post("/registration-confirmation", validationCode, inputCheckErrorsMiddleware, authUser);
authRouter.post("/registration-email-resending", registrationEmail, inputCheckErrorsMiddleware, authUser);
authRouter.get("/me", bearerAuth, getUserInformation);
