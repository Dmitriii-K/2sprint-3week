import { Router } from "express";
import { getComment } from "./getComments";
import { updateComment } from "./updateComments";
import { deleteComment } from "./deleteComments";
import { commentsValidation, inputCheckErrorsMiddleware } from "../middlewares/middlewareForAll";
import { bearerAuth } from "../middlewares/middlewareForAll";

export const commentsRouters = Router();

commentsRouters.get("/:id", getComment);
commentsRouters.put("/:id", bearerAuth, commentsValidation, inputCheckErrorsMiddleware, updateComment);
commentsRouters.delete("/:id", bearerAuth, deleteComment);