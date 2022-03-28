const quizService = require('../services/quizService')

class QuizController{
    async getAllActiveQuiz(req,res,next){
        const quizzes = await quizService.getAllActiveQuiz()
        if(quizzes)
            return res.json({warning:false, data:quizzes})
        return res.json({warning:true, message:"нет доступны викторин"})
    }
    
    async getAllQuiz(req, res, next){
        const quizzes = await quizService. getAllQuiz()
        if(quizzes)
            return res.json({warning:false, data:quizzes})
        return res.json({warning:true, message:"нет доступны викторин"})
    }
}

module.exports = new QuizController()