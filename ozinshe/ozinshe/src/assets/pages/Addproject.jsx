import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    category: '',
    projectType: '',
    rating: '',
    year: '',
    duration: '',
    description: '',
    keywords: '',
    producer: '',
    director: ''
  });
  

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



  const renderInput = (label, field, type) => (
    <div className="relative w-64 mt-8">
      <input
        type={type}
        value={values[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onKeyDown={type === 'number' ? preventInvalidInput : null}
        className={`w-760 h-12 border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50 placeholder:text-gray-600
          ${errors[field] ? `border-red-500` : `border-gray-50 focus:border-blue-500`}`}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
      placeholder={focusedFields[field] ? "" :label}
      />
      <label
        className={`absolute left-3 top-3   transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white' : 'text-transparent'}`}
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
        className={`absolute left-3 top-2   transition-all duration-300 
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
        className={`w-760 border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50
          ${errors[field] ? 'border-red-500' : 'border-gray-50 focus:border-blue-500'}`}
        onFocus={() => setFocusedFields({ ...focusedFields, [field]: true })}
        onBlur={() => handleBlur(field)}
      ></textarea>
      <label
        className={`absolute left-3 top-3   transition-all duration-300 
          ${focusedFields[field] ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white' : 'text-gray-500'}`}
      >
        {label}
      </label>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  const isFormComplete = Object.values(values).every((value) => value.trim() !== '');

  return (
    <div className='p-6 bg-gray-100 w-872  block space-y-10' style={{borderRadius:"20px"}}>
      <Helmet>
        <title>Добавить проект</title>
      </Helmet>
    <div>
     <div className='flex gap-5 mb-5'>
        <h3 className='text-gray-400' onClick={() => navigate("/project")}>Проекты</h3>
        <p className='text-gray-400'>{">"}</p>
        <h2 className='font-black font-mono'>Добавить проект</h2>
    </div>
    <div className='bg-white w-824  h-1373 rounded-xl p-5'>
        <div className='flex gap-4'>
            <button className='text-3xl bg-gray-200 pl-1 pr-1 rounded-lg' onClick={() => navigate("/project")}>←</button>
            <h1 className='font-black font-mono text-3xl'>Основная информация</h1>
        </div>
    <form>
      {renderInput('Название проекта', 'title', 'text')}
      {renderSelect('Категория', 'category', ['Фильм', 'Сериал', 'Документальный', 'Мултьсериял'], 760)}
      <div className="flex flex-wrap gap-4 mt-4">
       <div>
       <div className="flex-1">
      {renderSelect('Тип проекта', 'projectType', ['Короткометражный', 'Полнометражный', 'Мультфильм', 'Серия'], 86)}
        </div>
        <div className="flex-1">
      {renderSelect('Хронометраж', 'duration', ['1мин', '2мин', '3мин', '4мин', '5мин', '6мин', '7мин', '8мин', '9мин', '10мин', '15мин', '30 мин', '60 мин', '90 мин', '120 мин'], 86)}
        </div>
       </div>
        <div>
        <div className="flex-1">
      {renderSelect('Возрастной рейтинг', 'rating', ['0+', '6+', '12+', '16+', '18+'], 86)}
        </div>
        <div className="flex-1">
      {renderSelect('Год', 'year', ['2020', '2021', '2022', '2023', '2024'], 86)}
        </div>
        </div>
      </div>
      {renderTextArea('Описание проекта', 'description')}
      {renderInput('Ключевые слова', 'keywords', 'text')}
      {renderInput('Продюсер', 'producer', 'text')}
      {renderInput('Режиссер', 'director', 'text')}
      <div className='flex mt-10 relative left-96 ml-28 gap-5'>
                {/* <button className={`p-1 bg-purple-600 text-white w-32 rounded-xl font-mono font-black`}>
                    Далее
                </button> */}
                <button
                    type="submit"
                    className={`px-9 rounded-xl transition-opacity duration-300 
                      ${isFormComplete ? 'bg-purple-600 text-white opacity-100' : 'bg-purple-400 text-white opacity-50 cursor-not-allowed'}`}
                    disabled={!isFormComplete}
                    onClick={() =>  navigate("/project/add/step2")}
                >
                   Далее
                </button>
                <button className='p-1 bg-gray-200 text-black w-32 rounded-xl font-mono font-black' onClick={() => navigate("/project")}>
                    Отмена
                </button>
            </div>
    </form>
    </div>
    </div>
    </div>
  );
}

export default ProjectForm;
