// import { useEffect } from "react"
import { Routes,Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/login"
import OtpPage from "./components/auth/otpPage"
import { Dashboard } from "./components/HomePages/Dashboard"
// import { env } from "./configs/env.config"
// import axios,{AxiosError} from "axios"
// import { useNavigate } from "react-router-dom"
import { ChatPage } from "./components/HomePages/ChatPage"

function App() {
// const navigate=useNavigate();
// useEffect(()=>{
//   if (location.pathname !== "/") return;
//   const fetch=async()=>{
//     try{
//       const response=await axios.get(`${env.backendurl}/api/v1/me`,{withCredentials:true});
//       if(response.status===200){
//         navigate('/DashBoard');
//       }
//     }catch(err){
//       const error=err as AxiosError;
//       if(error?.response?.status===401){
//         navigate('/login');
//       }
//     }
//   };
//   fetch();
// },[navigate])
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path= '/OtpPage' element={<OtpPage />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/ChatPage" element={<ChatPage />}></Route>
      </Routes>
    </>
  )
}

export default App
