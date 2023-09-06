
const Main = require('../models/main_model')

exports.addMain =async(req,res)=>{
    
    try { 
        const main = await Main.create({...req.body})
        res.json({result:main})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateMain =async(req,res)=>{
    try {
        const main = await Main.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.json({result:main})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllMain =async(req,res)=>{
    try {
        const main = await Main.find().sort({createdAt: -1})
        const mains = await Main.countDocuments()
        res.json({counts:main,result:main})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getMain =async(req,res)=>{
    try {
        const main = await Main.findById(req.params.id)
        res.json({result:main})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteMain =async(req,res)=>{
    try {
        const main = await Main.findByIdAndDelete(req.params.id)
        res.json({result:main})
    } catch (error) {
        res.json({error:error.message})
    }
}
