import {Router} from 'express';
const userRoutes=Router();
import { addUser,oldUsers,recieveOtp } from '../Controllers/auth.controller';
import { isUserLoggedIn } from '../middleware/auth.middleware';

userRoutes.post('/addUser',addUser);
userRoutes.post('/oldUser',oldUsers);
userRoutes.post('/checkOtp',isUserLoggedIn,recieveOtp);

export default userRoutes;     