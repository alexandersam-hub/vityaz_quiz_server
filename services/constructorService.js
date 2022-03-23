
const QuestionModel = require('../models/QuestionModel')
const QuizModel = require('../models/QuizModel')

class ConstructorService{

    async addQuiz(quizDto){
        try {

            const quizDB = await QuizModel.findOne({title:quizDto.title})
            if(quizDB)
                return {warning:true, message:`Викторина ${quizDto.title} уже существует`}
            delete (quizDto.id)
            const newQuiz = await QuizModel.create({...quizDto})
            if(newQuiz)
                return {warning:false, message:`Викторина ${quizDto.title} добавлена`}
            return {warning:true, message:`Викторина ${quizDto.title} не добавлена`}
        }
     catch (e) {
         console.log(e)
         return {warning:true, message:`Викторина ${quizDto.title} не добавлена. Ошибка записи в БД`}
     }
    }

    async addQuestion(questionDto){
        try {
            delete (questionDto.id)
            const newQuestion = await QuestionModel.create({...questionDto})
            if(newQuestion)
                return {warning:false, message:`Вопрос ${questionDto.title} добавлен в викторину`}
            return {warning:true, message:`Вопрос ${questionDto.title} не был добавлен. Ошибка БД`}
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:`Вопрос ${questionDto.title} не был добавлен. Исключение БД`}
        }
    }
}

module.exports = new ConstructorService()
