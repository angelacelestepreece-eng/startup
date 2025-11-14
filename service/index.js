const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: 'Missing email or password' });
    }

    if (await findUser('email', email)) {
      return res.status(409).send({ msg: 'Existing user' });
    }

    const user = await createUser(email, password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } catch (err) {
    next(err);
  }
});

apiRouter.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser('email', email);

    if (user && await bcrypt.compare(password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      return res.send({ email: user.email });
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    next(err);
  }
});

apiRouter.delete('/auth/logout', async (req, res, next) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      await DB.clearToken(user.email);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/progress', verifyAuth, async (req, res, next) => {
  try {
    const progress = await DB.getProgress(req.user.email);
    res.send(progress);
  } catch (err) {
    next(err);
  }
});

apiRouter.post('/progress', verifyAuth, async (req, res, next) => {
  try {
    if (!req.body.msg) {
      return res.status(400).send({ msg: 'Missing message' });
    }
    await DB.addProgress({ msg: req.body.msg, email: req.user.email });
    const items = await DB.getProgress(req.user.email);
    res.send(items);
  } catch (err) {
    next(err);
  }
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  if (field === 'token') return DB.getUserByToken(value);
  return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
