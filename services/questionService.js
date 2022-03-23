const QuestionModel = require('../models/QuestionModel')
const QuestionDto = require('../dtos/QuestionDto')
class QuestionService{

    async getQuestionByQuizId(quizId){
        const questions = await QuestionModel.find({quiz:quizId, isActive:true})
        if(!questions)
            return null
        const questionsDto = []
        questions.forEach(question=>{
            questionsDto.push({...new QuestionDto(question)})
        })
        return questionsDto
    }

}

module.exports = new QuestionService()