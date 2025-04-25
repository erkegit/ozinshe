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
import "../styles/Projects.css"
import plus from "../imges/plus.svg"
import close from "../imges/icon.svg"


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
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (e) => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Жанры</title>
      </Helmet>
    <div className='flex gap-96'>
     <div className='flex mr-20'>
       <h1 className='font-black text-3xl'>Жанры</h1>
       <span className='ml-2 mt-3'>{zhanrs.length}</span>
     </div>
     <button className='add ml-96'> <img src={plus} alt="" /> <h1>Добавить</h1></button>
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
         <img src={trash} alt="" className='w-4 h-4 ' onClick={openModal}/>
     </div>
   </div>
</div>
 ))
 }
 </div>
 {isOpen && (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className='flex gap-56 space-x-2 mb-4'>
        <h3 className="font-bold font-mono">Удалить жанр?</h3>
        <img src={close} alt='' className='' onClick={() => closeModal()}/>
        </div>
        <hr/>
          <p className='text-center text-gray-400'>Вы действительно хотите удалить жанр?</p>
        <div className='ml-20 space-x-5 mt-5'>
          <button className=' rounded-2xl text-white bg-purple-700 text-center py-2 px-6' onClick={closeModal}>
            Да, удалить
          </button>
          <button className=' rounded-xl bg-gray-200 text-center' onClick={closeModal}>
            <h1 className='mr-5 ml-4 mt-1 mb-1 text-black'>Отмена</h1>
          </button>
        </div>
      </div>
    </div>
   )}
 </div>
  )
}

export default Zhanrs