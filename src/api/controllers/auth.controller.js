import {getRepository} from "typeorm";
import UserValidator from '../../entity/User/validators';
import {User} from '../../entity/User/User';
import {PasswordRecovery} from '../../entity/User/PasswordRecovery';
import {generateToken} from "../../middleware/auth";
import {validate} from "../../middleware/validation-result";
import {loadConfig, hashService, sendEmail} from "../../utils";

const config = loadConfig('common');

module.exports = (router) => {

    /**
     * Forgot password action
     */
    router.post(
        '/forgot_password',
        validate(UserValidator.getForgotPassword),
        async (req, res) => {
            const {email} = req.body;
            const UserRepository = getRepository(User);
            const user = await UserRepository.findOne({email});

            if (!user) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "User with this email is not exist"
                });
            }

            const PasswordRecoveryRepository = getRepository(PasswordRecovery);
            const existedToken = await PasswordRecoveryRepository.findOne({user: user.id});

            if (existedToken) {
                await PasswordRecoveryRepository.delete({id: existedToken.id});
            }

            const {token, tokenHash} = await hashService.generateToken();

            await PasswordRecoveryRepository.insert({
                hash: tokenHash,
                user: user,
            });

            const result = await sendEmail(
                user.email,
                "Password reset",
                `<a href="${config.CLIENT_URL}/forgot_password/restore?hash=${token}&email=${user.email}" target="_blank">Reset Password Link</a>`
            );

            return res.json({
                success: !!result?.response
            });
        });

    /**
     * Forgot password action
     */
    router.post(
        '/forgot_password/restore',
        validate(UserValidator.getForgotPasswordRestore),
        async (req, res) => {
            const {email, token, password, confirmPassword} = req.body;

            const UserRepository = getRepository(User);
            const user = await UserRepository.findOne({email});

            if (!user) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "User with this email is not exist"
                });
            }

            const PasswordRecoveryRepository = getRepository(PasswordRecovery);
            const passwordRecovery = await PasswordRecoveryRepository.findOne({user: user.id});

            if (!await hashService.compareTokens(token, passwordRecovery?.hash)) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "Sorry your token is not valid, please try it again."
                });
            }

            await PasswordRecoveryRepository.delete(passwordRecovery.id);
            await UserRepository.update({email}, {password});

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



