import {Router} from 'express';
const userRoutes=Router();

import { addUser } from '../Controllers/AuthControllers';

userRoutes.post('/addUser',addUser);


export default userRoutes;