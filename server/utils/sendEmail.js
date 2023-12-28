import nodemailer from 'nodemailer';

const sendEmail = async function (email,subject,message) {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure:false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    await transporter.sendMail({
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: subject,
        html: message
    });
}

export default sendEmail;