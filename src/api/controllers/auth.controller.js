import {User} from '../../entity/User';
import {getRepository} from "typeorm";
import {generateToken} from "../../middleware/auth";

module.exports = (router) => {

    /**
     * Forgot password action
     */
    router.post('/forgot_password', async (req, res) => {
        const UserRepository = getRepository(User);
        const user = await UserRepository.findOne({email: req.body.email});

        if (!user) {
            return res.status(403).json({
                code: "NOT_FOUND",
                message: "User with this email is not exist"
            });
        }

        // TODO send email with reset password link
        return res.json({
            success: true
        });
    });

    /**
     * Log In method
     */
    router.post(`/login/`, async (req, res) => {
        const inputFields = {
            email: req.body.email,
            password: req.body.password,
            rememberMe: Boolean(req.body.rememberMe),
        };

        const UserRepository = getRepository(User);
        const user = await UserRepository.findOne({email: inputFields.email});

        if (!user) {
            return res.status(403).json({
                code: "NOT_FOUND",
                message: "User with this email is not exist"
            });
        }

        if (user && user.password === inputFields.password) {
            return res.json({
                token: await generateToken(user.email, inputFields.rememberMe),
                // TODO change it to serializer
                user: {
                    ...user,
                    password: undefined
                },
            });
        }

        return res.status(403).json({
            code: "WRONG_PASSWORD",
            message: "Wrong email or password"
        });
    });

    return router;
}



