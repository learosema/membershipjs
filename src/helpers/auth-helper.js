const { jwtSign, jwtVerify } = require('./security-helpers');
const { User } = require('../entities/user');
const { getRepository } = require('typeorm');

const COOKIE_NAME = 'membership-js_authtoken';

async function getAuthUser(req) {
  if (req.cookies && typeof req.cookies[COOKIE_NAME] !== 'undefined') {
    try {
      const identity = await jwtVerify(req.cookies[COOKIE_NAME]);
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({
        name: identity.name,
      });
      if (!user) {
        return null;
      }
      identity.fullName = user.fullName || '';
      identity.role = user.role || 'user';
      return identity;
    } catch (ex) {
      return null;
    }
  }
  return null;
}

async function setAuthCookie(res, userName) {
  try {
    const identity = { userName };
    const token = await jwtSign(identity);
    res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: true });
  } catch (ex) {
    throw ex;
  }
}

function deleteAuthCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

async function requireAuth(req, res, next) {
  const user = await getAuthUser(req);
  req.user = user;
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

module.exports = { setAuthCookie, deleteAuthCookie, getAuthUser, requireAuth };
