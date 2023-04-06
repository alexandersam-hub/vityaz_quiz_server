const QuizLimitService = require('../services/QuizLimitService')

class QuizLimitController{

    async getQuizLimitList(req,res){
        const quizLimit = await QuizLimitService.getListAll()
        return res.json(quizLimit)
    }

    async createUserLimit(req,res){
        const {userId, quizList} = req.body
        if (!userId || !quizList)
            return res.json({warning:true, message:'Не заполены поля quizId или quizList'})

        const quizLimit = await QuizLimitService.createUserLimit(userId, quizList)
        return res.json(quizLimit)
    }

    async removeQuizLimit(req,res){
        const {id} = req.body
        if (!id)
            return res.json({warning:true, message:'Не заполены поля id'})

        const quizLimit = await QuizLimitService.removeQuizLimit(id)
        return res.json(quizLimit)
    }
}

module.exports = new QuizLimitController()