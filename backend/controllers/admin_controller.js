const bcrypt = require('bcrypt')
const Admin = require('../models/admin_model')
const Items = require('../models/items_model')
const fs = require('fs')
const path = require('path')

exports.register =async(req,res)=>{
    try {
        var admin = await Admin.findOne({email:req.body.email})
        if(!admin){
            const salt = await bcrypt.genSaltSync(10)
            const hash = await bcrypt.hashSync(req.body.password, salt)
            admin = await Admin.create({...req.body,password:hash})
            res.json({result:admin})
        }else{
            res.json({error:'admin with this email already exist!! try to login'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.login =async(req,res)=>{
    try {
        var admin = await Admin.findOne({email:req.body.email})
        if(admin){
            const pass = await bcrypt.compareSync(req.body.password,admin.password)
            if(pass){
                admin = await Admin.findOne({email:req.body.email}).lean()
                res.json({result:admin})
            }else{
                res.json({error:'you entered an invalid password'})
            }
        }else{
            res.json({error:'admin with this email does not exists!!'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllAdmins = async(req,res)=>{
    try {
        const admins = await Admin.find().lean().sort({joinedAt:-1})
        const admin = await Admin.countDocuments()
        res.json({counst:admin,result:admins})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getAdmin = async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id)
        res.json({result:admin})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAdmins = async(req,res)=>{
    try {
        const user = await Admin.find({_id:{$ne:req.params.id}})
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateAdmin = async(req,res)=>{
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.json({result:admin})
    } catch (error) {
        res.json({error:error.message})
    } 
}
exports.deleteAdmin = async(req,res)=>{
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id)
        await Items.deleteMany({_id:{$in:admin?.item_upload}})
        admin?.item_upload?.map((item)=>{
            fs.rmdirSync(path.join(__dirname,`../Images/${item}`),{recursive:true})
        })
        res.json({result:admin})
    } catch (error) {
        res.json({error:error.message})
    }
}