import jwt from "jsonwebtoken";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
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
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const username = jwt.verify(token, config.TOKEN_KEY);
        const UserRepository = getRepository(User);
        req.user = await UserRepository.findOne({email: username});
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
const generateToken = ({username}, rememberMe) => {
    const expiresIn = rememberMe ? '7d' : '1h';

    return jwt.sign({
        username
    }, config.TOKEN_KEY, { expiresIn });
};

module.exports = {
    verifyToken,
    generateToken
};
