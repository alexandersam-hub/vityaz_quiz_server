const QuizModel = require('../models/QuizModel')
const QuizDto = require('../dtos/QuizDto')
const UserQuizModel = require('../models/UserQuizModel')
const UserQuizDto = require('../dtos/UserQuizDto')

const quizLimitService = require('./QuizLimitService')

class QuizService{

    async getAllActiveQuiz(userId){
        try {
            const quizzes = await QuizModel.find({isActive: true})
            const userQuizzes = await UserQuizModel.find({user:userId})
            const quizLimit = await quizLimitService.getLimitByUserId(userId)
            if (quizzes){
                const quizzesDto = []
                if (quizLimit) {
                    quizzes.forEach(quiz => {
                        if (quizLimit.find(ql=>ql===quiz.id))
                            quizzesDto.push({...new QuizDto(quiz)})
                    })
                }
                else {
                    quizzes.forEach(quiz => {
                        quizzesDto.push({...new QuizDto(quiz)})
                    })
                }
                if (userQuizzes){
                    userQuizzes.forEach(uq=>{
                        quizzesDto.push({...new UserQuizDto(uq)})
                    })
                }
                return quizzesDto
            }

            return null
        }
        catch (e) {
            console.log(e)
            return null
        }
    }
    async getAllQuiz(){
        try {
            const quizzes = await QuizModel.find()
            if (quizzes){
                const quizzesDto = []
                quizzes.forEach(quiz=>{
                    quizzesDto.push({...new QuizDto(quiz)})
                })
                return quizzesDto
            }

            return null
        }
        catch (e) {
            console.log(e)
            return null
        }
    }

    async getQuizById(quizId){
        try {

            const quiz = await QuizModel.findById(quizId)

            if(quiz)
                return {...new QuizDto(quiz)}
            return null
        }
        catch (e) {
            return null
        }
    }

}

module.exports = new QuizService()