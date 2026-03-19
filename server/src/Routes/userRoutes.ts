import {Router} from 'express';
const userRoutes=Router();
import { addUser,oldUsers } from '../Controllers/auth.controller';

userRoutes.post('/addUser',addUser);
userRoutes.post('/oldUser',oldUsers);

export default userRoutes;