import {Router} from 'express';
const userRoutes=Router();
import { addUser,oldUsers,recieveOtp,resendOtp,me,userInfo } from '../Controllers/auth.controller';
import { isUserLoggedIn } from '../middleware/auth.middleware';

userRoutes.post('/addUser',addUser);
userRoutes.post('/oldUser',oldUsers);
userRoutes.post('/checkOtp',isUserLoggedIn,recieveOtp);
userRoutes.get('/resend',isUserLoggedIn,resendOtp);
userRoutes.get('/me',isUserLoggedIn,me);
userRoutes.get('/userInfo',isUserLoggedIn,userInfo);

export default userRoutes;     