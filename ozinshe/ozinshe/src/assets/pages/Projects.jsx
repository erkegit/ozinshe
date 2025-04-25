import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import arrdown from "../imges/arrdown.svg"
import clock from "../imges/Clock.svg"
import img from "../imges/image.png"
import eye from "../imges/eye.svg"
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import { useNavigate } from 'react-router-dom'
import "../styles/Projects.css"
import plus from "../imges/plus.svg"

function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false)
  const navigate = useNavigate()
  return (
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Проекты</title>
      </Helmet>
      <div className='flex gap-96'>
        <div className='flex mr-10'>
          <h1 className='font-black text-3xl'>Проекты</h1>
          <span className='ml-2 mt-3'>113</span>
        </div>
        <button className='add ml-96' onClick={() => navigate("/project/add/step1")}> <img src={plus} alt="" /> <h1>Добавить</h1></button>
      </div>
      <div className='flex gap-72'>
          <div className='flex gap-3'>
            <div className='flex p-1 gap-3 bg-gray-200' style={{borderRadius:"12px"}}>
              <h2 className='text-gray-500'>Сортировка:</h2>
              <h1 className='font-black font-mono'>Популярные</h1>
              <img src={arrdown} alt="" />
            </div>
            <div className='flex p-1 gap-3 bg-gray-200' style={{borderRadius:"12px"}}>
              <h2 className='text-gray-500'>Категория:</h2>
              <h1 className='font-black font-mono'>Все категори</h1>
              <img src={arrdown} alt="" />
            </div>
            <div className='flex p-1 gap-3 bg-gray-200' style={{borderRadius:"12px"}}>
              <h2 className='text-gray-500'>Тип:</h2>
              <h1 className='font-black font-mono'>Фильм и Сериалы</h1>
              <img src={arrdown} alt="" />
            </div>
          </div>
         <div className=''>
         <div className='flex p-1 gap-3 bg-gray-200' style={{borderRadius:"12px"}}>
              <img src={clock} alt="" />
              <h1 className='font-black font-mono'>Выберите год</h1>
          </div>
         </div>
      </div> 
      <h1>Здесь скоро будеть показоно все проекты а так же проекты по вашим интересам </h1> 
      <h1>Пример:</h1>
      <div className='block p-5 w-64 bg-white h-460 hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
        <span className='bg-black opacity-80 z-20 rounded-md absolute mt-3 ml-3 text-white  p-1'>
          Сериа
        </span>
        <img src={img} alt="" />
        <h1 className='font-black font-mono hover:text-blue-700 cursor-default' onClick={() => navigate("/project/deital")}>Название проекта</h1>
        <h2 className='text-gray-400'>Категория•Тип</h2>
        <div className='flex gap-20'>
          <div className='flex gap-1 mt-8'>
            <img src={eye} alt="" className='w-4 h-4 mt-1'/>
            Просмотры
          </div>
          <div className='flex gap-5 mt-10'>
              <img src={pen} alt="" className='w-4 h-4 ' onClick={() => alert("Редактирование не доступно")}/>
              <img src={trash} alt="" className='w-4 h-4 ' onClick={openModal}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <div className='flex gap-56 space-x-2'>
            <h3 className="font-bold font-mono mb-4">Удалить проект?</h3>
            <h3 className='rotate-45 text-2xl' onClick={closeModal}>+</h3>
            </div>
            <hr />
              <p className='text-center'>Вы уверены, что хотите удалить этот проект?</p>
            <div className='ml-20 space-x-5 mt-5'>
              <button className=' rounded-xl bg-purple-700 text-center' onClick={() => alert("Для удаление потребуется API от проектов")}>
                <h1 className='mr-3 ml-3 mt-1 mb-1 text-white'>Да, удалить</h1>
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

export default Projects