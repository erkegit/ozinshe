import React, {useState, useRef, useEffect} from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import upolad from "../imges/upolad.jpg"
import camera from "../imges/camera.svg"
import avatar1 from "../imges/Avatar1.jpg"
import avatar2 from "../imges/Avatar2.jpg"
import avatar3 from "../imges/Avatar3.jpg"
import avatar4 from "../imges/Avatar4.jpg"
import avatar5 from "../imges/Avatar5.jpg"
import "../styles/Projects.css"
import plus from "../imges/plus.svg"
import close from "../imges/icon.svg"


// bg-gradient-to-br to-purple-500 from-green-500 
function Ages() {
  const [ages, setAges] = useState([
    {id: 1, views:21, img:avatar1, name: '8-10',},
    {id: 2, views:21, img:avatar2, name: '10-12',},
    {id: 3, views:21, img:avatar3, name: '12-14',},
    {id: 4, views:21, img:avatar4, name: '14-16',},
    {id: 5, views:21, img:avatar5, name: '16-18'},
  ])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = (id) => {
    setIsOpen(false);
    setAges(ages.filter((age) => age.id !== id))
  }
const fileInputRef = useRef(null);
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => {
    setIsOpen1(false);
  }
  function add(){
    setAges([...ages, {id: ages.length + 1, views: 21, img: image, name: values.age}])
    setValues({age: '', img: ''});
    setImage(null);
  }

  
  const [values, setValues] = useState({
    age: '',
    img: "",
  })

  const [ageCategory, setAgeCategory] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://185.100.67.64/age-category', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      setAgeCategory(response.data.result);
    })
    .catch((error) => {
      console.error('Error fetching age categories:', error);
    });
  })

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


  const [focusedFields, setFocusedFields] = useState(null);
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
  const isCompleted = isValue || image

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
    <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Возрасты</title>
      </Helmet>
    <div className='flex gap-96'>
     <div className='flex mr-20'>
       <h1 className='font-black text-3xl'>Возрасты</h1>
       <span className='ml-2 mt-3'>{!token ? ages.length : ageCategory?.length}</span>
     </div>
     <button className='add ml-96' onClick={openModal1}> <img src={plus} alt="" /> <h1>Добавить</h1></button>
   </div>
 <div className='flex flex-wrap gap-5'>
 
  {
     !token ? (ages.map(age => (
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
         <img src={trash} alt="" className='w-4 h-4 ' onClick={() => openModal()}/>
     </div>
   </div>
</div>
    ))
  ) : (
    ageCategory?.map(age => (
      <div key={age.ageCategoryId} className='block p-5 w-60 bg-white h-auto  hover:shadow-gray-300 hover:shadow-sm hover:scale-105 duration-200' style={{borderRadius:"16px"}}>
        <img src={`http://185.100.67.64/${age.imageSrc}`} alt="" className='mb-2'/>
  <h1 className='font-black font-mono '>
    {age.name} жас
  </h1>
  <div className='flex gap-32 mt-4'>
     <div className='flex gap-1'>
       <img src={camera} alt="" className='w-4 h-4 mt-1'/>
       <h1 className="text-gray-500 text-sm">{age.countOfMovies}</h1>
     </div>
     <div className='flex gap-5'>
         <img src={pen} alt="" className='w-4 h-4 '/>
         <img src={trash} alt="" className='w-4 h-4 ' onClick={() => openModal()}/>
     </div>
   </div>
</div>
    ))
  )
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
            <h3 className="font-bold font-mono">Удалить возраст?</h3>
            <img src={close} alt='' className='' onClick={() => closeModal()}/>
            </div>
            <hr/>
              <p className='text-center text-gray-400'>Вы действительно хотите удалить возраст?</p>
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
            <div className='flex justify-items-center gap-56 space-x-2'>
            <h3 className="font-bold font-mono  w-max">Добавить возраст</h3>
            <img className='' src={close} alt="" onClick={closeModal1}/>
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
              className={`rounded-xl bg-purple-700 text-center ${isCompleted ? "opacity-100" : "opacity-25"}`}
              disabled={!isCompleted}
              onClick={() => {add(); closeModal1();}}
            >
              <h1 className='mr-3 ml-3 mt-1 mb-1 text-white'>Добавить</h1>
            </button>
              <button className=' rounded-xl bg-gray-200 text-center' onClick={() => {closeModal1();    setValues({age: '', img: ''}); }}>
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