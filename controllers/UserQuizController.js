const userQuizService = require('../services/UserQuizService')
const tokenService = require('../services/tokenService')

class UserQuizController{
    async createUserQuiz(req,res){
        try{
            const {quiz, token} = req.body
            const userId =  tokenService.validationToken(token).id

            if(quiz){
                const result =  await userQuizService.createdUserQuiz(userId, quiz)
                return res.json(result)
            }else{
                return res.json({warning:true, message:'Не передана викторина'})
            }
        }catch (e) {
            return res.json({warning:true, message:'Ошибка при создании пользовательской викторины: '+ e})
        }
    }

    async updateUserQuiz(req,res){
        try{
            const {quiz} = req.body
            if(quiz){
                return res.json(await userQuizService.updateUserQuiz(quiz))
            }else{
                return res.json({warning:true, message:'Не передана викторина'})
            }
        }catch (e) {
            return res.json({warning:true, message:'Ошибка при изменении пользовательской викторины: '+ e})
        }
    }

    async removeUserQuiz(req, res){
        try{
            const {quiz_id} = req.body
            if(quiz_id){
                const result = await userQuizService.removeUserQuiz(quiz_id)
                return res.json(result)
            }else{
                return res.json({warning:true, message:'Нет поля quiz_id'})
            }
        }catch (e) {
            return res.json({warning:true, message:'Ошибка при удалении пользовательской викторины: '+ e})
        }
    }
    async getUserQuiz(req,res){
        try{
            const {quiz_id, token} = req.body
            const userId =  tokenService.validationToken(token).id

            if(quiz_id){
                const userQuiz = await userQuizService.getUserQuizById(quiz_id, userId)
                // console.log(userQuiz)
                return res.json(userQuiz)
            }else{
                return res.json({warning:true, message:'Нет поля quiz_id'})
            }
        }catch (e) {

        }
    }
}

module.exports = new UserQuizController()