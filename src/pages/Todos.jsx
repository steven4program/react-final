import Empty from "../assets/images/empty.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({});
  const [todoListType, setTodoListType] = useState("all");
  const [undoneTodoCount, setUndoneTodoCount] = useState(0);
  
  const base_url = "https://todolist-api.hexschool.io/";
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${base_url}todos`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTodoList = async () => {
    try {
      const todoList = await fetchTodos();
      setUndoneTodoCount(todoList.filter((todo) => todo.status === false).length)
      setTodos(todoList);
      setTodoListType("all");
    } catch (error) {
      console.log(error);
    }
  };

  const getUndoneTodos = async () => {
    try {
      const todoList = await fetchTodos();
      const undoneTodos = todoList.filter((todo) => {
        return todo.status === false;
      });
      setTodoListType("undone");
      if (undoneTodos.length === 0) {
        setTodos(["none"]);
        return;
      }
      setUndoneTodoCount(undoneTodos.length)
      setTodos(undoneTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoneTodos = async () => {
    try {
      const todoList = await fetchTodos();
      const doneTodos = todoList.filter((todo) => {
        return todo.status === true;
      });
      setTodoListType("done");
      if (doneTodos.length === 0) {
        setTodos(["none"]);
        return;
      }
      setTodos(doneTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}todos`, newTodo, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        getTodoList();
        setNewTodo({
          content: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${base_url}todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        getTodoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllDoneTodos = async () => {
    try {
      const doneTodos = todos.filter((todo) => {
        return todo.status === true;
      });
      for (let i = 0; i < doneTodos.length; i++) {
        await axios.delete(`${base_url}todos/${doneTodos[i].id}`, {
          headers: {
            Authorization: token,
          },
        });
      }
      getTodoList();
      setTodoListType("all");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await axios.patch(`${base_url}todos/${id}/toggle`, {}, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        switch (todoListType) {
          case "all":
            getTodoList();
            break;
          case "undone":
            getUndoneTodos();
            break;
          case "done":
            getDoneTodos();
            break;
          default:
            break;
      }}
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewTodo({
      content: value,
    });
  };

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (!checkToken) {
      navigate("/login");
    }
    getTodoList();
  }, []);

  const activeStyle = {
    backgroundColor: "#fff",
    width: "33%",
    borderRadius: "0px",
    borderBottom: "3px solid #333333"
  }

  const inactiveStyle = {
    backgroundColor: "#fff",
    width: "33%",
    borderRadius: "0px"
  }

  return (
    <div className="container mt-5">
      <div className="mx-auto" style={{width: "500px"}}>
        <form className="d-flex justify-content-center" onSubmit={(e) => addTodo(e)}>
          <div className="mb-3 col-auto">
            <input type="text" className="form-control" placeholder="請輸入代辦事項" style={{minWidth: "460px"}} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-dark ms-2 fw-bold" style={{height: "38px"}}>+</button>
        </form>
        { todos.length === 0 ? (
          <div className="mt-5" style={{width: "500px"}}>
            <div className="d-flex flex-column align-items-center">
              <h4>目前沒有待辦事項</h4>
              <p>請按右上角「+」新增待辦事項</p>
              <img className="img-fluid" src={Empty} alt="workImg" />
            </div>
          </div>
          ) : (
            <div className="pb-3" style={{width: "500px", backgroundColor: "#fff", borderRadius: "10px"}}>
              <ul className="d-flex w-100 p-0">
                <li className="btn" style={todoListType === "all" ? activeStyle : inactiveStyle} onClick={() => {getTodoList()}}>全部</li>
                <li className="btn" style={todoListType === "undone" ? activeStyle : inactiveStyle} onClick={() => {getUndoneTodos()}}>待完成</li>
                <li className="btn" style={todoListType === "done" ? activeStyle : inactiveStyle} onClick={() => {getDoneTodos()}}>已完成</li>
              </ul>
              <div className="px-5">
                <ul className="todoList_item p-0">
                  {
                    todos.map((todo) => {
                      return todo === "none" ? (
                        <li className="d-flex flex-column align-items-center" key={todo.id}>
                          <h3 className="fw-bold mt-3">目前沒有{todoListType === "done" ? "已完成的" : "" }待辦事項</h3>
                        </li>
                      ) : (
                        <li className="mb-3 d-flex justify-content-between" key={todo.id} style={{borderBottom: "1px solid #E5E5E5", height: "48px"}}>
                          <div className="form-check my-auto">
                            <input className="form-check-input" checked={todo.status} type="checkbox" id={todo.id} onChange={() => {toggleTodo(todo.id)}}/>
                            <label className="form-check-label" htmlFor={todo.id} style={{color: "#333333"}}>
                              {todo.content}
                            </label>
                          </div>
                          <div>
                            <button className="btn ms-2 fw-bold mt-1 text-danger" onClick={() => deleteTodo(todo.id)}>
                              X
                            </button>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
                { 
                  undoneTodoCount === 0 ? (
                    <div className="d-flex justify-content-between">
                      <p className="text-secondary">無待完成項目</p>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <p className="text-info my-auto">共 {undoneTodoCount} 項待完成項目</p>
                      <button className="btn text-danger" onClick={() => deleteAllDoneTodos()}>清除已完成項目</button>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Todos;