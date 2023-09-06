
const mongoose = require('mongoose')

const order_schema = mongoose.Schema(
    {
        date:{type:Date,default:Date.now()},
        message: {type: String},
        title:{type:String},
        user: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    }
) 

module.exports = mongoose.model('notes',order_schema)