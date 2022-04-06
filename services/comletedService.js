const CompletedModel = require('../models/CompletedModel')

class CompletedService{

    async addCompleted(userId, quizId, description=''){
        // try{
            const currentCompleted = await CompletedModel.findOne({quiz:quizId, user:userId})
            const now = new Date()
            if(currentCompleted){
                currentCompleted.count+=1
                currentCompleted.dates.push(now)
                await currentCompleted.save()
            }
            else {
                await CompletedModel.create({quiz:quizId, user:userId, count:1, dates:[now], description})
            }
            return {warning:false, message:'Прохождение викторины добавлено'}
        // }
        // catch (e) {
        //     return {warning:true, message:'Прохождение не добавлено. '+ e}
        // }

    }
}

module.exports = new CompletedService()
