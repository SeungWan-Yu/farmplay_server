const multer = require('multer')
const upload = multer({dest: 'images/'}) //dest : 저장 위치

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

module.exports.post('/upload',upload.single('uploaded_file') = ( req,res,next) => {
    const results = {
        result : "네네네네네네"
    }
    try{
        // res.json(req.file.filename)
        result = req.file
        res.send(results)
        console.log(req.file)
    } catch(err){
        next(err)
    }
}