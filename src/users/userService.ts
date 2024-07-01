import { UserDBModel, UserInputModel } from "../input-output-types/users-type";
import bcrypt from 'bcryptjs'; 
import { UserRepository } from "./userRepository";


export class UserService {
    static async createUser (data:UserInputModel) {
        const userExist = await UserRepository.findUserByLogiOrEmail({login: data.login, email: data.email});
        if (userExist) {
            return false;
        };
        const saltRounds = 10;
        const password  = data.password;
        const salt = await bcrypt.genSalt(saltRounds);
        const userHashPassword = await bcrypt.hash(password, salt)

        const createDate = new Date().toISOString();
        const newUser: UserDBModel = {
        login: data.login,
        password: userHashPassword,
        email: data.email,
        createdAt: createDate,
        };
    return UserRepository.createUser(newUser);
    }
}