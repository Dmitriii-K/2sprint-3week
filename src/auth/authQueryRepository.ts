import { ObjectId } from "mongodb";
import { userCollection } from "../db/mongo-db";
import { MeViewModel } from "../input-output-types/auth-type";

export class AuthMe {
    static async getAuth (data: MeViewModel) {
        const userMe = await userCollection.findOne({_id: new ObjectId(data.userId)});
        if(!userMe) {
            return null;
        };
        return {email: userMe!.email, login: userMe!.login, userId: userMe!._id.toString()}
    }
}