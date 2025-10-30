import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import './index.css'; 

import Landing_Page from './Pages/Landing_Page';
import Layout from './layout';
import Health_Checks from './components/Landing/Health_Checks';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Landing_Page/>}/>
      <Route path='/home' element = {<Landing_Page/>}/>
      <Route path='/about' element = {<About/>}/>
      <Route path='/contact' element = {<Contact/>}/>
      </Route>
    </Routes>
    </>
  )
  
}

export default App

