const completedService = require('../services/comletedService')
const tokenService = require('../services/tokenService')

class CompletedController{

    async addCompleted(req,res,next){
        try {
            const {token, quiz} = req.body
            const user = tokenService.validationToken(token)
            const result = await completedService.addCompleted(user.id, quiz)
            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:'Возникла ошибка при добавлении прогресса'})
        }


    }

}

module.exports = new CompletedController()