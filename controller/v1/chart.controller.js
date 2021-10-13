module.exports.get = ( req,res,next) => {
    try{
        const chart = [
            {
                time : 12,
                tem : 25,
                hum : 70
            },{
                time : 13,
                tem : 26,
                hum : 72
            },
            {
                time : 14,
                tem : 25,
                hum : 71
            },
            {
                time : 15,
                tem : 24,
                hum : 73
            },
            {
                time : 16,
                tem : 27,
                hum : 68
            } 
        ]
        return res.send(chart)
    } catch(err){
        next(err)
    }
}