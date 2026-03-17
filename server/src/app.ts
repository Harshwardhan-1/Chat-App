import express  , {Request , Response} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { FRONTEND_URL } from "./configs/env.config";
import { errorMiddelware } from "./middleware/error.Middleware";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin:FRONTEND_URL,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))


app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})

app.use(errorMiddelware);

export default app;