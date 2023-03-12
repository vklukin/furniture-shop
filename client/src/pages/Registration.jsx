import { useState } from "react";

import LabelClass from "../controllers/auth/Label_in_input";
import Validate from "../controllers/auth/Validate";
import Message from "../controllers/Message";
import Auth from "../controllers/auth/Auth";

import RegistrModal from "../components/auth/RegistrModal";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [modal, setModal] = useState({
    isShow: false,
    message: "",
  });

  const navigate = useNavigate();
  const LabelInInput = new LabelClass();
  const validate = new Validate();
  const toast = new Message();
  const auth = new Auth();

  const closeModal = () => setModal({ isShow: false, message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate.name(name)) return toast.error("Введите правильно ФИО");
    if (!validate.login(login))
      return toast.error(
        "Введите правильно логин. Логин должен включать в себя символы латинской раскладки (a-z), цифры (0-9) или символы (.-_)"
      );
    if (firstPassword.trim().length <= 4 || secondPassword.trim().length <= 4)
      return toast.error(
        "Не правильно введен пароль. Пароль должен содержать не менее 7 символов"
      );
    if (!validate.passwords(firstPassword, secondPassword))
      return toast.error("Пароли не совпадают");

    auth
      .Registration({
        email: email,
        login: login,
        name: name,
        password: firstPassword,
      })
      .then((data) => {
        if (data.error) return toast.error(data.error.response.data.message);
        return setModal({ isShow: true, message: data.message });
      });
  };

  return (
    <>
      <main className="auth">
        <div className="container">
          <form>
            <h1>Регистрация</h1>
            <div className="input-wrap">
              <label htmlFor="FIO">ФИО (Иван Иванов Иванович)</label>
              <input
                type="text"
                name="FIO"
                id="FIO"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
                onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="login">Логин</label>
              <input
                type="text"
                name="login"
                id="login"
                minLength="5"
                maxLength="50"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
                onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="email">Почта</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="firstPassword">Пароль</label>
              <input
                type="password"
                name="firstPassword"
                id="firstPassword"
                required
                minLength="5"
                maxLength="60"
                value={firstPassword}
                onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
                onChange={(e) => setFirstPassword(e.target.value)}
                onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="secondPassword">Повторите пароль</label>
              <input
                type="password"
                name="secondPassword"
                id="secondPassword"
                required
                minLength="5"
                maxLength="60"
                value={secondPassword}
                onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
                onChange={(e) => setSecondPassword(e.target.value)}
                onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
              />
            </div>
            <button type="submit" className="auth-btn" onClick={handleSubmit}>
              Зарегистрироваться
            </button>
            <button className="auth-not-btn" onClick={() => navigate("/login")}>
              Войти
            </button>
          </form>
        </div>
      </main>
      {modal.isShow && (
        <RegistrModal message={modal.message} closeModal={closeModal} />
      )}
    </>
  );
};

export default Registration;
