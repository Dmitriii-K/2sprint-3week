import { Request, Response } from "express";
import { commentCollection } from "../db/mongo-db";
import { ComId } from "../input-output-types/eny-type";
import { ObjectId } from "mongodb";

export const deleteComment = async (req: Request<ComId>, res: Response) => {
    try {
        const id = new ObjectId(req.params.id);
        const foundComment = await commentCollection.findOne({ _id: id });
        if (foundComment) {
          if (req.user._id.toString() !== foundComment.commentatorInfo.userId.toString()) {
            res.sendStatus(403); 
            return; 
          }
          await commentCollection.deleteOne({ _id: id });
          res.sendStatus(204);
          return;
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(404);
      }
};