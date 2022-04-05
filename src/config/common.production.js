export default {
    TOKEN_KEY: process.env.TOKEN_KEY,
    BCRYPT_SALT: 10,
    CLIENT_URL: "http://localhost:3000",
    EMAIL_TRANSPORT: {
        HOST: "smtp.gmail.com",
        SERVICE: "gmail",
        PORT: 587,
        USER: process.env.EMAIL_TRANSPORT_USER,
        PASS: process.env.EMAIL_TRANSPORT_PASS,
    }
}
