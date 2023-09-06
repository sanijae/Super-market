const mongoose = require('mongoose')

const user_schema = mongoose.Schema(
    { 
        username:{type:String},
        email:{type:String},
        password:{type:String},
        phone:{type:String},
        address:{type:String},
        blocked:{type:Boolean,default:false},
        imageUrl:{String},
        joinedAt:{type:Date, default: Date.now()},
        notes: [{
            date:{type:Date,default:Date.now()},
            message: {type: String},
            address: {type: String},
            title:{type:String},
            type:{type:String},
            quantity:{type:Number},
            amount:{type:Number},
            item: {type: mongoose.Schema.Types.ObjectId, ref:'items'},
        }],
        cart: [{
            item: {type: mongoose.Schema.Types.ObjectId, ref:'items'},
            title:{type:String},
            type:{type:String},
            quantity:{type:Number},
            amount:{type:Number},
        }],
        orders: [
            {
            date:{type:Date,default:Date.now()},
            address: {type: String},
            title:{type:String},
            type:{type:String},
            quantity:{type:Number},
            amount:{type:Number},
            item: {type: mongoose.Schema.Types.ObjectId, ref:'items'},
            }
        ]
    }
) 

module.exports = mongoose.model('users',user_schema)