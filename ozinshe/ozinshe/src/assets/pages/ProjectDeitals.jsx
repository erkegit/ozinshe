import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import clock from "../imges/Clock.svg"
import eye from "../imges/eye.svg"
import star from "../imges/star.svg";
import share from "../imges/share.svg";
import video from "../imges/Video.png";
import { Skeleton } from '@mui/material'
import subtitles from "../imges/subtitles.svg"
import clpbrd from "../imges/clapper-board.svg"
import img from "../imges/Image.jpg"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function ProjectDeitals() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
   <div className='flex'>
    <Helmet>
        <title>Детали</title>
      </Helmet>
     <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
        <div className='flex gap-5'>
            <h3 className='text-gray-400' onClick={() => navigate("/project")}>Проекты</h3>
            <p className='text-gray-400'>{">"}</p>
            <h2 className='font-black font-mono'>Название проекта</h2>
        </div>
        <div className='bg-white w-824 h-1373 rounded-xl p-5'>
            <div className='flex gap-80'>
            <h1 className='font-black font-mono text-2xl'>Название Проекта</h1>
            <div className='flex gap-7'>
              <button className='p-2 text-center bg-gray-200 font-black font-mono rounded-3xl' onClick={() => alert("Редактирование не доступно")}>
                Редактировать
              </button>
              <button className='p-2 items-center bg-red-600 rounded-full text-white' onClick={openModal}>
                <DeleteOutlineIcon/>
              </button>
            </div>
            </div>
          <div className='flex gap-5 mt-8'>
            <div className='flex gap-1'>
            <img src={eye} alt="" className='w-4 h-4 mt-1'/>
                Просмотры
            </div>
            <div className='flex gap-1'>
            <img src={star} alt="" className='w-4 h-4 mt-1'/>
                Рейтинг
            </div>
            <div className='flex gap-1'>
            <img src={share} alt="" className='w-4 h-4 mt-1'/>
                Число поделений
            </div>
          </div>
          <img src={video} alt="" />
          <div className='mt-10 space-y-5'>
            <button className='w-24 h-8 bg-blue-200 rounded text-blue-600'>Сезоны</button>
            <div className='border-b-2 border-blue-700 w-12 mb-0' style={{borderTopLeftRadius:"50px", borderTopRightRadius:"50px"}}>
                <h1 className='mb-3 text-blue-700'>Серий</h1>
            </div>
          </div>
          <hr className=''></hr>

          <h1 className='font-black font-mono text-2xl mt-5'>Описание</h1>
          <p className='mt-5'>
            Описание проекта
          </p>
           <div className='block space-y-4 mt-5'>
           <div className='flex gap-4'>
              <h6 className='text-sm text-gray-400'>Режиссер:</h6>
              <p>Режиссер проекта</p>
            </div> 
            <div className='flex gap-4'>
              <h6 className='text-sm text-gray-400'>Продюсер:</h6>
              <p>Продюсер проекта</p>
            </div>
           </div>
              <hr className='mt-12'/>
              <h1 className='font-black font-mono text-2xl mt-5'>Скриншоты</h1>
              <Skeleton variant="rectangular" width={178} height={108}/>
        </div>
    </div>
    <div className='p-1'>
      <div className='block space-y-5 p-1'>
        <div className='flex gap-2'>
          <img src={clock} alt="" className='w-4 h-4 mt-1'/>
          <p className=''>Год</p>
        </div>
        <div className='flex gap-2'>
          <img src={clpbrd} alt="" className='w-4 h-4 mt-1'/>
          <p className=''>Категория•Тип</p>
        </div>
        <div className='flex gap-2'>
          <img src={subtitles} alt="" className='w-4 h-4 mt-1'/>
          <p className=''>Сезон, Сериа, Минут</p>
        </div>
        <img src={img} alt="" className='rounded-sm'/>
      </div>
      <div className='space-y-5 mt-10'>
        <div className='flex gap-1'>
          <h2 className='text-gray-300'>Добавил:</h2>
          <p>Человек который добваил этот проект</p>
        </div>
        <div className='flex gap-1'>
          <h2 className='text-gray-300'>Дата добавленя:</h2>
          <p>Дата добавленя</p>
        </div>
        <div className='flex gap-1'>
          <h2 className='text-gray-300'>Дата обновления:</h2>
          <p>Дата обновления</p>
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

export default ProjectDeitals