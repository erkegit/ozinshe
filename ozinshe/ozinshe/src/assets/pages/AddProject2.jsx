import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import upolad from "../imges/upolad.jpg"
import trash from "../imges/trash.svg"
import checked from "../imges/Duotone.jpg"
import { Helmet } from 'react-helmet';

function AddProject2() {
    const [image, setImage] = useState(null);
    const [scernshot, setScreanshot] = useState([]);
    const fileInputRef = useRef(null); // Реф для скрытого инпута
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate()

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

  const handleDrop1 = (e) => {
    e.preventDefault();
    if (scernshot.length >= 10) return;

    const newImage = e.dataTransfer.files[0];
    if (newImage && newImage.type.startsWith('image/')) {
      setScreanshot([...scernshot, URL.createObjectURL(newImage)]);
    }
  };

  const handleDragOver1 = (e) => {
    e.preventDefault();
  };

  const handleClick1 = () => {
    e.preventDefault();
    if (scernshot.length >= 10) return;

    const newImage = e.dataTransfer.files[0];
    if (newImage && newImage.type.startsWith('image/')) {
      setScreanshot([...scernshot, URL.createObjectURL(newImage)]);
    }
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    uploadImage1(file);
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

  const uploadImage1 = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setScreanshot(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    setScreanshot(scernshot.filter((_, i) => i !== index));
  };

    const ishav = scernshot && image

    return (
        <div className='p-6 bg-gray-100 block space-y-10' style={{borderRadius:"20px"}}>
          <Helmet>
        <title>Добавить проект</title>
      </Helmet>
            <div>
                <div className='flex gap-5 mb-5'>
                    <h3 className='text-gray-400' onClick={() => navigate("/project")}>Проекты</h3>
                    <p className='text-gray-400'>{">"}</p>
                    <h2 className='font-black font-mono'>Добавить проект</h2>
                </div>
                <div className='bg-white w-824 h-1373 rounded-xl p-5 outline-none'>
                    <div className='flex gap-4 mb-7'>
                        <button className='text-3xl bg-gray-200 pl-1 pr-1 rounded-lg' onClick={() => navigate("/project")}>←</button>
                        <h1 className='font-black font-mono text-3xl'>Обложка и скриншоты</h1>
                    </div>
                    <div>
                        <div>
                            <h1 className='font-black font-mono text-2xl'>Обложка</h1>
                            <p>Рекомендуется использовать картинки размером не менее 375×550px</p>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className="w-800 rounded-2xl h-64 border-dashed border-4 border-gray-400 flex items-center justify-center flex-col"
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
                        <hr className='mt-5'/>
                        <div className='mt-5'>
                            <h1 className='font-black font-mono text-2xl'>Скриншот</h1>
                            <p>Рекомендуется использовать картинки размером не менее 400×226px</p>
                            <div
                                onDrop={handleDrop1}
                                onDragOver={handleDragOver1}
                                className="w-800 rounded-2xl h-64 border-dashed border-4 border-gray-400 flex items-center justify-center flex-col"
                            >
                                <div>
                                     <img src={upolad} alt="Upload" className="ml-28" />
                                    <p className="text-gray-500 flex gap-2">Перетащите изображение или <div className='text-blue-700' onClick={handleClick1}>загрузите</div></p>
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleFileChange1}
                                />
                             </div>
                        </div>
                        {scernshot.map((src, index) => (
                            <div key={index} className="relative mt-5">
                              <div>
                              <img src={src} alt={`Screenshot ${index + 1}`} className="w-36 h-24rounded-lg" />
                              <button
                                onClick={() => handleDelete(index)}
                                className="absolute z-10 top-2 left-28 bg-white rounded-full p-1"
                              >
                                <img src={trash} alt="" />
                              </button>
                              </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex mt-10'>
      <button className='p-1 bg-gray-200 text-black w-32  rounded-xl font-mono font-black' onClick={() => navigate("/project/add/step2")}>
            Назад
        </button>
        <div className='flex ml-80 gap-5'>
                {/* <button className={`p-1 bg-purple-600 text-white w-32 rounded-xl font-mono font-black`}>
                    Далее
                </button> */}
                <button
                    type="submit"
                    className={`px-9 rounded-xl transition-opacity duration-300 
                      ${ishav ? 'bg-purple-600 text-white opacity-100' : 'bg-purple-400 text-white opacity-50 cursor-not-allowed'}`}
                    disabled={!ishav}
                    onClick={openModal}
                >
                   Далее
                </button>
                <button className='p-1 bg-gray-200 text-black w-32 rounded-xl font-mono font-black' onClick={() => navigate("/project")}>
                    Отмена
                </button>
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
            <div className='flex gap-56 space-x-2 ml-80 mr-0'>
            <h3 className='rotate-45 text-3xl ml-10 mb-3 cursor-default' onClick={closeModal}>+</h3>
            </div>
            <hr />
              <img src={checked} alt="" className='ml-44 mt-5'/>
              <p className='text-center'>Проект добавлен успешно!</p>
              <button className=' rounded-xl bg-purple-700 text-center ml-40 mt-5' onClick={() => navigate("/project")}>
                <h1 className='mr-3 ml-3 mt-1 mb-1 text-white'>Закрыт</h1>
              </button>
          </div>
        </div>
      )}
        </div>
)
}

export default AddProject2