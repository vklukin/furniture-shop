import React, { useEffect, useState } from "react";
import Toast from "../../controllers/Message";
import axios from "axios";

function ShowRequests() {
  const [data, setData] = useState([]);
  const toast = new Toast();

  useEffect(() => {
    const GetRequests = async () => {
      await axios
        .get("http://localhost:2000/api/admin/get-requests", {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          toast.error("Произошла ошибка с загрузкой заказов");
        });
    };

    GetRequests();
  }, []);

  return (
    <div className="show-products">
      <p className="title">Заявки</p>
      <div className="show-products__wrapper">
        {data.map((item, index) => {
          return (
            <div className="request-item" key={index}>
              <div className="wrap">
                <span className="user-info__wrapper">
                  <p className="user-info__email">{item.email}</p>
                  <p className="user-info__login">{item.login}</p>
                </span>
                <div className="request__date">
                  <p className="date">{item.date.split("T")[0]}</p>
                  <p className="time">
                    {item.date.split("T")[1].split(".")[0]}
                  </p>
                </div>
              </div>
              <div className="non-wrap">
                <button
                  onClick={(e) => {
                    e.target.closest(".request-item").remove();
                  }}
                >
                  ❌
                </button>
                <a href="#">Подробнее</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowRequests;
