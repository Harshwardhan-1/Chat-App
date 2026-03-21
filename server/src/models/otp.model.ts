import mongoose from "mongoose";
import {Document,Types} from 'mongoose';
import { minLength,maxLength } from "zod";

export interface userOtpInterface extends Document{
    _id:Types.ObjectId,
    email?:string,
    currentOtp?:Number,
    otpcreateTime?:Date,
    otpexpireTime?:Date,
}


export const otpSchema=new mongoose.Schema<userOtpInterface>({
    email:{
        type:String,
        required:true,
        unique:true,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    currentOtp:{
        type:Number,
        required:true,
    },
    otpcreateTime:{
        type:Date,
        default:Date.now,
    },
    otpexpireTime:{
        type:Date,
        default:Date.now,
    },
});
    

export const otpmodel=mongoose.model<userOtpInterface>('sendotp',otpSchema);