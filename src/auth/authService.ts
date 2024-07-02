import {randomUUID} from "crypto";
import add from "date-fns/add";
import { RegistrationUser } from "../input-output-types/auth-type";
import { UserInputModel } from "../input-output-types/users-type";
import { UserRepository } from "../users/userRepository";

export const authService = {
    async registerUser(data:UserInputModel) {
        const user = await UserRepository.findUserByLogiOrEmail({login: data.login, email: data.email});
        if (user) return null;
 //проверить существует ли уже юзер с таким логином или почтой и если да - не регистрировать

        const password = await bcryptService.generateHash(pass)//создать хэш пароля

        const newUser: RegistrationUser = { // сформировать dto юзера
            login,
            email,
            password,
            createdAt: new Date().toString(),
            emailConfirmation: {    // доп поля необходимые для подтверждения
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {hours: 1, minutes: 30,}),
                isConfirmed: false
            }
        };
        await usersRepository.create(newUser); // сохранить юзера в базе данных

//отправку сообщения лучше обернуть в try-catch, чтобы при ошибке(например отвалиться отправка) приложение не падало
        try {
            nodemailerService.sendEmail(//отправить сообщение на почту юзера с кодом подтверждения
                newUser.email,
                newUser.emailConfirmation.confirmationCode,
                emailExamples.registrationEmail);

        } catch (e: unknown) {
            console.error('Send email error', e); //залогировать ошибку при отправке сообщения
        }
        return newUser;
    },
};
