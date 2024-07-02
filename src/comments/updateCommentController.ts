import { Request, Response } from "express";
import {ComId} from "../input-output-types/eny-type";
import { CommentInputModel, CommentViewModel } from "../input-output-types/comments-type";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
import { CommetRepository } from "./commentrepository";
// import { commentCollection } from "../db/mongo-db";
// import { ObjectId } from "mongodb";

export const updateComment = async (req:Request< ComId, {}, CommentInputModel>, res:Response<CommentViewModel | OutputErrorsType>) => {
    try {
        // const id = new ObjectId(req.params.id);
        // const findComment = await commentCollection.findOne({ _id: id });
        const findComment = await CommetRepository.findUserByComment(req.params.id)
        if (!findComment) {
          res.sendStatus(404);
        } else {
          if (req.user._id.toString() !== findComment.commentatorInfo.userId.toString()) {
            res.sendStatus(403); 
            return; 
          }
          // await commentCollection.updateOne(
          //   { _id: id },
          //   {
          //     $set: {
          //       content: req.body.content,
          //     },
          //   }
          // );
          const succsesUpdate = await CommetRepository.updateComment(req.params.id);
          if(succsesUpdate) {
            res.sendStatus(204);
          }
        }
        return;
      } catch (error) {
        console.log(error);
        res.sendStatus(404)
      }
};