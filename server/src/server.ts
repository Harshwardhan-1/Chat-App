  import app from "./app";
  import { connectDb } from "./Database/ConnectDb";
  import { PORT } from "./configs/env.config"
  import http from 'http';
  import { Server } from "socket.io";
  const server=http.createServer(app);
  import { FRONTEND_URL } from "./configs/env.config";
  const io=new Server(server,{
    cors:{
      origin:FRONTEND_URL,
      methods:["GET","POST"],
      credentials:true,
    }
  });
  io.on('connection',(socket)=>{
    console.log('User connected',socket.id); 
    socket.on('send_message',(data)=>{
      io.emit('deliever_message',data);
    });
    socket.on('disconnect',(reason)=>{
      console.log('user disconnectd',reason);
    })
  })
server.listen(PORT, async() => { 
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDb();
});