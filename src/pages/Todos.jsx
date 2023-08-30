import Check from "../assets/images/check.png";
import Empty from "../assets/images/empty.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  
  const base_url = "https://todolist-api.hexschool.io/";
  const token = localStorage.getItem("token");

  return (
    <div className="container">
      <div className="todos__container">
        <div className="todos__container__title">
          <img src={Check} alt="check" />
          <h1>Todo List</h1>
        </div>
        <div className="todos__container__content">
          <div className="todos__container__content__left">
            <div className="todos__container__content__left__title">
              <h1>Todo</h1>
              <p>3</p>
            </div>
            <div className="todos__container__content__left__list">
              <div className="todos__container__content__left__list__item">
                <div className="todos__container__content__left__list__item__left">
                  <input type="checkbox" />
                  <p>吃飯</p>
                </div>
                <div className="todos__container__content__left__list__item__right">
                  <button>刪除</button>
                </div>
              </div>
              <div className="todos__container__content__left__list__item">
                <div className="todos__container__content__left__list__item__left">
                  <input type="checkbox" />
                  <p>睡覺</p>
                </div>
                <div className="todos__container__content__left__list__item__right">
                  <button>刪除</button>
                </div>
              </div>
              <div className="todos__container__content__left__list__item">
                <div className="todos__container__content__left__list__item__left">
                  <input type="checkbox" />
                  <p>打東東</p>
                </div>
                <div className="todos__container__content__left__list__item__right">
                  <button>刪除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="todos__container__add">
          <input type="text" placeholder="新增待辦事項" />
          <button>新增</button>
        </div>
      </div>
    </div>
  );
}

export default Todos;