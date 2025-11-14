const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const { MongoClient } = require('mongodb');
const dbConfig = require('./dbConfig.json'); // load your config

const app = express();
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Build MongoDB URI using config
const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = 'myAppDB';

let usersCollection;
let progressCollection;

async function connectDB() {
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db(dbName);
  usersCollection = db.collection('users');
  progressCollection = db.collection('progress');
}
connectDB().catch(console.error);

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const newToken = uuid.v4();
    await usersCollection.updateOne(
      { email: user.email },
      { $set: { token: newToken } }
    );
    setAuthCookie(res, newToken);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await usersCollection.updateOne(
      { email: user.email },
      { $unset: { token: "" } }
    );
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/progress', verifyAuth, async (req, res) => {
  const items = await progressCollection.find().sort({ _id: -1 }).toArray();
  res.send(items);
});

apiRouter.post('/progress', verifyAuth, async (req, res) => {
  if (!req.body.msg) {
    return res.status(400).send({ msg: 'Missing message' });
  }
  await progressCollection.insertOne({ msg: req.body.msg, createdAt: new Date() });
  const items = await progressCollection.find().sort({ _id: -1 }).toArray();
  res.send(items);
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  await usersCollection.insertOne(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return await usersCollection.findOne({ [field]: value });
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
