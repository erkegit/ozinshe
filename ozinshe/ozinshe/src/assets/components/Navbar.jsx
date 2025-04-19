import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// inactive icons
import iproject from "./images/disable/projects.svg"
import ihome from "./images/disable/home.svg"
import icategories from "./images/disable/category.svg"
import iusers from "./images/disable/users.svg"
import iroles from "./images/disable/rolles.svg"
import izhanrs from "./images/disable/zhanrs.svg"
import iages from "./images/disable/ages.svg"
// active icons
import aproject from "./images/enable/projects.svg"
import ahome from "./images/enable/home.svg"
import acategories from "./images/enable/category.svg"
import ausers from "./images/enable/users.svg"
import aroles from "./images/enable/rolles.svg"
import azhanrs from "./images/enable/zhanrs.svg"
import aages from "./images/enable/ages.svg"  


import "./Navbar.css";

function Navbar() {
    const [activeItem, setActiveItem] = useState(1)
    const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: 'Проекты',             active_icon: aproject,    inactive_icon: iproject, link:"/project"},
    { id: 2, title: 'Проекты на главной',  active_icon: ahome,       inactive_icon: ihome, link:"/project/main" },
    { id: 3, title: 'Категории',           active_icon: acategories, inactive_icon: icategories, link:"/categories"},
    { id: 4, title: 'Пользователи',        active_icon: ausers,      inactive_icon: iusers, link:'/users'},
    { id: 5, title: 'Роли',                active_icon: aroles,      inactive_icon: iroles, link:"/roles"},
    { id: 6, title: 'Жанры',               active_icon: azhanrs,     inactive_icon: izhanrs, link:"/zhanrs"},
    { id: 7, title: 'Возрасты',            active_icon: aages,       inactive_icon: iages, link:"/ages"}
  ];
  const handleClick = (id) => {
    setActiveItem(id);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = menuItems.find(item => item.link === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  })

  return (
    <div className="w-64">
    <div className=" inline-flex flex-col items-start">
        {menuItems.map((item) => (
         <div style={{padding: "16px 48px 16px 0px"}}>
           <div
            key={item.id}
             onClick={() => handleClick(item.id)}
             className={`flex items-center cursor-pointer transition-all duration-300 ease-in-out  ${
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
            <div className="flex items-center" style={{
                                                      width: "250px",
                                                      height: "56px",
                                                      padding: "16px 48px 16px 24px",
                                                      gap: "21px",
                                                      
                                                      
            }}  onClick={() => navigate(item.link)}>
                <div style={{ display: "flex",
                              width: "290px",
                              height: "24px",                           
                              alignItems: "center",
                              gap: "16px",                                       
                }}> 
                <img src={activeItem === item.id ? item.active_icon : item.inactive_icon} alt="icon" className="w-6 h-6" />
                <h1 className="text">{item.title}</h1>
                </div>
            </div>
          </div>
         </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
