const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path');

class ImagesController{

    async uploadImages(req,res){
        // try{
            const randomString = uuid();
            const localStoragePath =   path.join(__dirname, '../', '/public/images')
        // console.log(req.body)
            const stream = fs.createWriteStream(`${localStoragePath}/${randomString}.png`);
            stream.on('finish', function () {
                return res.json({warning:false, data:{img:`${process.env.URL_SERVER}/api/image/get/${randomString}.png`}});
            });
            stream.write(Buffer.from(req.body.img), 'utf-8');
            stream.end();
        // }
        // catch (e) {
        //     return  res.json({warning:false, message:'Не дулось загрузить картинку'});
        // }

    }

    async getImages(req,res){
        fs.readFile('./public/images/'+req.params.id,(err, data)=>{
            if (err)
                res.end('404')
            res.setHeader("Content-Type", "image/png");
            res.end(data)
        })
    }
}

module.exports = new ImagesController()