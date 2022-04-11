
const tokenService = require('../services/tokenService')
const completedService = require('../services/comletedService')

class CompletedController{

    async addCompleted(req,res,next){
        try {
            const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
            const {token, quiz} = req.body
            const user = tokenService.validationToken(token)
            const result = await completedService.addCompleted(user.id, quiz, ip)
            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:'Возникла ошибка при добавлении прогресса'})
        }


    }
    async getProgress(req,res,next){
        try{
            const progress =await completedService.getProgress()

            return res.json(progress)
        }catch (e) {
            next(e)
        }
    }


}

module.exports = new CompletedController()