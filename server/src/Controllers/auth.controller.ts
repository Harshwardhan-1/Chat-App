import {Request,Response,NextFunction} from 'express';
import { addUserModel } from '../models/userModel';
import { otpmodel } from '../models/otp.model';
import { userSchema,userLoginSchema, } from '../validation/userValidation';
import { checkUserOtpSchema } from '../validation/checkotp.validation';
import bcrypt from 'bcrypt';
import { SALT_ROUND,JWT_SECRET,SENDGRID_API_KEY ,SENDGRID_EMAIL} from '../configs/env.config';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';  
sgMail.setApiKey(SENDGRID_API_KEY as string);
  

export const addUser=async(req:Request,res:Response,next:NextFunction)=>{
   try{
      const parsed=userSchema.safeParse(req.body);
      if(!parsed.success){
         const issue=parsed.error.issues[0];
         return res.status(400).json({
            success:false,
            message:issue.message,
         })
      }
      const {userName,name,email,password}=parsed.data;
      const checkUserExist=await addUserModel.findOne({email});
      if(checkUserExist){
         return res.status(409).json({
            success:false,
            message:"user already exist",
         });
      }
      const salt=await bcrypt.genSalt(Number(SALT_ROUND));
      const hashPassword=await bcrypt.hash(password,salt);
       const createUser=await addUserModel.create({
         name,
         userName,
         email,
         password:hashPassword,
         role:"user",
       });
       if(!createUser){
         return res.status(400).json({
            message:"error creating user",
         });
       }
      const token=jwt.sign({email:email,userId:createUser._id,role:createUser.role},JWT_SECRET as string);
      res.cookie('token',token,{
         httpOnly:true,
         sameSite:"none",
         secure:true,
         partitioned:true,
      });
      return res.status(201).json({
         success:true,
         message:"user created successfully",
});
   }catch(err){
      next(err);
   }
}













export const oldUsers=async(req:Request,res:Response,next:NextFunction)=>{
   try{
      const parsed=userLoginSchema.safeParse(req.body);
      if(!parsed.success){
            const issue=parsed.error.issues[0];
         return res.status(400).json({
            success:false,
            message:issue.message,
         });
      }
      const {email,password}=parsed.data;
      const oldUser=await addUserModel.findOne({email});
      if(!oldUser){
         return res.status(400).json({
            message:"user not exist",
         });
      }
      const hashedPassword=oldUser.password;
      if(!hashedPassword){
         return res.status(400).json({
            success:false,
            message:"password is required",
         });
      }
      const compare=await bcrypt.compare(password,hashedPassword);
      if(!compare){
         return res.status(400).json({
            success:false,
            message:"password doesn't match",
         });
      }

      //generate otp and send to user 

      const generateOtp=Math.floor(100000+Math.random()*900000);
      const putOtp=await otpmodel.findOne({email});
      if(!putOtp){
         const createIt=await otpmodel.create({
            email:email,
            currentOtp:generateOtp,
            otpexpireTime:new Date(Date.now()+5*60*1000)
         });
         if(!createIt){
            return res.status(400).json({
               success:false,
               message:"error in sending message",
               });
            }
         }else{
            putOtp.currentOtp=generateOtp;
            putOtp.otpexpireTime=new Date(Date.now()+5*60*1000);
            await putOtp.save();
         }
        

         const sendOtpToUser=async(email:string,otp:number)=>{
            const msg={
               to:email,
               from:SENDGRID_EMAIL as string,
               subject:"Your Otp Code is",
               html:`
         <h2>OTP Verification</h2>
         <p>Your OTP is: <b>${otp}</b></p>
         <p>This OTP is valid for 5 minutes.</p>
         `
            };
            try{
               await sgMail.send(msg);
               console.log('otp send');
            }catch(error){
               console.log(error);
               throw error;
            }
         }
         await sendOtpToUser(email,generateOtp);

      const token=jwt.sign({userId:oldUser._id,email:oldUser.email,role:oldUser.role},JWT_SECRET as string); 
      res.cookie("token",token,{
         httpOnly:true,
         sameSite:"none",
         secure:true,
         partitioned:true,
      });
      return res.status(200).json({
         success:true,
         message:"successfully found user",
      });   
   }catch(error){
      next(error);
   }
}















export const recieveOtp=async(req:Request,res:Response,next:NextFunction)=>{
   try{
const user=(req as any).user;
const userId=user.userId;
const email=user.email;
const parsed=checkUserOtpSchema.safeParse(req.body);
if(!parsed.success){
   const issue=parsed.error.issues[0];
   return res.status(400).json({
      success:false,
      message:issue.message,
   });
}
const {otpnumber}=parsed.data;
const record=await otpmodel.findOne({email});

if(!record){
   return res.status(400).json({
      message:"no record found",
   });
}
if(!record.otpexpireTime || Date.now()>record.otpexpireTime.getTime()){
   return res.status(400).json({
      success:false,
      message:"otp expired",
   });
}

   if(record.currentOtp!==Number(otpnumber)){
      return res.status(400).json({
      success:false,
      message:"invalid otp",
   });
   }
   return res.status(200).json({
      success:true,
      message:"otp verified successfull",
   })
   }catch(error){
      next(error);
   }
}