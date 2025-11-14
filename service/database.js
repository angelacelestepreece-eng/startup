const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let usersCollection;
let progressCollection;

(async function connectDB() {
  try {
    await client.connect();
    const db = client.db('startup');
    usersCollection = db.collection('users');
    progressCollection = db.collection('progress');
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return usersCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return usersCollection.findOne({ token: token });
}

async function addUser(user) {
  await usersCollection.insertOne(user);
}

async function updateUser(user) {
  await usersCollection.updateOne({ email: user.email }, { $set: user });
}

async function addProgress(progress) {
  return progressCollection.insertOne(progress);
}

function getProgress() {
    return progressCollection.find({}).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addProgress,
  getProgress,
};
