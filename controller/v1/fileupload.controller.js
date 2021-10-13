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
    const multer = require('multer')
    const upload = multer({dest: 'images/'}) //dest : 저장 위치
    try{
        res.json(req.file)
        console.log(req.file)
    } catch(err){
        next(err)
    }
}