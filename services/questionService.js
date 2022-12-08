const QuestionModel = require('../models/QuestionModel')
const QuestionDto = require('../dtos/QuestionDto')
const QuizService = require('./quizService')
const categoryService = require('./categoryService')
const userQuizService = require('./UserQuizService')
const UserQuizDto = require('../dtos/UserQuizDto')

class QuestionService{

    async getQuestionByQuizId(quizId){
        const quiz = await QuizService.getQuizById(quizId)
        if(!quiz) {
            const userQuiz = await userQuizService.getQuestionsByUserQuizId(quizId)
            // if(userQuiz.user !== quizId)
            // //     return {questions:[], quizName:'', categoryImg:''}
            // else{
                const quizName = await userQuizService.getUserQuizName(quizId)
                return {questions:userQuiz, quizName, categoryImg:''}
            // }
        }
        else{
            const category = await categoryService.getCategoryByName(quiz.description)
            let categoryImg = ''
            if(!category.warning){
                categoryImg = category.category.img
            }
            const questions = await QuestionModel.find({quiz:quizId, isActive:true})
            if(!questions)
                return null
            const questionsDto = []
            questions.forEach(question=>{
                questionsDto.push({...new QuestionDto(question)})
            })
            return {questions:questionsDto, quizName:quiz.title, categoryImg}
        }

    }

    async getAllQuestionByQuizId(quizId){
        const quiz = await QuizService.getQuizById(quizId)
        const questions = await QuestionModel.find({quiz:quizId})
        if(!questions)
            return null
        const questionsDto = []
        questions.forEach(question=>{
            questionsDto.push({...new QuestionDto(question)})
        })
        return {questions:questionsDto, quizName:quiz.title}
    }
}

module.exports = new QuestionService()