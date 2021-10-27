const admin = require('firebase-admin');

var serviceAccount = require('../farmplay/serviceAccountKey.json');

  admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "dB_URL"
    });
module.exports = admin;