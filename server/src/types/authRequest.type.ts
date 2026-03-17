import {Request} from 'express';
import { UserInterface } from '../models/userModel';
import { JwtPayload } from 'jsonwebtoken';

export interface userPlayLoad extends JwtPayload{
    userId:any,
    name:string,
    email:string,
}
//whats value inside the token


export interface authRequest extends Request{
    user?:null | UserInterface
}