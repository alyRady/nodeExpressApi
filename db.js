const firebase = require('firebase-admin');
const config = require('./config');
const serviceAccount = require('./nodeexpress-5b504-firebase-adminsdk-l9cej-822a2ac6cf.json');

const db = firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
});

module.exports = db;
