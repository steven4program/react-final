import Empty from "../assets/images/empty.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { handleApiRes } from "../utils/errorHandler";
import Loading from "../layouts/Loading";

function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({content: ""});
  const [todoListType, setTodoListType] = useState("all");
  const [undoneTodoCounts, setUndoneTodoCounts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  
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
      handleApiRes("error", "請求資料失敗", error.response.data.message)
    }
  };

  const getTodoList = async () => {
    setIsLoading(true);
    const todoList = await fetchTodos();
    setTodos(todoList);
    setUndoneTodoCounts(await todoList.filter((todo) => todo.status === false).length);
    setCurrentTodos(todoList);
    setTodoListType("all");
    setIsLoading(false);
    return todoList;
  };

  const getTodosByStatus = async (status) => {
    setIsLoading(true);
    const todoList = await fetchTodos();
    setTodos(todoList);
    const undoneTodolist = await todoList.filter((todo) => { return todo.status === false});
    setUndoneTodoCounts(undoneTodolist.length);
    const filteredTodos = await todoList.filter((todo) => {
      return todo.status === status;
    });
    setCurrentTodos(filteredTodos);
    setIsLoading(false);
  };

  const getUndoneTodos = async () => {
    setTodoListType("undone");
    await getTodosByStatus(false);
  };

  const getDoneTodos = async () => {
    setTodoListType("done");
    await getTodosByStatus(true);
  };

  const getTodoListByType = async (type) => {
    switch (type) {
      case "all":
        await getTodoList();
        break;
      case "undone":
        await getUndoneTodos();
        break;
      case "done":
        await getDoneTodos();
        break;
      default:
        break;
    }
  };


  const addTodo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${base_url}todos`, newTodo, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        setIsLoading(false);
        getTodoListByType(todoListType);
        setNewTodo({
          content: "",
        });
        return;
      }
      return
    } catch (error) {
      setIsLoading(false);
      handleApiRes("error", "待辦事項新增失敗", error.response.data.message)
    }
  };
  
  const editTodo = async (id, content) => {
    setIsLoading(true);
    setIsEditing(true);
    try {
      const res = await axios.put(`${base_url}todos/${id}`, { content }, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        setEditText("");
        setIsEditing(false);
        getTodoListByType(todoListType);
        setIsLoading(false);
        return
      }
    } catch (error) {
      setEditText("");
      setIsLoading(false);
      setIsEditing(false);
      handleApiRes("error", "待辦事項編輯失敗", error.response.data.message)
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${base_url}todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        setIsLoading(false);
        getTodoListByType(todoListType);
      }
    } catch (error) {
      setIsLoading(false);
      handleApiRes("error", "待辦事項刪除失敗", error.response.data.message)
    }
  };

  const deleteAllDoneTodos = async () => {
    setIsLoading(true);
    try {
      const doneTodos = todos.filter((todo) => {
        return todo.status === true;
      });
      if (doneTodos.length === 0) {
        setIsLoading(false);
        handleApiRes("info", "", "目前沒有已完成的待辦事項")
        return;
      }
      Swal.fire({
        title: '確定刪除所有待辦事項嗎?',
        text: "此動作無法復原",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的，刪除吧！',
        cancelButtonText: '取消'
      }).then(async (result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < doneTodos.length; i++) {
            await axios.delete(`${base_url}todos/${doneTodos[i].id}`, {
              headers: {
                Authorization: token,
              },
            });
          }
          getTodoListByType(todoListType);
        } else if (result.isDenied) {
          Swal.fire('取消動作', '', 'info')
        }
      })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleApiRes("error", "刪除所有待辦事項失敗", error.response.data.message)
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
        getTodoListByType(todoListType)
      }
    } catch (error) {
      handleApiRes("error", "待辦事項狀態切換失敗", error.response.data.message)
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
      return;
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
        <Loading isLoading={isLoading} />
        <form className="d-flex justify-content-center" onSubmit={(e) => addTodo(e)}>
          <div className="mb-3 col-auto">
            <input type="text" className="form-control" value={newTodo.content} placeholder="請輸入待辦事項" style={{minWidth: "460px"}} onChange={handleInputChange} />
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
                <li className="btn" key="all" style={todoListType === "all" ? activeStyle : inactiveStyle} onClick={() => {getTodoList()}}>全部</li>
                <li className="btn" key="undone" style={todoListType === "undone" ? activeStyle : inactiveStyle} onClick={() => {getUndoneTodos()}}>待完成</li>
                <li className="btn" key="done" style={todoListType === "done" ? activeStyle : inactiveStyle} onClick={() => {getDoneTodos()}}>已完成</li>
              </ul>
              <div className="px-5">
                <ul className="todoList_item p-0">
                  {
                    currentTodos.length === 0 ? (
                        <li className="d-flex flex-column align-items-center" key={0}>
                          <h3 className="fw-bold mt-3">目前沒有{todoListType === "done" ? "已完成的" : "" }待辦事項</h3>
                        </li>
                      ) : (
                        currentTodos.map((todo) => {
                          return (
                            <li className="mb-3 d-flex justify-content-between" key={todo.id} style={{borderBottom: "1px solid #E5E5E5", height: "48px"}}>
                              <div className="form-check my-auto">
                                { isEditing === todo.id ? (
                                  <input className="form-control" type="text" id={todo.id} value={editText} onChange={(e) => {setEditText(e.target.value)}}/>
                                ) : (
                                  <>
                                    <input className="form-check-input" checked={todo.status} type="checkbox" id={todo.id} onChange={() => {toggleTodo(todo.id)}}/>
                                    <label className="form-check-label" htmlFor={todo.id} style={{color: "#333333"}}>
                                      {todo.content}
                                    </label>
                                  </>
                                )}
                              </div>
                              <div>
                                {isEditing === todo.id ? (
                                  <>
                                    <button className="btn ms-2 fw-bold mt-1 text-danger" onClick={() => editTodo(todo.id, editText)}>更改</button>
                                    <button className="btn ms-2 fw-bold mt-1 text-secondary" onClick={() => setIsEditing(null)}>取消</button>
                                  </>
                                ) : (
                                  <>
                                    <button className="btn ms-2 fw-bold mt-1 text-success" onClick={() => {setIsEditing(todo.id); setEditText(todo.content);}}>編輯</button>
                                    <button className="btn ms-2 fw-bold mt-1 text-danger" onClick={() => deleteTodo(todo.id)}>
                                      X
                                    </button>
                                  </>
                                )}
                              </div>
                            </li>
                          )
                        })
                      )
                  }
                </ul>
                <div className="d-flex justify-content-between">
                  {
                    undoneTodoCounts === 0 ? (
                      <p className="text-secondary my-auto">無待完成項目</p>
                    ) : (
                      <p className="text-info my-auto">共 {undoneTodoCounts} 項 待完成項目</p>
                    )
                  }
                  <button className="btn text-danger" onClick={() => deleteAllDoneTodos()}>清除已完成項目</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Todos;