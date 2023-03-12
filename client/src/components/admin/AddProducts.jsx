import React, { useState } from "react";
import axios from "axios";

import LabelClass from "../../controllers/auth/Label_in_input";
import Message from "../../controllers/Message";

function AddProducts() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const LabelInInput = new LabelClass();
  const toast = new Message();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (title.trim().length === 0)
      return toast.error("Поле названия должно быть заполнено!");
    if (price.trim().length === 0)
      return toast.error("Поле цены должно быть заполнено!");
    if (category.trim().length === 0)
      return toast.error("Поле категории должно быть заполнено!");

    const pushData = {
      title,
      price,
      category,
      description: description.trim().length !== 0 ? description : "",
      specifications: specifications.trim().length !== 0 ? specifications : "",
      url: url.trim().length !== 0 ? url : "",
    };

    try {
      await axios
        .post("http://localhost:2000/api/admin/add-product", pushData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          toast.success(data.data.message);
        });
    } catch (e) {
      console.log(e);
      return toast.error("Произошла ошибка");
    }
  };

  const handleImportFile = async (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Выберите файл");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios
        .post("http://localhost:2000/api/admin/upload", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          toast.success(data.data.message);
        });
    } catch (e) {
      console.log(e);
      return toast.error("Произошла ошибка");
    }
  };

  return (
    <div className="add-products">
      <p className="title">Добавить товар</p>
      <div className="add-products__wrapper">
        <form>
          <div className="input-wrap">
            <label htmlFor="title">
              Название товара <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="price">
              Цена <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="category">
              Категория <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="description">Описание товара</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="specifications">
              Характеристики &#60;Название | Характеристика&#62;
            </label>
            <textarea
              id="specifications"
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="url">Ссылки на изображения</label>
            <textarea
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={(e) => LabelInInput.onFocusFunc(e.target)}
              onBlur={(e) => LabelInInput.onBlurFunc(e.target)}
            />
          </div>
          <button type="submit" onClick={handleSubmitForm}>
            Добавить
          </button>
        </form>
      </div>
      <p className="text-or">или</p>
      <p className="title">
        Импортировать товары из .csv файла с кодировкой "UTF-8"
      </p>

      <div className="example-file">
        <p>
          Пример: (Важно! Названия и порядок столбцов должны быть как в
          примере!)
        </p>
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>price</th>
              <th>description</th>
              <th>
                specifications{" "}
                <span>Пример: &#60;Название | Характеристика&#62;</span>
              </th>
              <th>category</th>
              <th>
                url <span>(Путь к изображениям)</span>
              </th>
            </tr>
            <tr>
              <td>Стул Vermax</td>
              <td>1290.2356</td>
              <td>Стул Vermax - надежный друг</td>
              <td>
                &#60;Материал основания | ЛДСП&#62; &#60;Материал обивки |
                ЛДСП&#62;
              </td>
              <td>Стул</td>
              <td>Ссылка через пробел</td>
            </tr>
          </tbody>
        </table>
      </div>

      <form>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit" onClick={handleImportFile}>
          Импортировать
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
