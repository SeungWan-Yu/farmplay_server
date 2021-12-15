
//파일 삭제함수
function dFile(path){
    console.log("파일 삭제함수 발동");
    console.log(path);
    const fs = require('fs');
    const directory = fs.existsSync(path)//디렉토리 경로 입력
    if(directory){
        try {
            fs.unlinkSync(path)
            console.log("파일삭제성공");
        } catch(err) {
            console.error(err)
        }
    }else{
        console.log("파일이 없다");
        return false;
    }
};


module.exports = dFile;