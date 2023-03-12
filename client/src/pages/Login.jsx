import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../store/auth/LoginSlice";

import LabelClass from "../controllers/auth/Label_in_input";
import Validate from "../controllers/auth/Validate";
import Message from "../controllers/Message";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const submitButtonRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LabelInInput = new LabelClass();
  const validate = new Validate();
  const toast = new Message();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate.login(login))
      return toast.error(
        "Введите правильно логин. Логин должен включать в себя символы латинской раскладки (a-z), цифры (0-9) или символы (.-_)"
      );

    if (password.trim().length <= 6)
      return toast.error(
        "Не правильно введен пароль. Пароль должен содержать не менее 7 символов"
      );

    await dispatch(
      fetchLogin({
        login,
        password,
      })
    ).then((data) => {
      if (data.error) {
        return toast.error(data.payload);
      } else {
        navigate(`/`);
      }
    });
  };

  return (
    <main className="auth">
      <div className="container">
        <form>
          <h1>Вход</h1>
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
            <label htmlFor="firstPassword">Пароль</label>
            <input
              type="password"
              name="firstPassword"
              id="firstPassword"
              minLength="5"
              maxLength="60"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <button
            type="submit"
            ref={submitButtonRef}
            className="auth-btn"
            onClick={handleSubmit}
          >
            Войти
          </button>
          <button
            className="auth-not-btn"
            onClick={() => navigate("/registration")}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
