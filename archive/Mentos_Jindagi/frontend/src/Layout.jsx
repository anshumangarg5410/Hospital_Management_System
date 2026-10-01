import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cat_Footer from './components/Landing/Cat_Footer'
import Main_Footer from './components/Landing/Main_Footer'

function Layout() {
  return (
    <>
    <Navbar/>

    <Outlet/>

    <Cat_Footer/>
    <Main_Footer/>
    </>
  )
}

export default Layout
