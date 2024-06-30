import { Request, Response } from "express";
import { CommentDBType } from "../input-output-types/comments-type";
import { commentCollection } from "../db/mongo-db";
import { ComId } from "../input-output-types/eny-type";
import { mapComment } from "../posts/getCommentByPostId";
import { ObjectId } from "mongodb";

export const getComment = async (req: Request<ComId>, res: Response<CommentDBType>) => {
    try {
        const id = new ObjectId(req.params.id);
        const comment = await commentCollection.findOne({_id:id});
        if (comment) {
            const findComment = mapComment(comment);
            res.status(200).json(findComment);
          } else {
            res.sendStatus(404);
          }
    } catch (error) {
        console.log(error);
        res.sendStatus(404)
    }
};