import { userCollection } from "../db/mongo-db";
import { UserDBModel } from "../input-output-types/users-type";


export class UserRepository {
    static async createUser (user: UserDBModel) {
        const saveResult = await userCollection.insertOne(user);
        return saveResult.insertedId.toString();
    }
    static async findUserByLogiOrEmail (data: {login: string, email:string}) {
        return userCollection.findOne({ $or: [{ login: data.login }, { email: data.email }] });
    }
}