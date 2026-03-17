import {Request,Response,NextFunction} from 'express';
import { addUserModel } from '../models/userModel';
import { userSchema } from '../validation/userValidation';
import bcrypt from 'bcrypt';
import { SALT_ROUND,JWT_SECRET } from '../configs/env.config';
import jwt from 'jsonwebtoken';

export const addUser=async(req:Request,res:Response,next:NextFunction)=>{
   try{
      const parsed=userSchema.safeParse(req.body);
      if(!parsed.success){
         return res.status(400).json({
            success:false,
            error:parsed.error.format(),
         });
      }
      const {userName,name,email,password}=parsed.data;
      const checkUserExist=await addUserModel.findOne({email});
      if(checkUserExist){
         return res.status(401).json({
            success:false,
            message:"user already exist",
         });
      }
      bcrypt.genSalt(Number(SALT_ROUND), function(err, salt) {
    bcrypt.hash(password, salt,async function(err, hash) {
       const createUser=await addUserModel.create({
         name,
         userName,
         email,
         password:hash,
         role:"user",
       });
       if(!createUser){
         return res.status(400).json({
            message:"error creating user",
         });
       }
      const token=jwt.sign({email:email,userId:createUser._id,role:createUser.role},JWT_SECRET as string);
      res.cookie('token',{
         httPOnly:true,
         samesite:"none",
         secure:true,
         partitioned:true,
      });
      return res.status(201).json({
         success:true,
         message:"user created successfully",
      });
    });
});
   }catch(err){
      next(err);
   }
}