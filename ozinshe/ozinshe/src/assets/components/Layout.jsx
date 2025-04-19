import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
   <div>
        <Header />
     <div className='flex gap-5'>
        <Navbar/>
        <div className='mb-10 w-1200'>
        <Outlet></Outlet>
        </div>
    </div>
    <hr/>
    <div className='flex p-8'>
      <p className='text-gray-600 text-sm font-sans ml-40'>© 2021 Все права защищены</p>
      <h1 className='font-bold' style={{marginLeft:"680px"}}>Пользовательское соглашение</h1>
    </div>
   </div>
  )
}

export default Layout