import Conversation from "../models/conversationModel.js";
import createError from "../utils/createError.js";


export const createConversation = async (req, res, next) => {
    try{
        const newConversation = Conversation({
            id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
            sellerId: req.isSeller ? req.userId : req.body.to,
            buyerId: req.isSeller ? req.body.to : req.userId ,
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        })

        const data = await newConversation.save();
        return res.status(201).send(data);
    }catch(err){
        next(err)
    }
}
export const getConversations = async (req, res, next) => {
    try{
        const conversations = await Conversation.find(req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId})
        return res.status(200).send(conversations);
    }catch(err){
        next(err)
    }
}
export const updateConversation = async (req, res, next) => {
    try{

        const updatedConversation = await Conversation.findOneAndUpdate({
            id:req.params.id},
            {
            $set:{
                ...(req.isSeller ? {readBySeller: true} : {readByBuyer : true})
            }
        },{new:true})

        return res.status(200).send(updatedConversation)
    }catch(err){
        next(err)
    }
}
export const getSingleConversation = async (req, res, next) => {
    try{
        const conversation= await Conversation.findOne({id:req.params.id}).sort({updatedAt:-1});
        if(!conversation) return next(create(404, "Not Found"));
        return res.status(200).send(conversation)
    }catch(err){
        next(err)
    }
}