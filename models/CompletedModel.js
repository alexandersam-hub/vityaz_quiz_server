const {Schema, model} = require('mongoose')

const CompletedModel = new Schema({
    quiz:{type:Schema.Types.ObjectId, ref:'Quiz'},
    user:{type:Schema.Types.ObjectId, ref:'User'},
    count:{type:Number},
    dates:{type:[Date]},
    description:{type:[Object]},
    ip:{type:String}
})

module.exports = model('Completed', CompletedModel)