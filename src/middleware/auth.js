import jwt from "jsonwebtoken";
import {getRepository} from "typeorm";
import {User} from "../entity/User/User";
import {loadConfig} from "../utils";

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
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const userHash = jwt.verify(token, config.TOKEN_KEY);
        const UserRepository = getRepository(User);
        req.user = await UserRepository.findOne({email: userHash.email});
    } catch (err) {
        return res.status(401).send("Invalid Token");
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
    const expiresIn = rememberMe ? '7d' : '1h';

    return jwt.sign({
        email
    }, config.TOKEN_KEY, { expiresIn });
};

export {
    verifyToken,
    generateToken
};
