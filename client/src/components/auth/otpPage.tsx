import { useState } from "react";
import axios, { AxiosError } from "axios";
import { env } from "../../configs/env.config";
import { useNavigate } from "react-router-dom";
export default function OtpPage(){
    const navigate=useNavigate();
    const [otpnumber,setotpnumber]=useState<string>('');
    

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const send={otpnumber};
        try{
            const response=await axios.post(`${env.backendurl}/api/v1/checkOtp`,send,{withCredentials:true});
            if(response.data.message=== 'otp verified successfull'){
                alert('otp verified successfull');
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
        <h1>Enter your otp here</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your 6 digit otp here" value={otpnumber} onChange={(e)=>setotpnumber(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </>
    );
}