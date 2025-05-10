import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import logo from '../imges/Your App.svg'
import eye from "../imges/eye.svg"
import heye from "../imges/heye.svg"
import axios from 'axios';

function Register(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://185.100.67.64/auth/signin', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response:', response.data); 
      const token = response.data.result;       
      if (token) {
        localStorage.setItem('token', token);
        navigate('/project');
      } else {
        alert('Токен не получен');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Неправильный логин или пароль");
    });
  };

  const pemail = () => {
   const prmt =  prompt("Введите почту для восстановления пароля")
    axios.post('http://185.100.67.64/auth/forgot-password', {
      prmt
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response:', response.data); // <-- Данные приходят сюда
      alert("Проверьте почту для восстановления пароля. новый пароль придёт от nurzat.tynyshbekov.04@gmail.com")
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Ошибка при восстановлении пароля");
    });
  }  

  return (
    <div className="block p-16 justify-items-center bg-white">
      <img src={logo} alt="" className='mb-16' onClick={() => navigate("/project")}/>
      <div className="w-84 max-w-sm p-7 bg-white"
            style={
              {borderRadius:"48px", boxShadow:"80px 120px 504px 0px rgba(0, 0, 0, 0.16)"}
            }
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Добро пожаловать
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Войдите в систему, чтобы продолжить
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 h-12 text-gray-800 bg-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="sr-only">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Пароль"
                className="w-full px-4 py-2 h-12 text-gray-800 bg-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img src={heye} alt="Hide" className="w-4 h-4" />
                ) : (
                  <img src={eye} alt="Show" className="w-4 h-4" />
                )}
                
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Войти
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Забыли пароль?{' '}
          <a href="#" className="text-blue-500 font-bold hover:underline" onClick={() => pemail()}>
            Восстановить
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
