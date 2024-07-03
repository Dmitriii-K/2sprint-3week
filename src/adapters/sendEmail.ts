import { SETTINGS } from "../settings";
const nodemailer = require("nodemailer");

export const sendMailService = {
    async sendMail (confirmationCode: string) {
        try {
            const transporter = nodemailer.createTransport({
                service: "smtp.mail.ru",
                port: 465, // 587 for false
                secure: true, // Use `true` for port 465, `false` for all other ports
                auth: {
                user: "Aid2312@mail.ru",
                pass: SETTINGS.PASSWORD_BY_EMAIL,
                },
            });
                const info = await transporter.sendMail({
                from: 'Dmitry <Aid2312@mail.ru>', // sender address
                to: "Aid8679779@mail.ru", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello bro!", // plain text body
                html: ` <h1>Thank for your registration</h1>
                <p>To finish registration please follow the link below:
                <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
                </p>`, // html body
                });
        } catch (error) {
            console.error('Send email error', error); //залогировать ошибку при отправке сообщения
        }
    }
}
