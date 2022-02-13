import {User} from '../../entity/User';
import {getRepository} from "typeorm";

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
        const UserRepository = getRepository(User);
        const user = await UserRepository.findOne({email: req.body.email});

        if (!user) {
            return res.status(403).json({
                code: "NOT_FOUND",
                message: "User with this email is not exist"
            });
        }

        if (user && user.password === req.body.password) {
            return res.json({
                success: true
            })
        }

        return res.status(403).json({
            code: "WRONG_PASSWORD",
            message: "Wrong email or password"
        });
    });

    return router;
}



