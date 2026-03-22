import express  , {Request , Response} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { FRONTEND_URL } from "./configs/env.config";
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin:FRONTEND_URL,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))


import userRoutes from "./Routes/userRoutes";


app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})


app.use('/api/v1',userRoutes);


app.use(errorMiddleware);

export default app;