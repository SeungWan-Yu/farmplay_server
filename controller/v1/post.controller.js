module.exports.post = ( req,res,next) => {
    try{
        console.log(req.body)
        return res.send(req.body)
    } catch(err){
        next(err)
    }
}