const mongoose = require('mongoose')

const item_schema = mongoose.Schema(
    {
        title:{type:String},
        type:{type:String},
        category:{type:String},
        desc:{type:String},
        price:{type:String},
        pictures:[Object],
        createdAt:{type:Date, default: Date.now()},
        uploadBy: {type: mongoose.Schema.Types.ObjectID, ref:'admin'}
    }
) 

module.exports = mongoose.model('items',item_schema)

