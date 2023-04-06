const QuizLimitModel = require('../models/QuizLimitModel')
const QuizLimitDto = require('../dtos/QuizLimitDto')

class QuizLimitService {
    async getListAll(){
        try{
            const quizLimitDb = await QuizLimitModel.find()
            if(quizLimitDb){
                const quizLimitList = []
                quizLimitDb.forEach(q=>quizLimitList.push(new QuizLimitDto(q)))
                return {warning:false, data:quizLimitList}
            }else{
                return {warning:false, data:[]}
            }
        }catch (e){
            console.log(e)
            return {warning:true, message:'Ошибка БД. '+e.message}
        }
    }
    async createUserLimit(userId, quizList){
        try{
            const quizLimitDb = await QuizLimitModel.findOne({user:userId})
            if (quizLimitDb){
                await QuizLimitModel.findOneAndUpdate({user:userId}, { quizzesOpen:quizList})
            }else{
                await QuizLimitModel.create({user:userId, quizzesOpen:quizList})
            }
            const quizLimit = await QuizLimitModel.findOne({user:userId})
            return {warning:false, data: new QuizLimitDto(quizLimit)}
        }catch (e){
            console.log(e)
            return {warning:true, message:'Ошибка БД. '+e.message}
        }
    }

    async removeQuizLimit(id){
        try{
            await QuizLimitModel.findOneAndRemove(id)
            return {warning:false, data:id}
        }catch (e){
            console.log(e)
            return {warning:true, message:'Ошибка БД. '+e.message}
        }
    }

    async getLimitByUserId(userId){
        try{
            const quizLimitDb = await QuizLimitModel.findOne({user:userId})
            if (quizLimitDb){
                return quizLimitDb.quizzesOpen
            }else{
                return null
            }
        }catch (e){
            console.log(e)
            return null
        }
    }
}


module.exports = new QuizLimitService()