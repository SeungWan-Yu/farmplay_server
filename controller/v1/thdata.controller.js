module.exports.post = ( req,res,next) => {
    const result = 
        {
            result : "성공",
            htem : req.body.htem
        }
    
    try{
        console.log(req.body)
        return res.send(result)
    } catch(err){
        next(err)
    }
}