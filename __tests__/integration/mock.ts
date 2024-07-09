import { sendMailService } from "../../src/adapters/sendEmail";

const nodemailer = require("nodemailer");


export const emailServiceMock: typeof sendMailService = {
    async sendMail(email: string, confirmationCode: string){
        return true;
    }
}