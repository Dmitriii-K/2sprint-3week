import {randomUUID} from "crypto";
import {add} from "date-fns"; 
import { RegistrationUser } from "../input-output-types/auth-type";
import { UserInputModel } from "../input-output-types/users-type";
import { UserRepository } from "../users/userRepository";
import { bcryptService } from "../adapters/bcrypt";

export const authService = {
    async registerUser(data:UserInputModel) {
        const user = await UserRepository.findUserByLogiOrEmail({login: data.login, email: data.email});
        if (user) return null;
 //проверить существует ли уже юзер с таким логином или почтой и если да - не регистрировать
        const password = await bcryptService.createHashPassword(data.password)//создать хэш пароля
        const newUser: RegistrationUser = { // сформировать dto юзера
            login: data.login,
            email: data.email,
            password,
            createdAt: new Date().toString(),
            emailConfirmation: {    // доп поля необходимые для подтверждения
                confirmationCode: randomUUID(),
                expirationDate: (add(new Date(), {hours: 1, minutes: 30,})).toISOString(),
                isConfirmed: false
            }
        };
        await UserRepository.createUser(newUser); // сохранить юзера в базе данных
        return newUser;
        
    },
    async confirmEmail(code: string) {

    }
};
