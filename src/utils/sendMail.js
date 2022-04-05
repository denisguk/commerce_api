import nodemailer from 'nodemailer';
import {loadConfig} from "./index";

const config = loadConfig('common');

const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.EMAIL_TRANSPORT.HOST,
            service: config.EMAIL_TRANSPORT.SERVICE,
            port: config.EMAIL_TRANSPORT.PORT,
            secure: true,
            auth: {
                user: config.EMAIL_TRANSPORT.USER,
                pass: config.EMAIL_TRANSPORT.PASS,
            },
        });

        return transporter.sendMail({
            from: config.EMAIL_TRANSPORT.USER,
            to: email,
            subject: subject,
            html: html,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

export default sendEmail;
