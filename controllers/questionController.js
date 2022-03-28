const questionService = require('../services/questionService')

class QuestionController {

   async getQuestionById(req, res, next) {
       try {
           const {quizId} = req.body
           const questions = await questionService.getQuestionByQuizId(quizId)
           if (questions) {
               return res.json({warning: false, data: questions})
           }
           return res.json({warning: true, message: "Нет доступных заданий для выбранного квеста"})
       }
       catch (e) {
           console.log(e)
           next(e)
       }
   }
    async getAllQuestionById(req, res, next) {
        try {
            const {quizId} = req.body
            const questions = await questionService.getAllQuestionByQuizId(quizId)
            if (questions) {
                return res.json({warning: false, data: questions})
            }
            return res.json({warning: true, message: "Нет доступных заданий для выбранного квеста"})
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }

}

module.exports = new QuestionController()