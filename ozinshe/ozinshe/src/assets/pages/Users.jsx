import React,{useState} from 'react'
import arrdown from "../imges/arrdown.svg"
import smile from "../imges/smile.jpg"
import pen from "../imges/edit.svg"

function Users() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(1)

  const openModal = (id) => {
    setIsOpen(true)
    setActiveItem(id)
  }
  const closeModal = () => setIsOpen(false);
  
  const [users, setUsers] = useState([
    {id: 1, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"G", mail:"mail@gmail.com",  name: 'Guy Hawkins',},
    {id: 2, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"R", mail:"mail@gmail.com",  name: 'Ronald Richards',},
    {id: 3, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"M", mail:"mail@gmail.com",  name: 'Marvin McKinney',},
    {id: 4, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"B", mail:"mail@gmail.com",  name: 'Bessie Cooper',},
    {id: 5, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"R", mail:"mail@gmail.com",  name: 'Ralph Edwards',},
    {id: 6, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"A", mail:"mail@gmail.com",  name: 'Arlene McCoy',},
    {id: 7, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"C", mail:"mail@gmail.com",  name: 'Cody Fisher',},
    {id: 8, date:"31.10.2001", phone:"+7 (702) 213-12-31", firstSymbol:"C", mail:"mail@gmail.com",  name: 'Cameron Williamson',},
  ])

  return (
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
        <div className=''>
        <div className='flex gap-3'>
          <h1 className='font-black text-lg w-max'>Пользватели</h1>
          <span className='mt-2'>142</span>
        </div>
       </div>
       <div className='flex p-1 gap-3 bg-gray-200 w-80 justify-center items-center' style={{borderRadius:"12px"}}>
              <h2 className='text-gray-500'>Сортировка:</h2>
              <h1 className='font-black font-mono'>По дате регистраци</h1>
              <img src={arrdown} alt="" />
        </div>
        <div className='flex flex-wrap gap-5'>
        {
          users.map((user) => (
          <div key={user.id} className='block p-5 w-72 bg-white h-auto hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
            <div className='border p-2 bg-blue-700 text-center w-12 rounded-md shadow-3xl'>
                <h1 className='font-black font-mono text-lg text-white'>
                    {user.firstSymbol}
                </h1>
            </div>
            <div>
                <h1 className='font-black font-mono text-xl cursor-default hover:text-blue-700' onClick={() => openModal(user.id)}>{user.name}</h1>
                <p className='text-gray-300'>{user.mail}</p>
            </div>
      </div>
          ))
        }
        </div>
      {isOpen && users.map((user) => (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          key={user.id}
          style={{ display: activeItem === user.id ? 'flex' : 'none' }}
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
            <div className='justify-items-center'>
            <img src={smile} alt="" className=''/>
            <img src={pen} alt="" className='z-10 p-2 ml-20 relative -top-5 mb-0' style={{background: "var(--Primary-Red-300, #B376F7)", borderRadius:"40px"}} />
            </div>
            <div className='block space-y-1 justify-items-center'>
                <h1 className='font-black font-mono text-xl hover:text-blue-700'>{user.name}</h1>
                <p className='text-gray-400'>{user.phone}</p>
                <p className='text-gray-400'>{user.mail}</p>
                <p className='text-gray-400'>Дата рождения: {user.date}</p>
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}

export default Users