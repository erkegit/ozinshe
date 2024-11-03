import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../imges/Your App.jpg"
import apps from "../imges/appstore.jpg"
import gplay from "../imges/googleplay.png"
import qrc from "../imges/qrcode.jpg"
import iphn from "../imges/iphone.jpg"
import samsung from "../imges/samsung.jpg"

function Firstpg() {
    const navigate = useNavigate()
  return (
    <div>
        <div className='p-5 justify-self-center'>
            <img alt='' src={logo} onClick={() => navigate("/project")}/>
        </div>
        <hr/>
        <div className='p-6 justify-self-center w-auto text-center'>
            <h1 className='mt-10 font-black size-8 w-auto text-3xl font-sans'>Мобильное приложение<br/>
            доступно для скачивания</h1>
            <div className='mt-24 flex gap-8'>
                <div className='bg-lg1  w-535 h-408 p-4 outline-none flex' style={{borderRadius:"16px"}}>
                    <div>
                    <div className='mr-5'>
                    <h1 className=' text-white font-bold font-sans text-2xl mb-3'>Приложение<br/>
                        в App Store</h1>
                        <h3 className=' text-white font-sans'>Скачайте для iOS</h3>
                    </div>
                        <img alt='' className='w-100 mt-10 ml-5' style={{borderRadius:"6px"}} src={apps}/>
                    <div>
                        <img src={qrc} alt="" className='w-100 mt-16 ml-5'/>
                        <h6 className='text-white ml-4'>Отсканируйте, чтобы скачать</h6>
                    </div>
                    </div>
                    <img src={iphn} alt=""  style={{borderRadius:"36px"}}/>
                </div>
                <div className='bg-lg2 w-535 h-408 p-4 outline-none flex' style={{borderRadius:"16px"}}>
                    <div>
                    <div className='mr-5'>
                    <h1 className=' text-white font-bold font-sans text-2xl mb-3'>Приложение<br/>
                        в Play Market</h1>
                        <h3 className=' text-white font-sans'>Скачайте для Android</h3>
                    </div>
                        <img alt='' className='w-100 mt-10 ml-5' style={{borderRadius:"6px"}} src={gplay}/>
                    <div>
                        <img src={qrc} alt="" className='w-100 mt-16 ml-5'/>
                        <h6 className='text-white ml-4'>Отсканируйте, чтобы скачать</h6>
                    </div>
                    </div>
                    <img src={samsung} alt=""  style={{borderRadius:"36px"}}/>
                </div>
            </div>
        </div>
        <hr className='w-1150 ml-48'></hr>
        <div className='flex p-8'>
            <p className='text-gray-600 text-sm font-sans ml-40'>© 2021 Все права защищены</p>
            <h1 className='font-bold' style={{marginLeft:"680px"}}>Пользовательское соглашение</h1>
    </div>
    </div>
  )
}

export default Firstpg