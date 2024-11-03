import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../imges/Your App.jpg"
import srch from "../imges/search.jpg"
import lgin from "../imges/login.jpg"

function Header() {
  const navigate = useNavigate()
  return (
    <div className='flex p-7 gap-96'>
        <img src={logo} alt="" />
        <div className='flex'>
            <input type="text" placeholder='Поиск' className='w-449 h-56 outline-none bg-Gray/G05' style={{borderRadius:"12px"}}/>
            <img src={srch} alt="" className='w-5 h-5 absolute right-96 mr-40 mt-4 z-10'/>
        </div>
            <div className='flex gap-3' onClick={() => navigate("/register")}>
                <p className='text-gray-500 mt-4'>Войти</p>
                <img src={lgin} alt="" className='w-16'/>
            </div>
    </div>
  )
}

export default Header