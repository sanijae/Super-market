const mongoose = require('mongoose')

const main_schema = mongoose.Schema(
    {
        vendor:{type:String},
        accountnumber:{type:String},
        accountname: {type: String},
        createAt:{type: Date, default: Date.now()}
    }
) 

module.exports = mongoose.model('payments',main_schema)