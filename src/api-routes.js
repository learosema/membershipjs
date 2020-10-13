const express = require('express');
const cookieParser = require('cookie-parser');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);
const saltRounds = 10;

const {
  requireAuth,
  setAuthCookie,
  deleteAuthCookie,
} = require('./helpers/auth-helper');
const db = require('./helpers/db');
const { User } = require('./entities/user');

const api = express.Router();
api.use(cookieParser());
api.use(express.json());

api.get('/version', (_, res) => {
  res.status(200).json({ version: '1.0.0' });
});

api.get('/secret', requireAuth, (_, res) => {
  res.status(200).json({ answer: 42 });
});

api.post('/register', async (req, res) => {
  const passwordHash = await hash(req.params.password, saltRounds);
  const userRepo = db.getRepository(User);
  const existing = await userRepo.findOne({ name: req.params.name });
  if (existing) {
    res.status(403).json({ error: 'User exists' });
    return;
  }
  const user = new User({
    name: req.params.name,
    email: req.params.email,
    passwordHash,
    role: 'user',
  });
  await userRepo.save(user);
  res.status(200).json({ result: 'Ok, registered user' });
});

api.get('/whoami', requireAuth, (_, res) => {
  res.status(200).json(req.user.name);
});

api.post('/login', async (req, res) => {
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOne({ name: req.params.name });
  let isValid = false;
  if (user) {
    isValid = await compare(req.params.password, user.passwordHash);
  }
  if (isValid) {
    setAuthCookie(res, userName);
    res.json({ result: 'Logged in' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

api.post('/logout', requireAuth, (_, res) => {
  deleteAuthCookie(res);
  res.json({ result: 'Logged out' });
});

module.exports = api;
