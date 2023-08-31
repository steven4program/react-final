import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Check from "../assets/images/check.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState("");
  const [token, setToken] = useState("");

  const base_url = "https://todolist-api.hexschool.io/";

  function getNicknameFromToken(token) {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.nickname || 'Unknown';
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'Unknown';
    }
  }

  const signOut = async () => {
    try {
      const res = await axios.post(`${base_url}users/sign_out`, null, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '登出成功',
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.removeItem("token");
        setToken("");
        setNickname("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return
    }
    const userNickname = getNicknameFromToken(token)
    setNickname(userNickname);
    setToken(token);
  }, [location]);

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand d-flex">
            <img className="img-fluid" src={Check} alt="check"/>
            <h1><NavLink className="text-black fs-2 fw-bold" to="/">ONLINE TODO LIST</NavLink></h1>
          </div>
          { !token ? (
              <></>
            ) : (
              <div className="d-flex">
                <h4 className="fw-bold me-4 my-auto d-none d-md-block">{nickname} 的 Todo List</h4>
                <button className="btn btn-outline-secondary">
                  <p className="fw-bold text-secondary my-auto" onClick={() => signOut()}>Logout</p>
                </button>
              </div>
            )
          }
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;