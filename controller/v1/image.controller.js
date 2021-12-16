
exports.getImageList = ( req,res,next) => {

    const marker = [
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"},
        {img : "https://ifh.cc/g/rT0toy.png"}
    ]
    res.send(marker)
}

