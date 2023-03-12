import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../assets/images/header/logo.svg";
import Heart from "../../assets/images/header/heart";
import Cart from "../../assets/images/header/cart";
import HeaderProfile from "./HeaderProfile";

const HandleCatalog = () => {};

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Login.user);
  const rectRef = useRef(null);

  return (
    <header className="header">
      <div className="container header__container">
        <button className="header__logo" onClick={() => navigate("/")}>
          <img src={Logo} alt="mobi мебель для дома" />
        </button>
        <div className="header__wrapper">
          <button
            className="header__catalog"
            onClick={HandleCatalog}
            onMouseDown={() => rectRef.current.classList.add("active-rect")}
            onMouseUp={() => rectRef.current.classList.remove("active-rect")}
            onMouseLeave={() => rectRef.current.classList.remove("active-rect")}
          >
            <div className="catalog__rectangle" ref={rectRef}></div>
            <span className="catalog__span">Каталог</span>
            <div className="span-x">
              <div className="span-line span-line__first"></div>
              <div className="span-line span-line__second"></div>
              <div className="span-line span-line__third"></div>
            </div>
          </button>
          <div className="header__search">
            <input
              type="text"
              className="search__input"
              placeholder="Искать товары"
            />
            <button className="search__button">Найти</button>
          </div>
        </div>
        <div className="header__icons">
          <a href="/favorite" className="icon icon__favorite">
            <button>{<Heart />}</button>
            <p>Избранное</p>
          </a>
          <a href="/cart" className="icon icon__cart">
            <button>{<Cart />}</button>
            <p>Корзина</p>
          </a>
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
