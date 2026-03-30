import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios,{AxiosError} from "axios";
import { env } from "../../configs/env.config";
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
    const location=useLocation();
    const data=location?.state?.harsh;

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //logic of sending
    }
    return(
        <>
        <h3>jo message karenga uski id:{currentUserData?._id}</h3>
        <h3>jo message karenga uski email:{currentUserData?.email}</h3>
        <img src="/defaultImage.avif" alt="" />
        <br />
         <h3>jisko message bhejna ha uski id:{data?.userId}</h3>
        <h3>jisko message bhejna ha uska gmail:{data?.email}</h3>
        <img src="defaultImage.avif" alt="" />

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Type Your Message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
        </>
    );
}