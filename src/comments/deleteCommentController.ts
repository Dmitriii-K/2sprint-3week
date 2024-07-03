import { Request, Response } from "express";
import { CommetRepository } from "./commentRepository";

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const findUserById = await CommetRepository.findUserByComment(req.user.id);
    if(!findUserById) {
      res.sendStatus(403);
      return;
    }
    const deleteComment = await CommetRepository.deleteComment(req.params.id);
    if (deleteComment) {
      res.sendStatus(204);
      return;
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(505);
  }
}


