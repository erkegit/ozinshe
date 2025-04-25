import React, {useState} from 'react'
import { Helmet } from 'react-helmet';
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import close from "../imges/icon.svg"
import "../styles/Projects.css"
import plus from "../imges/plus.svg"

function Roles() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [values, setValues] = useState({
    role: '',
    projects:"",
    categories:"",
    users:"",
    roles:"",
  });


  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [focusedFields, setFocusedFields] = useState({});
  const [errors, setErrors] = useState({});

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

  const isValue = Object.values(values).every((value) => value.trim() !== '')

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
  const renderSelect = (label, field, options, w) => (
    <div className="relative w-full mt-4">
      <select
        value={values[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
        className={`w-${w} border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50 
          ${errors[field] ? 'border-red-500' : 'border-gray-50 focus:border-blue-500'}`}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label
        className={`absolute left-3 top-3   transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white ' : 'text-gray-500'}`}
      >
        {label}
      </label>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  return (
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Роли</title>
      </Helmet>
       <div className='flex gap-96'>
        <div className='flex mr-20'>
          <h1 className='font-black text-3xl'>Роли</h1>
          <span className='ml-2 mt-3'>3</span>
        </div>
        <button className='add ml-96' onClick={openModal1}> <img src={plus} alt="" /> <h1>Добавить</h1></button>
      </div>
    <div className='block p-5 w-535 bg-white h-auto hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
            <h1 className='font-black font-mono text-2xl'>Менеджер 1</h1>
            <div className='blok space-y-3 mt-3 ml-1'>
                <div className='flex gap-2'>
                    <span>✓</span>
                    <h1 className='font-black font-mono text-md'>Проекты</h1>
                    <h3 className='text-gray-300'>(Редактирование)</h3>
                </div>
                <div className='flex gap-2'>
                    <span>✓</span>
                    <h1 className='font-black font-mono text-md'>Категории</h1>
                    <h3 className='text-gray-300'>(Только чтение)</h3>
                </div>
                <div className='flex gap-44'>
                    <div className='flex gap-2'>
                        <span>✓</span>
                        <h1 className='font-black font-mono text-md'>Пользователи</h1>
                        <h3 className='text-gray-300'>(Только чтение)</h3>
                    </div> 
                    <div className='flex gap-5 mt-1'>
                        <img src={pen} alt="" className='w-4 h-4 ' onClick={() => alert("Редактирование не доступно")}/>
                        <img src={trash} alt="" className='w-4 h-4 ' onClick={openModal}/>
                    </div>    
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

      {isOpen1 && (
        <div
          onClick={closeModal1}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <div className='flex gap-56 space-x-2'>
            <h3 className="font-bold font-mono mb-4 w-max">Добавить роль</h3>
            <h3 className='rotate-45 text-2xl' onClick={closeModal1}>+</h3>
            </div>
            <hr />
            <div className='mt-5'>
              {renderInput("Наименавание", "role", "text", 96)}
              {renderSelect("Проекты", "projects", ["Редактирование", "Только чтение"], 96)}
              {renderSelect("Категори", "categories", ["Редактирование", "Только чтение"], 96)}
              {renderSelect("Пользватели", "users", ["Редактирование", "Только чтение"], 96)}
              {renderSelect("Роли", "roles", ["Редактирование", "Только чтение"], 96)}
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

export default Roles