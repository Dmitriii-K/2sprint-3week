import { userCollection } from "../db/mongo-db";
import { ObjectId } from "mongodb";
import { RegistrationUser } from "../input-output-types/auth-type";
import { UserDBModel } from "../input-output-types/users-type";


export class AuthRepository {
    static async findUserByLogiOrEmail (data: {login: string, email:string}) {
        return userCollection.findOne({ $or: [{ login: data.login }, { email: data.email }] });
    }
    
}