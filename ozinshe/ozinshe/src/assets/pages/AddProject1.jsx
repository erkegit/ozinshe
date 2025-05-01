import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import trash from "../imges/trash.svg"
import { Helmet } from 'react-helmet';

function SeasonsForm() {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([{ episodes: [''] }]);
  const [focusedFields, setFocusedFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleSeasonCountChange = (event) => {
    const seasonCount = parseInt(event.target.value, 10);
    setSeasons(Array.from({ length: seasonCount }, () => ({ episodes: [''] })));
  };

  const handleAddEpisode = (seasonIndex) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes.push('');
    setSeasons(updatedSeasons);
  };

  const handleDeleteEpisode = (seasonIndex, episodeIndex) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes = updatedSeasons[seasonIndex].episodes.filter((_, index) => index !== episodeIndex);
    setSeasons(updatedSeasons);
  };

  const handleEpisodeChange = (seasonIndex, episodeIndex, value) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes[episodeIndex] = value;
    setSeasons(updatedSeasons);
  };

  const handleFocus = (seasonIndex, episodeIndex) => {
    setFocusedFields({
      ...focusedFields,
      [`${seasonIndex}-${episodeIndex}`]: true,
    });
  };

  const handleBlur = (seasonIndex, episodeIndex) => {
    const value = seasons[seasonIndex].episodes[episodeIndex];
    if (!value) {
      setErrors({
        ...errors,
        [`${seasonIndex}-${episodeIndex}`]: 'Поле не может быть пустым',
      });
    } else {
      setErrors({ ...errors, [`${seasonIndex}-${episodeIndex}`]: '' });
    }
    setFocusedFields({
      ...focusedFields,
      [`${seasonIndex}-${episodeIndex}`]: false,
    });
  };

  const isFormComplete = seasons.length > 0 && seasons.every(season => 
    season.episodes.length > 0 && season.episodes.every(episode => episode.trim() !== '')
  );
  
  const renderEpisodeInput = (seasonIndex, episodeIndex) => (
    <div key={episodeIndex} className="relative w-64 mt-4">
      <input
        type="text"
        value={seasons[seasonIndex].episodes[episodeIndex]}
        onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, e.target.value)}
        onFocus={() => handleFocus(seasonIndex, episodeIndex)}
        onBlur={() => handleBlur(seasonIndex, episodeIndex)}
        className={`w-full h-12 border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50
          ${errors[`${seasonIndex}-${episodeIndex}`] ? 'border-red-500' : 'border-gray-50 focus:border-blue-500'}`}
      />
      <label
        className={`absolute left-3 top-3 transition-all duration-300 z-auto
          ${focusedFields[`${seasonIndex}-${episodeIndex}`] || seasons[seasonIndex].episodes[episodeIndex]
            ? '-translate-y-6 -translate-x-2 text-blue-500 text-sm bg-white'
            : 'text-gray-500'}`}
      >
        {`Серия ${episodeIndex + 1}`} / YouTube Video ID
      </label>
      {errors[`${seasonIndex}-${episodeIndex}`] && <p className="text-red-500 text-sm">{errors[`${seasonIndex}-${episodeIndex}`]}</p>}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 w-872 block space-y-10" style={{ borderRadius: '20px' }}>
      <Helmet>
        <title>Добавить проект</title>
      </Helmet>
       <div className='flex gap-5 mb-5'>
        <h3 className='text-gray-400' onClick={() => navigate("/project")}>Проекты</h3>
        <p className='text-gray-400'>{">"}</p>
        <h2 className='font-black font-mono'>Добавить проект</h2>
    </div>
      <div className="bg-white w-824 h-auto rounded-xl p-5">
        <div className="flex gap-4 mb-4">
        <button className='text-3xl bg-gray-200 pl-1 pr-1 rounded-lg' onClick={() => navigate("/project")}>←</button>
          <h1 className="font-black font-mono text-3xl">Видео</h1>
        </div>
        <div className="relative w-64 mt-4">
          <label htmlFor="seasonCount" className="block mb-2 text-gray-500">Количество сезонов</label>
          <select
            id="seasonCount"
            onChange={handleSeasonCountChange}
            className="w-full border px-3 py-2 rounded-2xl outline-none transition-all bg-gray-50 focus:border-blue-500"
          >
            {[...Array(10).keys()].map((n) => (
              <option key={n} value={n + 1}>{n + 1}</option>
            ))}
          </select>
        </div>
        {seasons.map((season, seasonIndex) => (
          <div key={seasonIndex} className="mb-6">
            <h2 className="font-bold text-2xl">{`Сезон ${seasonIndex + 1}`}</h2>

            {season.episodes.map((_, episodeIndex) =><div>
              <div className='flex gap-4'>
              {renderEpisodeInput(seasonIndex, episodeIndex)}
              <button
                type="button"
                onClick={() => handleDeleteEpisode(seasonIndex, episodeIndex)}
                className="text-red-500 text-sm"
              >
              <img src={trash} className='w-4' alt="Delete" />
              </button>
            </div>
            </div>)}

            <button
              onClick={() => handleAddEpisode(seasonIndex)}
              className="mt-3  text-blue-700 px-2 rounded-lg mr-3"
            >
              Добавить серию
            </button>
          </div>
        ))}
      <div className='flex'>
      <button className='p-1 bg-gray-200 text-black w-32  rounded-xl font-mono font-black' onClick={() => navigate("/project/add/step1")}>
            Назад
        </button>
        <div className='flex ml-80 gap-5'>
                {/* <button className={`p-1 bg-purple-600 text-white w-32 rounded-xl font-mono font-black`}>
                    Далее
                </button> */}
                <button
                    type="submit"
                    className={`px-9 rounded-xl transition-opacity duration-300 
                      ${isFormComplete ? 'bg-purple-600 text-white opacity-100' : 'bg-purple-400 text-white opacity-50 cursor-not-allowed'}`}
                    disabled={!isFormComplete}
                    onClick={() =>  navigate("/project/add/step3")}
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
  );
}

export default SeasonsForm;
