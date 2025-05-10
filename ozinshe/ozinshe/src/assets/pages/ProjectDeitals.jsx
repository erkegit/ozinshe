import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ReactPlayer from 'react-player/youtube';
import clock from "../imges/Clock.svg";
import eye from "../imges/eye.svg";
import star from "../imges/star.svg";
import share from "../imges/share.svg";
import subtitles from "../imges/subtitles.svg";
import clpbrd from "../imges/clapper-board.svg";
import bell from "../imges/bell.svg";
import "../styles/prjDet.css";

function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://185.100.67.64/movie/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    })
      .then((res) => setMovie(res.data.result))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get(`http://185.100.67.64/movie/${id}/series?seasonId=${selectedSeason}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    })
      .then((data) => {
        setSeasons(data.data.result);
      })
      .catch((err) => console.error(err));
  }, [id, selectedSeason]);

  const handleSeasonClick = (seasonId) => {
    setSelectedSeason(seasonId);
    setSelectedEpisode(1);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (!token) return <div>Загрузка...</div>;

 else return (
    <div className='flex'>
      <Helmet><title style={{color:"purple"}}>Детали</title></Helmet>
      <div className='p-6 bg-gray-100 block space-y-10' style={{ borderRadius: "20px" }}>
        <div className='flex gap-5'>
          <h3 className='text-gray-400 cursor-pointer' onClick={() => navigate("/project")}>Проекты</h3>
          <p className='text-gray-400'>{">"}</p>
          <h2 className='font-black font-mono'>{movie?.title}</h2>
        </div>

        <div className='bg-white w-824 h-1373 rounded-xl p-5'>
          <div className='flex justify-between'>
            <h1 className='font-black font-mono text-2xl'>{movie?.title}</h1>
            <div className='flex gap-4'>
              <button className='p-2 h-12 bg-gray-200 font-black font-mono rounded-3xl'
                onClick={() => navigate(`/project/edit/step1/${movie.movieId}`)}>
                Редактировать
              </button>
              <button className='p-2 h-11 bg-red-600 rounded-full text-white' onClick={openModal}>
                <img src={bell} alt="" className='w-8' />
              </button>
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='flex gap-1'><img src={eye} className='w-4 h-4 mt-1' />{movie?.views || 'Никто не смотрел'}</div>
            <div className='flex gap-1'><img src={star} className='w-4 h-4 mt-1' />Рейтинг</div>
            <div className='flex gap-1'><img src={share} className='w-4 h-4 mt-1' />Число поделений</div>
          </div>

         <div>
         <div className="rounded-2xl overflow-hidden border-2 border-blue-500 aspect-video mt-4">
            <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
          </div>

          <div className='mt-10 space-y-5'>
            <div className="flex gap-2 mt-4">
              {[...Array(seasons?.seasonCount)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleSeasonClick(i + 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Сезон {i + 1}
                </button>
              ))}
            </div>

            <div className='flex gap-2 flex-wrap mb-0'>
              {[...Array(seasons?.series
              ?.length || 0)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedEpisode(i + 1)}
                  className={`px-3 py-1 txt-gr rounded-lg text-sm pb-3 ${
                    selectedEpisode === i + 1 ? 'border-b-2 border-blue-700 text-blue-700' : 'txt-gr'
                  }`}
                  style={{
                    borderTopLeftRadius: "200px",
                    borderTopRightRadius: "200px"
                  }}
                >
                  {i + 1} серия
                </button>
              ))} {/*фиксирую колво сохранени 149 лимит 150 */}
            </div>
          </div>
         </div>

          <hr className='' />

          <h1 className='font-black font-mono text-2xl mt-5'>Описание</h1>
          <p className='mt-5'>{movie?.description || "Описание отсутствует"}</p>

          <div className='space-y-4 mt-5'>
            <div className='flex gap-4'><h6 className='text-sm text-gray-300'>Режиссер:</h6><p>{movie?.director}</p></div>
            <div className='flex gap-4'><h6 className='text-sm text-gray-300'>Продюсер:</h6><p>{movie?.producer}</p></div>
          </div>

          <hr className='mt-12' />
          <h1 className='font-black font-mono text-2xl mt-5'>Скриншоты</h1>
          <div className='flex gap-3 flex-wrap'>
            {movie?.screenshots?.map((screenshot, index) => (
              <img key={index} src={`http://185.100.67.64/${screenshot}`} alt="Скриншот" className='w-44' />
            ))}
          </div>
        </div>
      </div>

      <div className='p-1'>
        <div className='block space-y-5 p-1'>
          <div className='flex gap-2'><img src={clock} className='w-4 h-4 mt-1' /><p>{movie?.releaseYear}</p></div>
          <div className='flex gap-2'><img src={clpbrd} className='w-4 h-4 mt-1' />
            <p>
              {movie?.categories?.map((cat, idx) => (
                <span key={cat.genreId}>{cat.name}{idx < movie?.categories.length - 1 && ', '}</span>
              ))} • {movie?.genres?.map((g, idx) => (
                <span key={g.genreId}>{g.name}{idx < movie?.genres.length - 1 && ', '}</span>
              ))}
            </p>
          </div>
          <div className='flex gap-2'><img src={subtitles} className='w-4 h-4 mt-1' />
            <p>{seasons?.seasonCount || 0}, {seasons?.series?.length || 0}, {movie?.duration}</p>
          </div>
          <img src={`http://185.100.67.64/${movie?.imageSrc}`} alt="Постер" className='rounded-sm' />
        </div>

        <div className='space-y-5 mt-10'>
          <div className='flex gap-1'><h2 className='text-gray-300'>Добавил:</h2><p>{movie?.createdBy || "Unknown author"}</p></div>
          <div className='flex gap-1'><h2 className='text-gray-300'>Дата добавления:</h2><p>{new Date(movie?.createdAt * 1000).toLocaleString()}</p></div>
          <div className='flex gap-1'><h2 className='text-gray-300'>Дата обновления:</h2><p>{new Date(movie?.updatedAt * 1000).toLocaleString()}</p></div>
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
                    <p className='text-center text-gray-400'>Вы уверены, что хотите удалить этот проект?</p>
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
    </div>
  );
}

export default ProjectDetails;
