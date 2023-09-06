
const mongoose = require('mongoose')

const order_schema = mongoose.Schema(
    {
        deliver:{type:Boolean,default:false},
        date:{type:Date,default:Date.now()},
        address: {type: String},
        title:{type:String},
        type:{type:String},
        quantity:{type:Number},
        amount:{type:Number},
        item: {type: mongoose.Schema.Types.ObjectId, ref:'items'},
        receiver: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    }
) 

module.exports = mongoose.model('orders',order_schema)