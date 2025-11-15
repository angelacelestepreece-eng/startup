const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let db, userCollection, progressCollection;

async function init() {
  try {
    await client.connect();
    db = client.db('startup');
    userCollection = db.collection('user');
    progressCollection = db.collection('progress');
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.error(`Unable to connect to database with ${url} because ${ex.message}`);
    throw ex;
  }
}

function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addProgress(progress) {
  return progressCollection.insertOne(progress);
}

function getProgress() {
  return progressCollection.find().sort({ createdAt: -1 }).limit(10).toArray();
}

module.exports = {
  init,
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addProgress,
  getProgress,
};
