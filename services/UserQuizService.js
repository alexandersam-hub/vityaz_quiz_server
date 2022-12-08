const UserQuizModel = require('../models/UserQuizModel')
const UserQuizDto = require('../dtos/UserQuizDto')
const userQuestionDto = require('../dtos/UserQuestionDto')

class UserQuizController{
    
    async userQuizesGetByUserId(userId){
        try{
            const userQuizesDb = await UserQuizModel.find({user:userId})
            const userQuizes = []
            userQuizesDb.forEach(quiz=>userQuizesDb.push(new UserQuizDto(quiz)))

            return userQuizes
        }
        catch (e) {
            return []
        }
    }

    async getUserQuizById(userQuizId, userId){
        try{
            const userQuizBd = await UserQuizModel.findById(userQuizId)
            if(userQuizBd.user!==userId){
                return {warning:true, message:'Нет прав на редактирование викторины'}
            }
            const userQuiz = []
            userQuizBd.tasks.forEach((task)=>{
                userQuiz.push({...new userQuestionDto(task)})
            })
            return {warning:false, quiz: {title:userQuizBd.title, tasks:userQuiz, id:userQuizBd.id.toString()}}
        } catch (e) {
            console.log(e)
            return {warning:true, message:'Ошибка БД: '+e}
        }
    }

    async getQuestionsByUserQuizId(userQuizId){
           try{
                const userQuestionBd = await UserQuizModel.findById(userQuizId)
               if(!userQuestionBd)
                   return []
               const userQuestions = []
               userQuestionBd.tasks.forEach((task)=>{
                   userQuestions.push({...new userQuestionDto(task)})
               })
               return userQuestions
           } catch (e) {
               console.log(e)
               return null
           }
    }
    async getUserQuizName(userQuizId){
        try{
           const userQuiz = await UserQuizModel.findById(userQuizId)
            return userQuiz.title
        } catch (e) {
            console.log(e)
            return ''
        }
    }
    async createdUserQuiz(userId, quiz){
        try{
            const newUserQuiz = await UserQuizModel.create({...quiz, user:userId, category:"Россия"})
            return {warning:false, quiz:newUserQuiz}
        }catch (e) {
            return {warning:true, message:'Ошибка при добавлении викторины: '+ e}
        }
    }

    async updateUserQuiz(quiz){
       try{
           if(!quiz.id)
               return {warning:true, message: 'Не заполнено поле id'}
           const id = quiz.id
           delete (quiz.id)
           await UserQuizModel.findByIdAndUpdate(id, {...quiz})
           const newQuiz = await UserQuizModel.findById(id)
           return {warning:false, quiz:new UserQuizDto(newQuiz)}
       }catch (e) {
           return {warning:true, message:'Ошибка при обновлении викторины: '+ e}
       }
    }

    async removeUserQuiz(quizId){
        try{
            await UserQuizModel.findByIdAndDelete(quizId)
            return {warning:false, message:'Удален'}
        }catch (e) {
            return {warning:true, message:'Ошибка при удалении викторины: '+ e}
        }
    }

}

module.exports = new UserQuizController()