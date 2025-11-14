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
    console.error(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return usersCollection.findOne({ email });
}

function getUserByToken(token) {
  return usersCollection.findOne({ token });
}

async function addUser(user) {
  await usersCollection.insertOne(user);
}

async function updateUser(user) {
  const { email, ...updates } = user;
  await usersCollection.updateOne({ email }, { $set: updates });
}

async function clearToken(email) {
  await usersCollection.updateOne({ email }, { $unset: { token: "" } });
}

async function addProgress(progress) {
  return progressCollection.insertOne({
    ...progress,
    createdAt: new Date(),
  });
}

function getProgress(email) {
  return progressCollection.find({ email }).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  clearToken,
  addProgress,
  getProgress,
};
