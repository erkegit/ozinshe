import React,{useState} from 'react'
import { Helmet } from 'react-helmet';
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import camera from "../imges/camera.svg"
import rc1 from "../imges/rc (1).jpg"
import rc2 from "../imges/rc (2).jpg"
import rc3 from "../imges/rc (3).jpg"
import rc4 from "../imges/rc (4).jpg"
import rc5 from "../imges/rc (5).jpg"
import rc6 from "../imges/rc (6).jpg"
import rc7 from "../imges/rc (7).jpg"
import rc8 from "../imges/rc (8).jpg"
import rc9 from "../imges/rc (9).jpg"


function Zhanrs() {
  const [zhanrs, setZhanrs] = useState([
    {id: 1, viwes:21, img: rc5, name: 'Комедиялар'},
    {id: 2, viwes:21, img: rc6, name: 'Отбасымен көретіндер'},
    {id: 3, viwes:21, img: rc3, name: 'Ғылым танымдық'},
    {id: 4, viwes:21, img: rc7, name: 'Ойын сауық'},
    {id: 5, viwes:21, img: rc8, name: 'Ғылым фантастика және фентези'},
    {id: 6, viwes:21, img: rc9, name: 'Шытырман оқиғалар'},
    {id: 7, viwes:21, img: rc4, name: 'Қысқаметрлі'},
    {id: 8, viwes:21, img: rc1, name: 'Музыкалық'},
    {id: 9, viwes:21, img: rc2, name: 'Спорттыық'},
  ])
  console.log(zhanrs)
  return (
    <div className='md:ml-48 p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Жанры</title>
      </Helmet>
    <div className='flex gap-96'>
     <div className='flex'>
       <h1 className='font-black text-3xl'>Жанры</h1>
       <span className='ml-2 mt-3'>{zhanrs.length}</span>
     </div>
     <button className='ml-96 text-white text-2xl flex gap-2 bg-purple-500 p-2 text-center' style={{borderRadius:"12px"}}><h2 className='text-2xl'>+</h2><h1>Добавить</h1></button>
   </div>
 <div className='flex flex-wrap gap-5'>
 {
 zhanrs && zhanrs.map(zhanr => (
  <div key={zhanr.id} className='space-y-4 block p-5 w-60 bg-white h-60  hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
  <img src={zhanr.img} alt="" className='rounded-lg'/>
  <h1 className='font-black font-mono'>{zhanr.name}</h1>
  <div className='flex gap-24'>
     <div className='flex gap-1'>
       <img src={camera} alt="" className='w-4 h-4 mt-1'/>
       <h1 className="text-gray-500 text-sm">{zhanr.viwes}</h1>
     </div>
     <div className='flex gap-5'>
         <img src={pen} alt="" className='w-4 h-4 ' onClick={() => alert("Редактирование не доступно")}/>
         <img src={trash} alt="" className='w-4 h-4 '/>
     </div>
   </div>
</div>
 ))
 }
 </div>
 </div>
  )
}

export default Zhanrs