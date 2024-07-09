import { authService } from '../../src/auth/authService';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, userCollection, db } from '../../src/db/mongo-db';
import { testSeeder } from './test.seeder';
import { sendMailService } from '../../src/adapters/sendEmail';
import { MongoClient } from 'mongodb';

describe('authService integration tests', () => {

    // beforeAll(async () => {
    //     const mongoServer = await MongoMemoryServer.create();
    //     const mongoUri = mongoServer.getUri();
    //       // Подключите базу данных к Вашему приложению
    //     await db.run(mongoUri);
    //     });
    // beforeEach(async () => {
    //     await db.drop();
    // })
    // afterAll(async () => {
    //     await db.drop();
    //     await db.stop();
    // });
    // afterAll((done) => done());

    // beforeAll(async () => {
    // const mongoServer = await MongoMemoryServer.create(); 
    // const uri = mongoServer.getUri(); 
    // const client = new MongoClient(uri); 
    // await client.connect(); 
    // const db = client.db('testdb'); 
    // console.log(`MongoDB in-memory server started at ${uri}`);
    // })

    // beforeAll(async () => {
    //     await connectDB();
    //     await userCollection.drop();
    // });
    // afterAll(async () => {
    //     await userCollection.drop();
    // });


    describe('checkCredentials user', () => {
        it('should return user if email is valid', async () => {
            const user = await authService.checkCredentials('testemail@gmail.com');
            expect(user).toBeTruthy();
        });
        it.skip('should return user if login is valid', async () => {
            const user = await authService.checkCredentials('testlogin');
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
            const data = testSeeder.createUserDto();
            const result = await registrationUser(data);
            const newUser = await authService.registerUser(result);
            expect(newUser).toBeDefined();
            expect(newUser.login).toEqual(result.login);
            expect(newUser.email).toBe(result.email);
            expect(newUser.emailConfirmation.isConfirmed).toBeFalsy();

            expect(sendMailService.sendMail).toBeCalled();
        });
    });

    describe('confirmEmail', () => {
        it('should confirm email with valid confirmation code', async () => {
            const validCode = 'validconfirmationcode';
            const result = await authService.confirmEmail(validCode);
            expect(result).toBeTruthy();

        });

        it.skip('should return invalid inform', async () => {
            const invalidCode = '~invalid6 confirmation7 code9`';
            const result = await authService.confirmEmail(invalidCode);
            expect(result).toBeFalsy();
        });
    });

    describe('resendEmail', () => {
        it('should resend the confirmation email', async () => {
            const mail = "testemail@gmail.com";
            const result = await authService.resendEmail(mail);
            expect(result).toBeTruthy();
        });

        it.skip('should return false if the user is already confirmed', async () => {
            const mail = "testemail@gmail.com";
            const result = await authService.resendEmail(mail);
            expect(result).toBeFalsy();
        });
    });
});