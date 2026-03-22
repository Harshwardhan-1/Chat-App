import mongoose from 'mongoose';
import { minLength,maxLength } from 'zod';
import { Document,Types } from 'mongoose';
import { MAX_IMAGES_PER_USER } from '../configs/env.config';


export interface IUserPhoto extends Document{
    _id:Types.ObjectId,
    email?:string,
    userImage?:string,
    clothingImage?:string,
    totalCount?:Number,
    maxImage?:Number,
    createdAt?:Date,
}


export const userPhotoSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
         match : [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    userImage:{
        type:String,
        required:[true,'image is required'],
    },
    clothingImage:{
        type:String,
        required:[true,'clothing image is required'],
    },
    totalCount:{
        type:Number,
        default:0,
    },
    maxImage:{
        type:Number,
        default:MAX_IMAGES_PER_USER,
    },
    createdAt:{
        type:Date,
        default:Date.now(), 
    }
},
{timestamps:true},
)



export const userPhotoModel=mongoose.model('photo',userPhotoSchema);