import React,{useState} from 'react'
import arrdown from "../imges/arrdown.svg"
import smile from "../imges/smile.jpg"

function Users() {
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
        <div className=''>
        <div className='flex gap-3'>
          <h1 className='font-black text-lg w-max'>Пользватели</h1>
          <span className='mt-2'>142</span>
        </div>
       </div>
       <div className='flex p-1 gap-3 bg-gray-200' style={{borderRadius:"12px"}}>
              <h2 className='text-gray-500'>Сортировка:</h2>
              <h1 className='font-black font-mono'>По дате регистраци</h1>
              <img src={arrdown} alt="" />
        </div>
        <div className='block p-5 w-72 bg-white h-auto hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
            <div className='border p-2 bg-blue-700 text-center w-12 rounded-md shadow-3xl'>
                <h1 className='font-black font-mono text-lg text-white'>
                    C
                </h1>
            </div>
            <div>
                <h1 className='font-black font-mono text-xl cursor-default hover:text-blue-700' onClick={openModal}>Cameron Williamson</h1>
                <p className='text-gray-300'>mail@gmail.com</p>
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
            <h3 className="font-bold font-mono mb-4">Даные Пользвателя</h3>
            <h3 className='rotate-45 text-2xl' onClick={closeModal}>+</h3>
            </div>
            <hr />
            <img src={smile} alt="" className='ml-36 mt-4'/>
            <div className='ml-24 block space-y-1'>
                <h1 className='font-black font-mono text-xl hover:text-blue-700'>Cameron Williamson</h1>
                <p className='text-gray-400 ml-7'>+7 (702) 213-12-31</p>
                <p className='text-gray-400 ml-10'>mail@gmail.com</p>
                <p className='text-gray-400 ml-2'>Дата рождения: 31.10.2001</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users