const {Schema, model} = require('mongoose')

const InfoTokenModel = new Schema({

    user:{type:Schema.Types.ObjectId, ref:'User'},
    tokens:{type:[Object]},
    dateLastUpdate:{type:[Date]},
})

module.exports = model('InfoToken', InfoTokenModel)