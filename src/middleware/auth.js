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
    // TODO probably not needed to use
    const token = searchToken(req).replace('Bearer ', '');

    if (!token) {
        return res
            .status(CLIENT_ERROR_STATUSES.FORBIDDEN)
            .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.FORBIDDEN]());
    }

    try {
        const userHash = parseToken(token);
        const UserRepository = getRepository(User);
        req.token = token;
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
 * @param req
 * @param res
 * @param next
 * @returns {Promise<any>}
 */
const verifyNonAuthUser = async (req, res, next) => {
    const token = searchToken(req).replace('Bearer ', '');

    if (!token) {
        return next();
    }

    try {
        const repository = getRepository(User);
        const userHash = parseToken(token);

        if (userHash.email) {
            req.user = await repository.findOne(
                {
                    email: userHash.email
                }
            );
        }

    } catch (err) {
        return res
            .status(CLIENT_ERROR_STATUSES.UNAUTHORIZED)
            .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.UNAUTHORIZED]());
    }

    req.token =  token;

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

const parseToken = (token) => {
    return jwt.verify(token, config.TOKEN_KEY);
}


const searchToken = (req) => {
    return (
        req.body.token ||
        req.query.token ||
        req.headers["authorization"] ||
        '');
}

export {
    verifyToken,
    verifyNonAuthUser,
    generateToken
};
