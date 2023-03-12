import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../assets/images/header/profile";
import { logout } from "../../store/auth/LoginSlice";

const HeaderProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Login.user);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const iconButton = useRef(null);

  return (
    <>
      <div
        className="icon icon__profile"
        ref={iconButton}
        onMouseEnter={() => {
          modalRef.current.classList.contains("hide-modal") &&
            modalRef.current.classList.remove("hide-modal");
          modalRef.current.classList.add("show-modal");
        }}
      >
        <button>{<Profile />}</button>
        <p>Профиль</p>
      </div>
      <div
        className="profile-modal hide-modal"
        ref={modalRef}
        onMouseLeave={() => {
          modalRef.current.classList.contains("show-modal") &&
            modalRef.current.classList.remove("show-modal");
          modalRef.current.classList.add("hide-modal");
        }}
      >
        {Object.keys(user).length === 0 ? (
          <div className="login">
            <p className="login-info">Вы не авторизованы</p>
            <button className="login-button" onClick={() => navigate("/login")}>
              <span>Войти</span>
            </button>
          </div>
        ) : (
          <>
            <div className="profile-info">
              {user.role === "admin" ? (
                <p className="profile-descr">Администратор</p>
              ) : (
                <p className="profile-descr">Пользователь</p>
              )}
              <p className="profile-login">{user.login}</p>
            </div>
            <div className="profile-wrapper">
              {user.role === "admin" && (
                <button
                  className="profile__default-button"
                  onClick={() => navigate(`/admin.php`)}
                >
                  Панель администратора
                </button>
              )}
              <button
                className="profile__default-button"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                Профиль
              </button>
            </div>
            <button
              className="login-button profile-logout"
              onClick={() => dispatch(logout())}
            >
              Выйти
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default HeaderProfile;
