import React, {useState, useRef} from 'react'
import { Helmet } from 'react-helmet';
import img from "../imges/image2.png"
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import upolad from "../imges/upolad.jpg"
import close from "../imges/icon.svg"
import "../styles/Projects.css"
import plus from "../imges/plus.svg"

function ProjectsMain() {
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const fileInputRef = useRef(null); // Реф для скрытого инпута
  const [values, setValues] = useState({
    title: '',
    queue: '',
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Открытие диалога выбора файла
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  const uploadImage = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
  const isCompleted = isValue && image

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
  
  return (
    <div className='p-5 bg-gray-100 rounded-2xl'>
      <Helmet>
        <title>Проекты на главной</title>
      </Helmet>
        <div className='flex gap-96'>
        <div className='flex gap-1 mr-20'>
          <h1 className='font-black text-lg w-max'>Проекты на главной</h1>
          <span className='mt-2'>2</span>
        </div>
        <button className='add ml-80' onClick={openModal1}> <img src={plus} alt="" /> <h1>Добавить</h1></button>
      </div>
         <div className='block p-5 w-506 bg-white h-96 hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
        <img src={img} alt="" className='w-506 h-60'/>
        <h1 className='font-black font-mono'>Название проекта</h1>
        <h2 className='text-gray-400'>Категория•Тип</h2>
        <div className='flex gap-60'>
          <div className='flex gap-1 mt-8'>
            Проекты на главной #1
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
            <img src={close} alt='' className='' onClick={() => closeModal()}/>
            </div>
            <hr />
              <p className='text-center text-gray-400'>Вы уверены, что хотите удалить этот проект из главного?</p>
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
            <h3 className="font-bold font-mono mb-4 w-max">Добавить проекта на главной</h3>
            <h3 className='rotate-45 text-2xl' onClick={closeModal1}>+</h3>
            </div>
            <hr />
            <div className='mt-5'>
              {renderInput("Название проекта", "title", "text", 96)}
              {renderInput("очередность", "queue", "number", 96)}
              <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="w-96 rounded-2xl h-52 mt-5 border-dashed border-4 border-gray-400 flex items-center justify-center flex-col"
              >
                  {image ? (
                    <img src={image} alt="Uploaded" className="object-cover rounded-md" />
                  ) : (
                  <div>
                       <img src={upolad} alt="Upload" className="ml-28" />
                      <p className="text-gray-500 flex gap-2">Перетащите изображение или <div className='text-blue-700 cursor-default' onClick={handleClick}>загрузите</div></p>
                  </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
               </div>
            </div>
            <div className='ml-20 space-x-5 mt-5'>
              <button className={`rounded-xl bg-purple-700 text-center
                                  ${isCompleted ? "opacity-100" : "opacity-50"}`}                 
              disabled={!isCompleted}
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

export default ProjectsMain