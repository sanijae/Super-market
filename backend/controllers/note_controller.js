const Note = require('../models/notes')
const User = require('../models/UserModel')

exports.addNote =async(req,res)=>{
    try { 
        const note = await Note.create({...req.body,user:req.params.id})
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllNotes =async(req,res)=>{
    try {
        const note = await Note.find().populate('user').sort({createdAt: -1}).lean()
        const notes = await Note.countDocuments()
        res.json({notes:notes,result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getNote =async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id).populate('user')
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateUserNote =async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id)
        await User.findByIdAndUpdate(req.params.uid,{$push:{notes:{...req.body}}},{new:true})
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateNote =async(req,res)=>{
    try {
        const note = await Note.findByIdAndUpdate(req.params.id,{...req.body})
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteNote =async(req,res)=>{
    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}


