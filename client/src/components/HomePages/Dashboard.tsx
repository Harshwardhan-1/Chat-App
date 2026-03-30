import {useState, useEffect } from "react";
import { env } from "../../configs/env.config";
import axios,{AxiosError} from "axios";
import '../../styles/Dashboard.css';
import { useNavigate } from "react-router-dom";
export function Dashboard(){
  const navigate=useNavigate();
  interface userInfo{
    userId:string,
    name:string,
    userName:string,
    email:string,
    profilePic:string,
  }
const [data,setData]=useState<userInfo[]>([]);
  useEffect(()=>{
    const fetch=async()=>{
      try{
        const response=await axios.get(`${env.backendurl}/api/v1/userInfo`,{withCredentials:true});
        if(response.data.message=== 'successfull'){
          setData(response.data.data);
        }
      }catch(err){
        const error=err as AxiosError;
        if(error.response && error.response.data){
          const data=error.response.data as {error:string;message:string};
          alert(data.error || data.message || 'somethig went wrong');
        }else{
          alert(error.message);
        }
      }
    };
    fetch();
  })

  const handleClick=async(all:userInfo)=>{
    navigate('/ChatPage',{state:{harsh:all}});
  }
  return(
    <>
    <div className="dashboard-container">
        <h1>Select A Chat To Start Conversion</h1>
    {
      data.map((all,index)=>(
        <div key={index} className="user-card" onClick={()=>handleClick(all)}>
          <h1>{all.userName}</h1>
          <img src="/defaultImage.avif"  />
        </div>
      ))
    }
    </div>  
    </>
  );
}

