import { Routes,Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
      </Routes>
    </>
  )
}

export default App
