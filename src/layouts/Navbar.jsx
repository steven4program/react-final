import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Check from "../assets/images/check.png";

const { VITE_APP_HOST } = import.meta.env;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState("");
  const [isLogin, setIsLogin] = useState(false);

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
      const res = await axios.post(`/users/sign_out`);
      if (res.status) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '登出成功',
          showConfirmButton: false,
          timer: 1000
        })
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setIsLogin(false);
        setNickname("");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = cookieValue;
    axios.defaults.baseURL = VITE_APP_HOST
    axios.get(`/users/checkout`).then(res => {
      if (res.status) {
        setIsLogin(true);
      }
    }).catch(err => {
      console.log(err);
    })
    const userNickname = getNicknameFromToken(cookieValue)
    setNickname(userNickname);
  }, [location]);

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand d-flex">
            <img className="img-fluid" src={Check} alt="check"/>
            <h1><NavLink className="text-black fs-2 fw-bold" to="/">ONLINE TODO LIST</NavLink></h1>
          </div>
          { !isLogin ? (
              <></>
            ) : (
              <div className="d-flex">
                <h4 className="fw-bold me-4 my-auto d-none d-md-block">{nickname} 的 Todo List</h4>
                <button className="btn btn-outline-secondary" onClick={() => signOut()} >
                  <p className="fw-bold text-secondary my-auto">Logout</p>
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