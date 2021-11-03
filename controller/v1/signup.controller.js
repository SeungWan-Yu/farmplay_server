var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    try{
        const users = [
            {
                phone : '01011111111',
                pw : '111111'
            }
        ]
        return res.json({users})
    } catch(err){
        next(err)
    }
}
module.exports.post = ( req,res,next) => {
    const signupuser = {
        id : req.body.id,
        pw : req.body.pw,
        name : req.body.name,
        phone : req.body.phone,
        adress : req.body.adress,
        adressdetail : req.body.adressdetail,
        token : req.body.token
    }
    err
    console.log(signupuser)
    const results = {
        result : ""
    }
    console.log(signupuser);
    mysqlDB.query('insert into users (user_id,user_pw,user_name,user_phone,user_adress,user_adress_detail,token) values ("'+signupuser.id+'","'+signupuser.pw+'","'+signupuser.name+'","'+signupuser.phone+'","'+signupuser.adress+'","'+signupuser.adressdetail+'","'+signupuser.token+'");', function (err, rows, fields) {
        if (!err) {
            // console.log(rows);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
            console.log(result);
            res.send(results);
        } else {
            console.log('query error : ' + err);
            results.result = "fail"
            res.send(results);
        }
    });
}