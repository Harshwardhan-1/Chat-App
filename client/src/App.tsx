import { Routes,Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/login"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
