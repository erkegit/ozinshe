import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../imges/Your App.jpg"
import srch from "../imges/search.svg"
import lgin from "../imges/login.svg"
import out from "../imges/out.svg"

function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };


  return (
    <div className='flex p-7 gap-80'>
        <img src={logo} alt="" />
        <div className='flex justify-center items-center gap-3 w-506 bg-gray-100 h-56' style={{borderRadius:"12px"}}>
            <input type="text" placeholder='Поиск' className='h-56 w-400 outline-none bg-gray-100' style={{borderRadius:"12px"}}/>
            <img src={srch} alt="" className='w-5 h-5 z-10'/>
        </div>
        {
            token ?  <div className='flex gap-3 ml-20' onClick={() => handleLogout()}>
            <p className='text-gray-500 mt-4'>Выйти</p>
            <img src={out} alt="" className='w-16'/>
        </div> :  <div className='flex gap-3 ml-20' onClick={() => navigate("/register")}>
            <p className='text-gray-500 mt-4'>Войти</p>
            <img src={lgin} alt="" className='w-16'/>
        </div>
        }
    </div>
  )
}

export default Header