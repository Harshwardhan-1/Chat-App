import { useState } from "react";
import { env } from "../../configs/env.config";
import axios, { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";
export default function SignUp(){
    const navigate=useNavigate();
    const [name,setName]=useState<string>('');
    const [userName,setuserName]=useState<string>('');
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');
    


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert('password and confirm password does not match');
            return 
        }
        try{
            const send={name,userName,email,password}
            const response=await axios.post(`${env.backendurl}/api/user/addUser`,send,{withCredentials:true});
            if(response.data.message=== 'user created successfully'){
                alert('successfully signedUp');
                navigate('/login');
            }
        }catch(err){
            const error=err as AxiosError;
            if(error.response && error.response.data){
                const data=error.response.data as {message?:string};
                alert(data.message || 'something went wrong');
            }else{
                alert(error.message);
            }
        }
    }
return(
    <>
    <h1>Enter your credentials here</h1>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder="Enter your username" value={userName} onChange={(e)=>setuserName(e.target.value)} />
        <input type="text" placeholder="Enter email here" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" placeholder="Enter your password here" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input type="text" placeholder="Enter confirm password here" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        <button  type="submit">Create Account</button>
    </form>
    </>
);
}