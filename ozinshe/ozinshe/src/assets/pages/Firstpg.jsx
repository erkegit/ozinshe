import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imges/Your App.jpg";
import apps from "../imges/appstore.png";
import gplay from "../imges/googleplay.png";
import qrc from "../imges/qrcode.jpg";
import iphone from "../imges/iphone.png";
import samsung from "../imges/samsung.png";
import "../styles/Firstpg.css";

function Firstpg() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <img alt="" src={logo} onClick={() => navigate("/project")} />
      </div>
      <hr />
      <div className="container">
        <h1 className="title">
          Мобильное приложение<br />
          доступно для скачивания
        </h1>
        <div className="app-container">
          <div className="app-card app-ios">
            <div className="app-info">
              <h1>Приложение в App Store</h1>
              <h3>Скачайте для iOS</h3>
              <img alt="" className="store-img" src={apps} />
              <div className="qrcode">
                <img src={qrc} alt="" />
                <h6>Отсканируйте, чтобы скачать</h6>
              </div>
            </div>
            <img src={iphone} alt="" className="phone-img" />
          </div>
          <div className="app-card app-android">
            <div className="app-info">
              <h1>Приложение в Play Market</h1>
              <h3>Скачайте для Android</h3>
              <img alt="" className="store-img" src={gplay} />
              <div className="qrcode">
                <img src={qrc} alt="" />
                <h6>Отсканируйте, чтобы скачать</h6>
              </div>
            </div>
            <img src={samsung} alt="" className="phone-img" />
          </div>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="footer">
        <p className="footer-info">© 2021 Все права защищены</p>
        <h1 className="terms footer-info">Пользовательское соглашение</h1>
      </div>
    </div>
  );
}

export default Firstpg;
