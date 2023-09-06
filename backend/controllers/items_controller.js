const Items = require('../models/items_model')
const Admin = require('../models/admin_model')
const fs = require('fs')
const path = require('path')

exports.addItem =async(req,res)=>{   
    try { 
        const item = await Items.create({...req.body,uploadBy:req.params.id})
        await Admin.findByIdAndUpdate(req.params.id,{$push:{items:item._id}},{new:true})
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateItem =async(req,res)=>{
    try {
        const item = await Items.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllItems =async(req,res)=>{
    try {
        const item = await Items.find().sort({createdAt: -1}).lean()
        const items = await Items.countDocuments()
        res.json({items:items,result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getItem =async(req,res)=>{
    try {
        const item = await Items.findById(req.params.id)
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.filterItem =async(req,res)=>{
    try {
        const item = await Items.find({
            '$or':[
                {type:{$regex:req.params.key}},
                {price:{$regex:req.params.key}},
                {category:{$regex:req.params.key}},
                {title:{$regex:req.params.key}},
            ]
        }).sort({createdAt:-1}).limit(5).lean()
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.searchItem =async(req,res)=>{
    try {
        const item = await Items.find({
            '$or':[
                {type:{$regex:req.params.key}},
                {price:{$regex:req.params.key}},
                {category:{$regex:req.params.key}},
                {title:{$regex:req.params.key}},
            ]
        }).sort({createdAt:-1}).lean()
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateItemImages =async(req,res)=>{
    const imagesArray = []
    req.files.map((file)=>{
        const picture = {
            filename: file.filename,
            path: file.path
        }
        imagesArray.push(picture)
    })
    try {
        const item = await Items.findByIdAndUpdate(req.params.id,{pictures:imagesArray},{new:true})
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteItem =async(req,res)=>{
    try {
        const item = await Items.findByIdAndDelete(req.params.id).populate('uploadBy')
        await item.uploadBy.items.pull(item)
        await item.uploadBy.save()
        fs.rmdirSync(path.join(__dirname,`../Images/${req.params.id}`),{recursive:true})
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}


