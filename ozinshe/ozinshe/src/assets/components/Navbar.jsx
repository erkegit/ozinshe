import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WebStoriesOutlinedIcon from '@mui/icons-material/WebStoriesOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import FourCirclesIcon from '../imges/FourCirclesIcon';
import IconButton from '@mui/material/IconButton';

function Navbar() {
    const [activeItem, setActiveItem] = useState(1)
    const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: 'Проекты', icon: <FourCirclesIcon  fontSize="large" />, link:"/project"},
    { id: 2, title: 'Проекты на главной', icon: <HomeOutlinedIcon/>, link:"/project/main" },
    { id: 3, title: 'Категории', icon: <FeaturedPlayListIcon/>, link:"/categories"},
    { id: 4, title: 'Пользователи', icon: <PeopleAltOutlinedIcon/>, link:'/users'},
    { id: 5, title: 'Роли', icon: <AccountCircleOutlinedIcon/>, link:"/roles"},
    { id: 6, title: 'Жанры', icon: <WebStoriesOutlinedIcon style={{rotate:"90deg"}}/>, link:"/zhanrs"},
    { id: 7, title: 'Возрасты', icon: <SentimentSatisfiedAltOutlinedIcon/>, link:"/ages"}
  ];
  const handleClick = (id) => {
    setActiveItem(id);
  };



  return (
    <div className="w-96 ">
      <div className="block justify-between space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
             onClick={() => handleClick(item.id)}
             className={`flex items-center cursor-pointer transition-all duration-300 ease-in-out ${
                activeItem === item.id
                  ? 'bg-purple-500 text-purple-500 transform scale-105 shadow-lg'
                  : 'bg-gray-100 text-black'
              }`}
            style={{
              borderTopRightRadius: '100px',
              borderBottomRightRadius: '100px',
              width: '3px',
              height: '32px',
              backgroundColor: activeItem === item.id ? '#7E2DFC' : '#ffffff'
            }}
          >
            <div className="ml-16 flex items-center w-auto gap-3" onClick={() => navigate(item.link)}>
                <IconButton sx={{color: activeItem === item.id ? '#7E2DFC' : "gray"}}>{item.icon}</IconButton>
              <h1 className="w-max">{item.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
