import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios,{AxiosError} from "axios";
import { env } from "../../configs/env.config";
import { socket } from "./socket";
import '../../styles/ChatPage.css';
export function ChatPage(){
    const [msg,setMsg]=useState<string>('');
    interface currentUser{
        _id:string,
        name:string,
        username:string,
        userId:string,
        email:string,
    }
        const [currentUserData,setCurrentUserData]=useState<currentUser>();
            const [messages, setMessages] = useState<{ senderId: string; message: string }[]>([]);

        console.log(currentUserData);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get(`${env.backendurl}/api/v1/currentUser`,{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setCurrentUserData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError;
                if(error.response && error.response.data){
                    const data=error.response.data as {error:string;message:string};
                    alert(data.error || data.message || 'something went wrong');
                }else{
                    alert(error.message);
                }
            }
        };
        fetch();
    },[]);
useEffect(() => {
    socket.connect();

    return () => {
        socket.disconnect();
    };
}, []);



    useEffect(()=>{
        if(!currentUserData?._id){
            return;
        }
                socket.emit('join',currentUserData._id);           
            socket.on('receive-message',(data)=>{
                setMessages((prev)=>[...prev,data]);
            });
            return()=>{
                socket.off('receive-message');
            };
    },[currentUserData]);
    const location=useLocation();
    const data=location?.state?.harsh;


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(msg.trim()=== ''){
            return alert('input field is empty');
        }
        //logic of sending
    const messageData={
        senderId:currentUserData?._id,
        receiverId:data?.userId,
        message:msg,
    };
    socket.emit('send_message',messageData);
    setMsg('');
    }
    return(
        <>
           <div className="chat-container">
        <div className="chat-header">
             <img src="defaultImage.avif" alt="Profile" />   
         <h4>{data?.userName}</h4>  
         </div>      
          <div className="chat-messages">
            
            <div className="message receiver">jisko message bhejna ha uski id:{data?.userId}</div>
            <div className="message receiver">jisko message bhejna ha uski email:{data?.email}</div>
            <div className="message sender">ya ha currentUserId:jo message karenga uski id :{currentUserData?._id}</div>
            <div className="message sender">jo message karenga uski id :{currentUserData?.email}</div>
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
            <input type="text" placeholder="Type Your Message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
        {messages.map((all,index)=>(
            <div key={index}>
                {all.message}
            </div>
        ))}
        </div>

        </>
    );
}