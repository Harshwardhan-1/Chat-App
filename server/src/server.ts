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
      methods:["GET","POST","DELETE","UPDATE"],
      credentials:true,
    }
  });
  
  const users:{[key:string]:string}={};

  io.on('connection',(socket)=>{
    console.log('connected',socket.id);
    socket.on("join",(userId:string)=>{
      users[userId]=socket.id;
      console.log('Joined',userId);
    })

    socket.on('send_message',(data)=>{
      const receiverSocketId=users[data.receiverId];
      if(receiverSocketId){
        io.to(receiverSocketId).emit('receive-message',data);
      }
      socket.emit('receive-message',data);
    });
    socket.on('disconnect',()=>{
      for (const id in users) {
      if (users[id] === socket.id) {
        delete users[id];
        break;
      }
    }
    })
  })
 
server.listen(PORT, async() => { 
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDb();
});