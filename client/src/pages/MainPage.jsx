import { useEffect, useState } from "react";
import axios from "axios";

import Toast from "../controllers/Message";
import CategoryItem from "../components/CategoryItem";

function MainPage() {
  const toast = new Toast();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:2000/api/get-products", {
          withCredentials: true,
        })
        .then((res) => setData(res.data))
        .catch((e) => {
          toast.error("Произошла ошибка с загрузкой товаров");
        });
    };

    getData();
  }, []);

  return (
    <main className="main-page">
      <div className="container">
        <div className="card__wrapper">
          <CategoryItem category="Стол" data={data} />
          <CategoryItem category="Стул" data={data} />
        </div>
      </div>
    </main>
  );
}

export default MainPage;
