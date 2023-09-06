const Order = require('../models/order_model')
const User = require('../models/UserModel')

exports.addOrder =async(req,res)=>{
    try { 
        const order = await Order.create({...req.body,receiver:req.params.id})
        //await User.findByIdAndUpdate(req.params.id,{$push:{orders:order}},{new:true})
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllOrders =async(req,res)=>{
    try {
        const order = await Order.find().sort({createdAt: -1}).lean().populate('receiver','items')
        const orders = await Order.countDocuments()
        res.json({orders:orders,result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getOrder =async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate('receiver','items')
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateNote =async(req,res)=>{
    try {
        const note = await User.findByIdAndUpdate(req.params.uid,{$push:{note:{...req.body}}},{new:true})
        res.json({result:note})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateOrder =async(req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,{...req.body})
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deleteOrder =async(req,res)=>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        // await order?.receiver?.orders?.pull(order)
        // await order.receiver.save()
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}


