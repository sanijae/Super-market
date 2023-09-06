const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const Item = require('../models/items_model')



exports.register =async(req,res)=>{
    try {
        var user = await User.findOne({email:req.body.email})
        if(!user){
            const salt = await bcrypt.genSaltSync(10)
            const hash = await bcrypt.hashSync(req.body.password, salt)
            user = await User.create({...req.body,password:hash})
            res.json({result:user})
        }else{
            res.json({error:'user with this email already exist!! try to login'})
        }
    } catch (error) {
        res.json({error:error.message})
    } 
}

exports.login =async(req,res)=>{
    try {
        var user = await User.findOne({email:req.body.email})
        if(user){
            if(!user.blocked){
                const pass = await bcrypt.compareSync(req.body.password,user.password)
                if(pass){
                    user = await User.findOne({email:req.body.email}).lean()
                    res.json({result:user})
                }else{
                    res.json({error:'you entered an invalid password'})
                }
           }else{
            res.json({block:'This account has been blocked, please contact us through email phone for more.'})
           }
        }else{
            res.json({error:'user with this email doest not exist, please register with your email!!'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.find().lean().sort({joinedAt:-1})
        const countUsers = await User.countDocuments()
        res.json({users:countUsers,result:users})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)//.populate('orders')
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateUser = async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteUser = async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.addToCart = async(req,res)=>{
    try {
         const item = await Item.findById(req.params.id)
        await User.findByIdAndUpdate(req.params.userId,{$push:{cart:{...req.body,type:item.type,title:item.title,item:item._id}}},{new:true})
        res.json({result:item})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateOrder =async(req,res)=>{
    try {
        const order = await User.findByIdAndUpdate(req.params.uid,{$push:{orders:{...req.body}}},{new:true})
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateNote =async(req,res)=>{
    try {
        const note = await User.findByIdAndUpdate(req.params.id,{$push:{notes:{...req.body}}},{new:true})
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteCart = async(req,res)=>{
    try {
         const user = await User.findById(req.params.userId)  
         await user.cart.pull(req.params.id)
         await user.save()
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteCartAll = async(req,res)=>{
    try {
         const user = await User.findByIdAndUpdate(req.params.id)
         user.cart?.map(async(ids)=>{
            await user.cart.pull(ids)
        })  
        await user.save()
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteOrder = async(req,res)=>{
    try {
         const user = await User.findById(req.params.userId)  
         await user.orders.pull(req.params.id)
         await user.save()
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteOrderAll = async(req,res)=>{
    try {
         const user = await User.findByIdAndUpdate(req.params.id)
         user.orders?.map(async(ids)=>{
            await user.orders.pull(ids)
        })  
        await user.save()
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteNote = async(req,res)=>{
    try {
         const user = await User.findById(req.params.userId)  
         await user.notes.pull(req.params.id)
         await user.save()
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteNoteAll = async(req,res)=>{
    try {
         const user = await User.findByIdAndUpdate(req.params.id)
         user.notes?.map(async(ids)=>{
            await user.orders.pull(ids)
        })  
        await user.save()
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}