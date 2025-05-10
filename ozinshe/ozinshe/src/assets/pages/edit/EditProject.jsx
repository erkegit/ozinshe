// EditProject.jsx (со стилями как в AddProject)
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [values, setValues] = useState({
    title: '',
    category: '',
    genres: [],
    rating: '',
    year: '',
    duration: '',
    description: '',
    keywords: '',
    producer: '',
    director: ''
  });
  const [ageCategories, setAgeCategories] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [focusedFields, setFocusedFields] = useState({});
  const [errors, setErrors] = useState({});

  // const gen = projectTypes.map((project) => project.name);
  // console.log(gen)
  
  useEffect(() => {
    // Загрузка возрастных категорий
    axios.get('http://185.100.67.64/age-category', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setAgeCategories(response.data.result);
    })
    .catch(error => {
      console.error('Ошибка при получении категорий:', error);
    });

    // Загрузка проекта по ID
    if (id) {
      axios.get(`http://185.100.67.64/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        const data = res.data.result;
        setValues({
          title: data.title || '',
          category: data.categories?.[0]?.name || '',
          genres: data.genres?.[0]?.name || '',
          rating: data.ageCategories?.[0]?.name || '',
          year: data.releaseYear || '',
          duration: data.duration || '',
          description: data.description || '',
          keyWords: data.keyWords || '',
          producer: data.producer || '',
          director: data.director || ''
        });
      })
      .catch(err => console.error('Ошибка при загрузке проекта:', err));
    }
  }, [id]);
  useEffect(() => {
    axios.get('http://185.100.67.64/genre', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setProjectTypes(response.data.result);
    })
    .catch(error => {
      console.error('Ошибка при получении категорий:', error);
    });
  })

  const handleBlur = (field) => {
    setFocusedFields({ ...focusedFields, [field]: values[field] !== '' });
    if (!values[field]) {
      setErrors({ ...errors, [field]: 'Поле не может быть пустым' });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const preventInvalidInput = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const isFormComplete = Object.entries(values).every(([key, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    if (value === null || value === undefined) return false;
    return String(value).trim() !== '';
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) return;

    axios.patch(`http://185.100.67.64/movies/${id}`, values, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
    .then(() => navigate(`/project/details/${id}`))
    .catch((err) => console.error('Ошибка при сохранении:', err));
  };


  const renderInput = (label, field, type, w) => (
    <div className="relative w-64 mt-7">
      <input
        type={type}
        value={values[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onKeyDown={type === 'number' ? preventInvalidInput : null}
        className={`w-${w} h-12 border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50 placeholder:text-gray-600
          ${errors[field] ? `border-red-500` : `border-gray-50 focus:border-blue-500`}`}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
        placeholder={focusedFields[field] ? "" : label}
      />
      <label
        className={`absolute left-3 top-3 transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white' : ' absolute flex-none text-transparent'}`}
      >
        {label}
      </label>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  const renderSelect = (label, field, options, w, multiple = false) => (
    <div className="relative w-full mt-4">
      <select
        value={values[field]}
        onChange={(e) => {const selectedOptions = multiple
          ? Array.from(e.target.selectedOptions, (option) => option.value)
          : e.target.value;
        handleChange(field, selectedOptions);}}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
        className={`w-${w} border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50 
          ${errors[field] ? 'border-red-500' : 'border-gray-50 focus:border-blue-500'}`}
      >
        {!multiple && <option value=""></option>}
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label
        className={`absolute left-3 top-2 transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white ' : 'text-gray-500'}`}
      >
        {label}
      </label>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  const renderTextArea = (label, field) => (
    <div className="relative w-full mt-4">
      <textarea
        value={values[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-760 min-h-12 border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50
          ${errors[field] ? 'border-red-500' : 'border-gray-50 focus:border-blue-500'}`}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
      ></textarea>
      <label
        className={`absolute left-3 top-3 transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white' : 'text-gray-500'}`}
      >
        {label}
      </label>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  return (
    <div className='p-6 bg-gray-100 w-872 block space-y-10' style={{ borderRadius: '20px' }}>
      <Helmet>
        <title>Редактировать проект</title>
      </Helmet>
      <div>
        <div className='flex gap-5 mb-5'>
          <h3 className='text-gray-400' onClick={() => navigate("/project")}>Проекты</h3>
          <p className='text-gray-400'>{">"}</p>
          <h2 className='font-black font-mono'>Редактировать проект</h2>
        </div>
        <div className='bg-white w-824 h-auto rounded-xl p-5'>
          <div className='flex gap-4'>
            <button className='text-3xl bg-gray-200 pl-1 pr-1 rounded-lg' onClick={() => navigate("/project")}>←</button>
            <h1 className='font-black font-mono text-3xl'>Основная информация</h1>
          </div>
          <form onSubmit={handleSubmit}>
            {renderInput('Название проекта', 'title', 'text', 760)}
            {renderSelect('Категория', 'category', ['Фильм', 'Сериал', 'Мультфилм'], 760)}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className=''>
                <div className="flex-1">
                  {renderInput('Тип проекта', 'genres', projectTypes.map(genre => genre.name), 'text', 84)}
                </div>
                <div className="flex-1">
                  {renderSelect('Хронометраж(мин)', 'duration', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '15', '30', '60', '90', '120'], 96)}
                </div>
              </div>
              <div>
                <div className="flex-1">
                  {renderSelect('Возрастной рейтинг', 'rating', ageCategories.map((age) => age.name), 84)}
                </div>
                <div className="flex-1">
                  {renderSelect('Год', 'year', ['2020', '2021', '2022', '2023', '2024', '2025'], 84)}
                </div>
              </div>
            </div>
            {renderTextArea('Описание проекта', 'description')}
            {renderInput('Ключевые слова', 'keyWords', 'text', 760)}
            {renderInput('Продюсер', 'producer', 'text',   760)}
            {renderInput('Режиссер', 'director', 'text', 760)}
            <div className='flex mt-10 relative left-96 ml-28 gap-5'>
              <button
                type="submit"
                className={`px-9 rounded-xl transition-opacity duration-300 
                  ${isFormComplete ? 'bg-purple-600 text-white opacity-100' : 'bg-purple-400 text-white opacity-50 cursor-not-allowed'}`}
                disabled={!isFormComplete}
              >
                Сохранить
              </button>
              <button className='p-1 bg-gray-200 text-black w-32 rounded-xl font-mono font-black' onClick={() => navigate("/project")}>Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
