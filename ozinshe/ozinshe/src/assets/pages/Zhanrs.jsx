import React,{useState, useRef} from 'react'
import { Helmet } from 'react-helmet';
import trash from "../imges/trash.svg"
import pen from "../imges/pen.svg"
import upolad from "../imges/upolad.jpg"
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
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const fileInputRef = useRef(null);
    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => {
      setIsOpen1(false);
    }
    function add(){
      setZhanrs([...zhanrs, {id: zhanrs.length + 1, viwes: 21, img: image, name: values.zhanr}])
      setValues({zhanr: '', img: ''});
      setImage(null);
    }
  
    
    const [values, setValues] = useState({
      zhanr: '',
      img: "",
    })
  
    
  
    const [image, setImage] = useState("");
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
    const isCompleted = isValue || image
  
    const renderInput = (label, field, type, w, h) => (
      <div className="relative w-64 mt-8">
        <input
          type={type}
          value={values[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          onKeyDown={type === 'number' ? preventInvalidInput : null}
          className={`w-96 border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50
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
        <title>Жанры</title>
      </Helmet>
    <div className='flex gap-96'>
     <div className='flex mr-20'>
       <h1 className='font-black text-3xl'>Жанры</h1>
       <span className='ml-2 mt-3'>{zhanrs.length}</span>
     </div>
     <button className='add ml-96' onClick={openModal1}> <img src={plus} alt="" /> <h1>Добавить</h1></button>
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
            <h3 className="font-bold font-mono  w-max">Добавить жанр</h3>
            <img className='' src={close} alt="" onClick={closeModal1}/>
            </div>
            <hr />
            <div className='mt-5 space-y-3'>
              {renderInput("Жанр", "zhanr", "text")}
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
              <button className=' rounded-xl bg-gray-200 text-center' onClick={() => {closeModal1(); }}>
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