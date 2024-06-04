import { Route, Routes } from "react-router-dom"

import Indexpage from "./Pages/Indexpage"
import Login from "./Pages/Login"
import Layout from "./components/Layout"
import Register from "./Pages/Register"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import Accountpage from "./Pages/Profilepage"
import Placespage from "./Pages/Placespage"
import Profilepage from "./Pages/Profilepage"
import Placesformpage from "./Pages/Placesformpage"
import UniquePlacepage from "./Pages/UniquePlacepage"
import Bookings from "./Pages/Bookings"
import Bookingsinglepage from "./Pages/Bookingsinglepage"


axios.defaults.baseURL ='http://localhost:3000'
axios.defaults.withCredentials =true;

function App() {
  

  return (
    
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Indexpage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Profilepage/>}/> 
      <Route path="/account/places" element={<Placespage/>}/>
      <Route path="/account/places/new" element={<Placesformpage/>}/>
      <Route path="/account/places/:id" element={<Placesformpage/>}/>
      <Route path="/places/:id" element={<UniquePlacepage/>}/>
      <Route path="/account/bookings" element={<Bookings/>}/>
      <Route path="/account/bookings/:id" element={<Bookingsinglepage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
   
  )
}

export default App
