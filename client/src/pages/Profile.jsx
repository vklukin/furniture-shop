import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Message from "../controllers/Message";

function Profile() {
  const toast = new Message();
  const user = useSelector((state) => state.Login.user);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const GetRequests = async () => {
      if (user) {
        await axios
          .get(`http://localhost:2000/api/profile/${user.id}/requests`, {
            withCredentials: true,
          })
          .then((data) => setRequests(data.data))
          .catch((e) => toast.error("Произошла ошибка загрузки заказов"));
      }
    };

    GetRequests();
  }, [user]);

  return (
    <main className="profile-page">
      <div className="container">
        <div className="user">
          <p className="role_info">
            {user.role === "user" ? "Пользователь" : "Администратор"}
          </p>
          <p>Email: {user.email}</p>
          <p>Login: {user.login}</p>
        </div>
        <div className="requests">
          <p className="requests-title">Заказы</p>
          <div className="requests__wrapper">
            {requests.map((item, index) => (
              <div className="user-request" key={index}>
                <div className="req-date">
                  <p>{item.date.split("T")[0]}</p>
                  <p>{item.date.split("T")[1].split(".")[0]}</p>
                </div>
                <a href="#">Подробнее</a>
              </div>
            ))}
          </div>
          {requests.length === 0 && (
            <p className="no-requests">У Вас нету заказов</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
