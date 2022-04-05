import crypto from "crypto";
import * as bcrypt from "bcrypt";
import {loadConfig} from "./index";

const config = loadConfig('common');

export default {

    /**
     *
     * @param {number} size
     * @param {string} encoding
     * @returns {*}
     */
    async generateToken(size = 32, encoding = "hex") {
        const token = crypto.randomBytes(size).toString(encoding);
        const tokenHash = await bcrypt.hash(token, Number(config.BCRYPT_SALT));

        return {
            token,
            tokenHash,
        };
    },


    /**
     *
     * @param {string} originToken
     * @param {string} hashedToken
     * @returns {*}
     */
    compareTokens(originToken, hashedToken) {
        return bcrypt.compare(originToken, hashedToken);
    }
}
