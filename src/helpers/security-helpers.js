const jsonwebtoken = require('jsonwebtoken');
const { env } = require('./env-helper');

/**
 * Sign a JWT, read secret from .env file
 *
 * @param payload the payload object
 * @param options the options
 * @returns promise
 */
export function jwtSign(payload, options = {}) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, env.JWT_SECRET, options, (err, encoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(encoded);
    });
  });
}

/**
 * Verify a JWT, read secret from .env file
 *
 * @param token
 * @param options
 */
export function jwtVerify(token, options = {}) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, env.JWT_SECRET, options, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
}
