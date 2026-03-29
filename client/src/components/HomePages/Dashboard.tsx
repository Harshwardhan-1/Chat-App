import {useState, useEffect } from "react";
import { env } from "../../configs/env.config";
import axios,{AxiosError} from "axios";
export function Dashboard(){
  interface userInfo{
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
  
  return(
    <>
    <h1>DashBoard</h1>
    {
      data.map((all,index)=>(
        <div key={index}>
          <h1>{all.userName}</h1>
          <img src="/defaultImage.avif"  />
        </div>
      ))
    }
    </>
  );
}