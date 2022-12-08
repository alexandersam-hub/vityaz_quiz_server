const {Schema, model} = require('mongoose')

const UserQuiz = new Schema({
    user:{type:String},
    title:{type:String, required:true},
    tasks:{type:[Object]},
    category:{type:String},
    description:{type:String},
    img:{type:String},


})

module.exports = model('UserQuiz', UserQuiz)