import { Routes,Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/login"
import OtpPage from "./components/auth/otpPage"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path= '/OtpPage' element={<OtpPage />}></Route>
      </Routes>
    </>
  )
}

export default App
