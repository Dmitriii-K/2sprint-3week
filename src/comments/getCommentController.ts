import { Request, Response } from "express";
import { CommentViewModel } from "../input-output-types/comments-type";
import { CommentQueryRepository } from "./commentQueryRepositiry";

export const getComment = async (req: Request, res: Response<CommentViewModel>) => {
  try {
    const comment = CommentQueryRepository.findCommentById(req.params.id);
    if(comment) {
      res.status(200).json(comment)
    };
    res.sendStatus(404);
    return;
    } catch (error) {
      console.log(error);
      return res.sendStatus(505);
    }
};