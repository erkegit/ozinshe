import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/project'); // Redirect to dashboard after successful login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-84 max-w-sm p-7 bg-white rounded-3xl">
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
                👁️ {/* Eye icon placeholder */}
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
          <a href="#" className="text-blue-500 font-bold hover:underline">
            Восстановить
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
