import React from "react";

import Success from "../../assets/images/auth/success";
import { useNavigate } from "react-router-dom";

function RegistrModal({ message, closeModal }) {
  const navigate = useNavigate();

  return (
    <div className="registr-modal">
      <div className="registr-modal__close" onClick={closeModal}></div>
      <div className="registr-modal__wrapper">
        <p>{message}</p>
        <Success />
        <button onClick={() => navigate("/login")}>Войти</button>
      </div>
    </div>
  );
}

export default RegistrModal;
