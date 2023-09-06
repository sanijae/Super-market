const mongoose = require('mongoose')

const admin_schema = mongoose.Schema(
    {
        username:{type:String},
        email:{type:String},
        password:{type:String},
        phone:{type:String},
        imgUrl:{String},
        joinedAt:{type:Date, default: Date.now()},
        items: [{type: mongoose.Schema.Types.ObjectID, ref:'items'}],
    }
) 
 
module.exports = mongoose.model('admin',admin_schema)