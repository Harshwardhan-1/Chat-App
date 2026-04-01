import mongoose from 'mongoose';
import {Document,Types} from 'mongoose';
import { minLength,maxLength } from 'zod';

export interface UserChar extends Document{
    _id:Types.ObjectId,
senderId:string,
recieverId:string,
text:string,
file?:File,
senderEmail:string,
recieverEmail:string,
}



export const ChatSchema=new mongoose.Schema({
    senderId:{
        type:String,
        required:[true,'senderId cannot be empty'],
    },
    recieverId:{
        type:String,
        required:[true,'recieverId cannot be empty'],
    },
    text:{
        type:String,
        required:true,
        minLength:[1,'atleast 1 character is necessary cannot send empty thing'],
    },
    file:{
        type:File,
    },
    senderEmail:{
        type:String,
        required:[true,'email is necessary of sender'],
        unique:true,
        trim:true,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    recieverEmail:{
        type:String,
        required:[true,'email is necessary of reciever'],
        unique:true,
        trim:true,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
})


export const userChatModel=mongoose.model('UserChat',ChatSchema);