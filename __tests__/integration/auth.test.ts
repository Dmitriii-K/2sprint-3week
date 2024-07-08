import { authService } from '../../src/auth/authService';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, userCollection, db } from '../../src/db/mongo-db';
import { testSeeder } from './test.seeder';
import { sendMailService } from '../../src/adapters/sendEmail';

describe('authService integration tests', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
          // Подключите базу данных к Вашему приложению
        await db.run(mongoServer.getUri());
        });
    beforeEach(async () => {
        await db.drop();
    })
    afterAll(async () => {
        await db.drop();
        await db.stop();
    });
    afterAll((done) => done());

    describe('checkCredentials user', () => {
        it('should return user if email is valid', async () => {
            const user = await authService.checkCredentials('username@example.com');
            expect(user).toBeTruthy();
        });
        it('should return user if login is valid', async () => {
            const user = await authService.checkCredentials('login123');
            expect(user).toBeTruthy();
        });

        it.skip('should return null if user is not found', async () => {
            const user = await authService.checkCredentials('nonexistentuser@example.com');
            expect(user).toBeNull();
        });
    });

    describe('registerUser', () => {
        sendMailService.sendMail = jest.fn().mockImplementation((email: string, confirmationCode: string) => true);

        const registrationUser = authService.registerUser;
        it('should register a new user successfully', async () => {
            const {login, password, email} = testSeeder.createUserDto();
            const result = await registrationUser(login, password, email);
            const newUser = await authService.registerUser(result);
            expect(newUser).toBeDefined();
            expect(newUser.login).toEqual(result.login);
            expect(newUser.email).toBe(result.email);
            expect(newUser.emailConfirmation.isConfirmed).toBeFalsy();

            expect(sendMailService.sendMail).toBeCalled();
        });

        // it.skip('should not register user twice', async () => {
        //     const {login, password, email} = testSeeder.createUserDto();
        //     await testSeeder.registerUser({login, password, email});
        //     const result = await registrationUser(login, password, email);
        //     expect(result).toBe();
        // })
    });

    describe('confirmEmail', () => {
        it('should confirm email with valid confirmation code', async () => {
            const validCode = 'validconfirmationcode';
            const user = await authService.confirmEmail(validCode);
            expect(user).toBeTruthy();
            expect(user.emailConfirmation.isConfirmed).toBeFalsy();
            expect(user.emailConfirmation.confirmationCode).toEqual(validCode);
        });

        it.skip('should return invalid inform', async () => {
            const invalidCode = '~invalid6 confirmation7 code9`';
            const user = await authService.confirmEmail(invalidCode);
            expect(user).toBeFalsy();
            expect (user.emailConfirmation.isConfirmed).toBeTruthy();
        });
    });

    describe('resendEmail', () => {
        it('should resend the confirmation email', async () => {
            const mail = "testemail@gmail.com";
            const user = await authService.resendEmail(mail);
            expect(user).toBeTruthy();
            expect(user.emailConfirmation.isConfirmed).toBeFalsy();
        });

        it.skip('should return false if the user is already confirmed', async () => {
            const mail = "testemail@gmail.com";
            const user = await authService.resendEmail(mail);
            expect(user).toBeFalsy();
            expect(user.emailConfirmation.isConfirmed).toBeTruthy();
        });
    });
});