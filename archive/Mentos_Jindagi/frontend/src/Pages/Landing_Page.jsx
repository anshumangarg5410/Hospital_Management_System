import React from 'react'
import Navbar from '../components/Navbar';
import Hero_Land from '../components/Landing/Hero_Land';
import Services_Grid from '../components/Landing/Services_Grid';
import Health_Checks from '../components/Landing/Health_Checks';
import Top_Cat from '../components/Landing/Top_Cat';
import Banner from '../components/Landing/Banner';
import Spotlight from '../components/Landing/Spotlight';
import Health_Cond from '../components/Landing/Health_Cond';
import Cat_Footer from '../components/Landing/Cat_Footer';
import Main_Footer from '../components/Landing/Main_Footer';
import About from '../components/About';

function Landing_Page() {
  return (
    <div className='overflow-hidden'>
    <div className="h-[10vh] w-[10vw]"></div>
    <Hero_Land/>
    <Services_Grid/>
    <Health_Checks/>
    <Top_Cat/>
    <Banner/>
    <Spotlight/>
    <Health_Cond/>
    </div>
  )
}

export default Landing_Page
