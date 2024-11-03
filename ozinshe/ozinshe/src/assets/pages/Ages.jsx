import React, {useState, useRef} from 'react'
import { Helmet } from 'react-helmet';
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import upolad from "../imges/upolad.jpg"
import camera from "../imges/camera.svg"
import avatar1 from "../imges/Avatar1.jpg"
import avatar2 from "../imges/Avatar2.jpg"
import avatar3 from "../imges/Avatar3.jpg"
import avatar4 from "../imges/Avatar4.jpg"
import avatar5 from "../imges/Avatar5.jpg"


// bg-gradient-to-br to-purple-500 from-green-500 
function Ages() {
  const fileInputRef = useRef(null); // Реф для скрытого инпута
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [ages, setAges] = useState([
    {id: 1, views:21, img:avatar1, name: '8-10',},
    {id: 2, views:21, img:avatar2, name: '10-12',},
    {id: 3, views:21, img:avatar3, name: '12-14',},
    {id: 4, views:21, img:avatar4, name: '14-16',},
    {id: 5, views:21, img:avatar5, name: '16-18'},
  ])

  const [image, setImage] = useState(null);
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

  const [values, setValues] = useState({
    age: '',
    img: "",
  })

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




  const isValue = Object.values(values).every((value) => value && value.trim() !== '');
  const isCompleted = isValue & image

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
    <div className='md:ml-48 p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Возрасты</title>
      </Helmet>
    <div className='flex gap-96'>
     <div className='flex'>
       <h1 className='font-black text-3xl'>Возрасты</h1>
       <span className='ml-2 mt-3'>{ages.length}</span>
     </div>
     <button className='ml-96 text-white text-2xl flex gap-2 bg-purple-500 p-2 text-center' style={{borderRadius:"12px"}} onClick={openModal1}><h2 className='text-2xl'>+</h2><h1>Добавить</h1></button>
   </div>
 <div className='flex flex-wrap gap-5'>
 
  {
     ages.map(age => (
      <div key={age.id} className='block p-5 w-60 bg-white h-auto  hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
        <img src={age.img} alt="" className='mb-2'/>
  <h1 className='font-black font-mono '>
    {age.name} жас
  </h1>
  <div className='flex gap-32 mt-4'>
     <div className='flex gap-1'>
       <img src={camera} alt="" className='w-4 h-4 mt-1'/>
       <h1 className="text-gray-500 text-sm">{age.views}</h1>
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
              <p className='text-center'>Вы уверены, что хотите удалить этот возраст?</p>
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
            <div className='mt-5 space-y-3'>
              {renderInput("Возраст", "age", "number", 96)}
              <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="w-96 rounded-2xl h-64 border-dashed border-4 border-gray-400 flex items-center justify-center flex-col"
              >
                 {image ? (
                                  <img src={image} alt="Uploaded" className="object-cover rounded-md" />
                                ) : (
                                <div>
                                     <img src={upolad} alt="Upload" className="ml-28" />
                                    <p className="text-gray-500 flex gap-2">Перетащите изображение или <div className='text-blue-700' onClick={handleClick}>загрузите</div></p>
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
            <button 
  className={`rounded-xl bg-purple-700 text-center ${isCompleted ? "opacity-100" : "opacity-50"}`}
  disabled={!isCompleted}
  onClick={() => {closeModal1(); }}
>
  <h1 className='mr-3 ml-3 mt-1 mb-1 text-white'>Добавить</h1>
</button>
              <button className=' rounded-xl bg-gray-200 text-center' onClick={() => {closeModal1(); setValues({...values, age: ""}); setImage({...image === null})}}>
                <h1 className='mr-5 ml-4 mt-1 mb-1 text-black'>Отмена</h1>
              </button>
            </div>
          </div>
        </div>
      )}
 </div>
  )
}

export default Ages