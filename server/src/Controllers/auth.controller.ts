import {Request,Response,NextFunction} from 'express';
import { addUserModel } from '../models/userModel';
import { userSchema,userLoginSchema } from '../validation/userValidation';
import bcrypt from 'bcrypt';
import { SALT_ROUND,JWT_SECRET } from '../configs/env.config';
import jwt from 'jsonwebtoken';


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