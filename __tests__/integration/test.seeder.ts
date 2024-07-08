import { randomUUID } from "crypto";
import { add } from "date-fns";

type RegisterUserType = {
    login: string,
    password: string,
    email: string,
    code?: string,
    expirationDate?: Date | string,
    isConfirmed?: boolean
}
type EmailConfirmationType = {
    confirmationCode: string;
    expirationDate: Date | string;
    isConfirmed: boolean;
}
type UserDB = {
    login: string;
    passwordHash: string;
    email: string;
    createdAt: string;
    emailConfirmation: EmailConfirmationType;
}

export const testSeeder = {
    createUserDto() {
        return{
            login:"testlogin",
            email: "testemail@gmail.com",
            password: "1234",
        }
    },
    // createUserDtos(count: number) {
    //     const users = [];

    //     for (let i = 0; i <= count; i++) {
    //         users.push({
    //             login: "testlogin" + i,
    //             email: "testemail${i}@gmail.com",
    //             password: '12345',
    //         })
    //     }
    //     return users;
    // },
    async registerUser({
        login,
        password,
        email,
        code,
        expirationDate,
        isConfirmed,
    }: RegisterUserType
    ) {
        const newUser: UserDB = {
            login,
            email,
            passwordHash: password,
            createdAt: new Date().toString(),
            emailConfirmation: {
                confirmationCode: code ?? randomUUID(),
                expirationDate: expirationDate ?? add(new Date(), {
                    minutes: 30,
                }).toISOString(),
                isConfirmed: isConfirmed ?? false,
            }
        };
        const res = await db.userCollection().insertOne({...newUser})
        return {
            id: res.insertedId.toString(),
            ...newUser
        }
    }
}