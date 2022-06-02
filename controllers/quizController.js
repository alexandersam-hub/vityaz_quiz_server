const quizService = require('../services/quizService')
const tokenService = require('../services/tokenService')

class QuizController{
    async getAllActiveQuiz(req,res,next){
        const {token} = req.body
        if(token){
            const userId = tokenService.validationToken(token).id
            const quizzes = await quizService.getAllActiveQuiz(userId)
            if(req.body.marker && req.body.marker === 'not_description')
                return res.json({warning:false, data:quizzes, marker:'not_description'})
            return res.json({warning:false, data:quizzes})
        }else{
            return {warning:true, message:'Пользователь не авторизован'}
        }

        // return res.json({warning:true, message:"нет доступны викторин"})
    }
    
    async getAllQuiz(req, res, next){
        const quizzes = await quizService. getAllQuiz()
        if(quizzes)
            return res.json({warning:false, data:quizzes})
        return res.json({warning:true, message:"нет доступны викторин"})
    }
}

module.exports = new QuizController()