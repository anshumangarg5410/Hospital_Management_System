import React from 'react'
import image from "/Assets/hosheartclipart.png"

function Hero_Land() {
  return (
    <>
    <section className="w-[100vw] min-h-[90vh] flex items-center justify-between px-[5%]" id="home">
      <div className="flex-1 max-w-2xl">
        <div className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm mb-6 inline-flex items-center gap-2">
          <span>⭐</span> Next-Gen Healthcare Software
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Smarter Hospital Management for Better Care
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Manage hospitals efficiently — from patient registration to advanced reporting — with seamless digital solutions that transform healthcare delivery.
        </p>
        
        <div className="relative mb-8">
          <input
            type="search"
            className="w-full max-w-lg pl-12 pr-6 py-4 rounded-full bg-[rgb(211,247,251)] border border-cyan-200 focus:outline-none"
            placeholder="Search for services, doctors, or treatments..."
          />
        </div>
      </div>
      
      <div className="hidden lg:block flex-1">
        <div className="h-[60vh] w-[50vw] text-white text-6xl bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${image})` }} >
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero_Land
