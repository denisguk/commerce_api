import jwt from "jsonwebtoken";
import {getRepository} from "typeorm";
import {User} from "../entity/User/User";
import {loadConfig} from "../utils";
import {CLIENT_ERROR_STATUSES, CLIENT_ERRORS} from "../utils/responseCodes";

const config = loadConfig('common');

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const verifyToken = async (req, res, next) => {
    const token = (req.body.token || req.query.token || req.headers["authorization"] || '').replace('Bearer ', '');

    if (!token) {
        return res
            .status(CLIENT_ERROR_STATUSES.FORBIDDEN)
            .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.FORBIDDEN]());
    }

    try {
        const userHash = jwt.verify(token, config.TOKEN_KEY);
        const UserRepository = getRepository(User);
        req.user = await UserRepository.findOne({email: userHash.email});
    } catch (err) {
        return res
            .status(CLIENT_ERROR_STATUSES.UNAUTHORIZED)
            .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.UNAUTHORIZED]());
    }

    return next();
};

/**
 *
 * @param {string} username
 * @param {boolean} rememberMe
 * @returns {string}
 */
const generateToken = ({email}, rememberMe) => {
    const expiresIn = rememberMe ? '7d' : '24h';

    return jwt.sign(
        {
            email
        },
        config.TOKEN_KEY,
        {
            expiresIn
        });
};

export {
    verifyToken,
    generateToken
};
