const jsonwebtoken = require('jsonwebtoken');

/**
 * Sign a JWT, read secret from .env file
 *
 * @param payload the payload object
 * @param options the options
 * @returns promise
 */
function jwtSign(payload, options = {}) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      payload,
      process.env.JWT_SECRET || 'superSecrect',
      options,
      (err, encoded) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(encoded);
      }
    );
  });
}

/**
 * Verify a JWT, read secret from .env file
 *
 * @param token
 * @param options
 */
function jwtVerify(token, options = {}) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET || 'superSecrect',
      options,
      (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decoded);
      }
    );
  });
}

module.exports = { jwtSign, jwtVerify };
