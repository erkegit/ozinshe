import React,{useState} from 'react'
import { Helmet } from 'react-helmet';
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import camera from "../imges/camera.svg"
import close from "../imges/icon.svg"
import "../styles/Projects.css"
import plus from "../imges/plus.svg"
//import arrdown from "../imges/arrdown.svg"

function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [focusedFields, setFocusedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    category:""
  });

  const handleBlur = (field) => {
    setFocusedFields({ ...focusedFields, [field]: values[field] !== '' });
    if (!values[field]) {
      setErrors({ ...errors, [field]: 'Поле не может быть пустым' });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const preventInvalidInput = (e) => {
    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  };

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const renderInput = (label, field, type, w, h) => (
    <div className="relative w-64 mt-8">
      <input
        type={type}
        value={values[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onKeyDown={type === 'number' ? preventInvalidInput : null}
        className={`w-${w} h-${h} border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50
          ${errors[field] ? `border-red-500` : `border-gray-50 focus:border-blue-500`}`}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
      />
      <label
        className={`absolute left-3 top-3   transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white' : 'text-gray-500'}`}
      >
        {label}
      </label>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  const isValue = Object.values(values).every((value) => value.trim() !== '')
  return (
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Категори</title>
      </Helmet>
        <div className='flex gap-96'>
          <div className="flex mr-20">
          <h1 className='font-black text-lg w-max'>Категори</h1>
          <span className='mt-2'>10</span>
          </div>
          <button className='add ml-96' onClick={openModal1}> <img src={plus} alt="" /> <h1>Добавить</h1></button>
      </div>
        <div className='block p-5 w-72 bg-white h-auto hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
        <h1 className='font-black font-mono'>Мультфилмы</h1>
        <div className='flex gap-20'>
          <div className='flex gap-1 mt-8'>
            <img src={camera} alt="" className='w-4 h-4 mt-1'/>
            Число проектов
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
                  <div className='flex gap-48 space-x-2 mb-4'>
                  <h3 className="font-bold w-max font-mono">Удалить категорию?</h3>
                  <img src={close} alt='' className='' onClick={() => closeModal()}/>
                  </div>
                  <hr/>
                    <p className='text-center text-gray-400'>Вы действительно хотите удалить категорию?</p>
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
      {isOpen1 && (
        <div
          onClick={closeModal1}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <div className='flex gap-28 space-x-2'>
            <h3 className="font-bold font-mono mb-4 w-max">Добавить категори</h3>
            <h3 className='rotate-45 text-2xl' onClick={closeModal1}>+</h3>
            </div>
            <hr />
            <div className='mt-5'>
              {renderInput("Название категори", "category", "text", 96)}
            </div>
            <div className='ml-20 space-x-5 mt-5'>
              <button className={`rounded-xl bg-purple-700 text-center
                                  ${isValue ? "opacity-100" : "opacity-50"}`}                 
              disabled={!isValue}
              onClick={closeModal1}>
                <h1 className='mr-3 ml-3 mt-1 mb-1 text-white'>Добавить</h1>
              </button>
              <button className=' rounded-xl bg-gray-200 text-center' onClick={closeModal1}>
                <h1 className='mr-5 ml-4 mt-1 mb-1 text-black'>Отмена</h1>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories