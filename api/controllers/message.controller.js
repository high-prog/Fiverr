import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import createError from "../utils/createError.js";


export const createMessage = async (req, res, next) => {

    const newMessage = new Message({
        conversationId : req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc
    })
    try{ 

        const data  = await newMessage.save();
        await Conversation.findOneAndUpdate({id: req.body.conversationId}, {$set: {
            readBySeller: req.isSeller,
            readByBuyer : !req.isSeller,
            lastMessage : req.body.desc
        }}, {new:true})
        return res.status(201).send(data); 
    }catch(err){
        next(err)
    }
}
export const getMessages = async (req, res, next) => {

    try{
        const messages = await Message.find({conversationId: req.params.id})
        return res.status(200).send(messages)

    }catch(err){
        next(err)
    }
}