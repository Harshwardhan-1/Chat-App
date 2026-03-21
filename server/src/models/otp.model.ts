import mongoose from "mongoose";
import {Document,Types} from 'mongoose';
import { minLength,maxLength } from "zod";

export interface userOtpInterface extends Document{
    _id:Types.ObjectId,
    userId?:string,
    userName?:string,
    email?:string,
    currentotp?:string,
    otpcreateTime?:Date,
    otpexpireTime?:Date,
}


export const otpSchema=new mongoose.Schema<userOtpInterface>({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    userName:{
        type:String,
        required:[true,'name is required'],
        minLength:[3,'username should be atleast 3 characters'],
        maxLength:[20,'username should not be more than 20 characters'],
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    currentotp:{
        type:String,
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