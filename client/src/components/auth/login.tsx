import { useState } from "react";
import axios, { AxiosError } from "axios";
import { env } from "../../configs/env.config";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const navigate=useNavigate();
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const send={email,password};
        try{
            const response=await axios.post(`${env.backendurl}/api/v1/oldUser`,send,{withCredentials:true});
            if(response.data.message=== 'successfully found user'){
                navigate('/Dashboard');
            }
        }catch(err){
            const error=err as AxiosError;
            if(error.response && error.response.data){
                const data=error.response.data as {error?:string;message?:string};
                alert(data.error || data.message || 'something went wrong');
            }else{
                alert(error.message);
            }
        }
    }
    return(
        <>
        <h1>welcome to chat app</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your email here" value={email} onChange={(e)=>setEmail(e.target.value)}  />
            <input type="password" placeholder="Enter your password here" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">login</button>
        </form>
        </>
    );
}