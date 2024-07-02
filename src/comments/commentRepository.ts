import { commentCollection } from "../db/mongo-db";
import { ObjectId } from "mongodb";

export class CommetRepository {
    static async updateComment (id: string) {
        const mongoId = new ObjectId(id);
        const findComment = await commentCollection.findOne({ _id: mongoId });


        const updateComment = await commentCollection.updateOne({ _id: mongoId },{$set: {content: req.body.content,},
        });
        
    };
    static async findUserByComment (id: string) {
        const mongoId = new ObjectId(id);
        const foundComment = await commentCollection.findOne({ _id: mongoId });
        if (id.toString() !== foundComment.commentatorInfo.userId.toString()) {
            return false;
        }
        return true;
    }
    static async deleteComment(id: string) {
        const mongoId = new ObjectId(id);
        const comment = await commentCollection.deleteOne({_id: mongoId});
        if (comment.deletedCount === 1) {
            return true;
        };
        return false;
    }
}