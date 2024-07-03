import { userCollection } from "../db/mongo-db";

export class AuthRepository {
    static async findUserByLogiOrEmail (data: {login: string, email:string}) {
        return userCollection.findOne({ $or: [{ login: data.login }, { email: data.email }] });
    }
    static async findUserByCode (confirmationCode: string) {
        return userCollection.findOne({code: confirmationCode});
    }
    static async resendMail (mail: string) {
        return userCollection.findOne({email: mail});
    }
}