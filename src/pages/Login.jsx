import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { handleApiRes } from "../utils/errorHandler";

const { VITE_APP_HOST } = import.meta.env;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/users/sign_in`, formData);
      const { token } = res.data;
      document.cookie = `token=${token};`
      if (res.data.status) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/");
      }
    } catch (error) {
      handleApiRes("error", "登入失敗", error.response.data.message)
    }
  }

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = cookieValue;
    axios.defaults.baseURL = VITE_APP_HOST
    axios.get(`/users/checkout`).then(res => {
      if (res.status) {
        handleApiRes("info", "您已登入")
        navigate("/");
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="login-right-section d-flex col-md-4 col-12 flex-column align-items-center">
      <h2 className="fw-bold text-center">最實用的線上代辦事項服務</h2>
      <form className="d-flex flex-column justify-content-around mt-lg-3">
        <div className="d-flex flex-column mt-3">
          <label className="fw-bold fs-5" htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="d-flex flex-column mt-3">
          <label className="fw-bold fs-5" htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="fw-bold btn btn-success mt-4" type="button" onClick={() => handleSubmit()}>登入</button>
        <NavLink className="fw-bold btn btn-outline-secondary mt-3 text-dark" to="/auth/register">註冊帳號</NavLink>
      </form>
    </div>
  );
}

export default Login;

