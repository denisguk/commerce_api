import {getRepository} from "typeorm";
import UserValidator from '../../entity/User/validators';
import {entities, fields} from '../../entity';
import {generateToken, verifyNonAuthUser} from "../../middleware/auth";
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
            const UserRepository = getRepository(entities.User);
            const user = await UserRepository.findOne({email});

            if (!user) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "User with this email is not exist"
                });
            }

            const PasswordRecoveryRepository = getRepository(entities.PasswordRecovery);
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
            const {email, token, password} = req.body;

            const UserRepository = getRepository(entities.User);
            const user = await UserRepository.findOne({email});

            if (!user) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "User with this email is not exist"
                });
            }

            const PasswordRecoveryRepository = getRepository(entities.PasswordRecovery);
            const passwordRecovery = await PasswordRecoveryRepository.findOne({user: user.id});

            if (!passwordRecovery || !await hashService.compareTokens(token, passwordRecovery.hash)) {
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
    router.post(
        `/login`,
        verifyNonAuthUser,
        async (req, res) => {
            const {
                token,
                body
            } = req;

            const inputFields = {
                email: body.email,
                password: body.password,
                rememberMe: Boolean(body.rememberMe),
            };

            const userRepository = getRepository(entities.User);
            const shoppingCartRepository = getRepository(entities.ShoppingCart);

            const user = await userRepository.findOne({
                [fields.User.email]: inputFields.email
            });

            if (!user) {
                return res.status(403).json({
                    code: "NOT_FOUND",
                    message: "User with this email is not exist"
                });
            }

            if (user && user[fields.User.password] !== inputFields.password) {
                return res.status(403).json({
                    code: "WRONG_PASSWORD",
                    message: "Wrong email or password"
                });
            }

            await shoppingCartRepository.update({
                [fields.ShoppingCart.token]: token
            }, {
                [fields.ShoppingCart.token]: null,
                [fields.ShoppingCart.user]: user[fields.User.id]
            })

            return res.json({
                token: await generateToken(
                    {
                        email: user[fields.User.email]
                    },
                    inputFields.rememberMe
                ),

                // TODO change it to serializer
                user: {
                    ...user,
                    password: undefined
                },

                shoppingCart: await shoppingCartRepository.findOne(
                    {
                        [fields.ShoppingCart.user]: user[fields.User.id]
                    },
                    {
                        relations: [
                            fields.ShoppingCart.items,
                            `${fields.ShoppingCart.items}.${fields.ShoppingCartItem.variant}`
                        ]
                    }
                )
            });
        });

    router.get('/token', async (req, res) => {
        return res.json({
            token: await generateToken(
                {
                    email: null,
                },
                true
            ),
        });
    })

    return router;
}



