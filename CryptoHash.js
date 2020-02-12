/**
 * Code modified from:
 * https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/
 */
import crypto from 'crypto';

const hashSaltLength = 20

class CryptoHash {

    static generateRandomSalt() {
        return crypto.randomBytes(Math.ceil(hashSaltLength / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, hashSaltLength);   /** return required number of characters */
    };

    /**
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
     */
    static sha512 = function (password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    };

    static hashPasswordWithRandomSalt(password) {
        var salt = this.generateRandomSalt();
        return this.hashPasswordWithSalt(password, salt);
    }

    static hashPasswordWithSalt(password, salt) {
        var passwordData = this.sha512(password, salt);
        return passwordData;
    }

    static checkPassword(userPassword, salt, hash) {
        console.log("Validating Password");
        const userHashData = this.hashPasswordWithSalt(userPassword, salt);
        const userHash = userHashData.passwordHash;
        return hash == userHash;
    }
}

export default CryptoHash;