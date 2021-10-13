var mysqlDB = require('../../mysql-db');
const crypto = require('crypto');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from board', function (err, rows, fields) {
        if (!err) {
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(JSON.stringify(rows));
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}

module.exports.post = ( req,res,next) => {
    
    // crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(req.body.password, "KaBGz7ENRbxyUnKIDK9cAo7Rsxkqh8+X7LzT2xDk/FXDsA7BjhCKyKsJc9qxNA1OlVGg6VUE2VadDoAms8g", 102938, 64, 'sha512', (err, key) => {
          console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
          res.send(key.toString('base64'))
        });
    //   });
}