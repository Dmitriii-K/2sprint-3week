import { sendMailService } from "../../src/adapters/sendEmail";

export const emailServiceMock: typeof sendMailService = {
    async sendMail(email: string, confirmationCode: string){
        return true;
    }
}