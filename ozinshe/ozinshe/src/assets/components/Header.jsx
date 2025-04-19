import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../imges/Your App.jpg"
import srch from "../imges/search.svg"
import lgin from "../imges/login.svg"

function Header() {
  const navigate = useNavigate()
  return (
    <div className='flex p-7 gap-96'>
        <img src={logo} alt="" />
        <div className='flex justify-center items-center gap-3 w-506 bg-gray-100 h-56' style={{borderRadius:"12px"}}>
            <input type="text" placeholder='Поиск' className='h-56 w-400 outline-none bg-gray-100' style={{borderRadius:"12px"}}/>
            <img src={srch} alt="" className='w-5 h-5 z-10'/>
        </div>
            <div className='flex gap-3' onClick={() => navigate("/register")}>
                <p className='text-gray-500 mt-4'>Войти</p>
                <img src={lgin} alt="" className='w-16'/>
            </div>
    </div>
  )
}

export default Header