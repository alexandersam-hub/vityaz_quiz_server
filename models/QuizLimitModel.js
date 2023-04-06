const {Schema, model} = require('mongoose')

const QuizLimit = new Schema({
    user:{type:String, required:true},
    quizzesOpen:{type:[String]},
})

module.exports = model('QuizLimit', QuizLimit)