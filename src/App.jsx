
import {BrowserRouter as Router , Routes, Route,Navigate} from 'react-router-dom'
import React from "react"
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'


function App() {
  

  return (
    <div>
     <Router>
      <Routes>
      <Route path='/' exact element={<Root/>}/>
        <Route path='/dashboard' exact element={<Home/>}   />
        <Route path='/login' exact element={<Login/>}   />
        <Route path='/signup' exact element={<Signup/>}   />
      </Routes>
     </Router>
    </div>
  )
}

//Define the Root Component to handle the initial redirect
const Root=()=>{
  const isAuthenticated = !! localStorage.getItem('token')
  return (isAuthenticated?
    <Navigate to='/dashboard'/>:
    <Navigate to='/login' />
  )

}
export default App
