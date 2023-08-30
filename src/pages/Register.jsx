import axios from 'axios';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Work from '../assets/images/img.png';

const base_url = "https://todolist-api.hexschool.io/"

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { confirmPassword, ...dataToSend } = formData
      if (formData.password !== confirmPassword) {
        alert("密碼不一致");
        return;
      }
      const res = await axios.post(`${base_url}users/sign_up`, dataToSend);
      if (res.status) {
        navigate("/login");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="login-left-section col-4 mt-5 d-none d-md-block mr-5">
          <img className="img-fluid" src={Work} alt="work" />
        </div>
        <div className="login-right-section d-flex col-4 flex-column align-items-center">
          <h2 className="fw-bold">註冊帳號</h2>
          <form className="d-flex flex-column justify-content-around mt-lg-3" onSubmit={handleSubmit}>
            <div className="d-flex flex-column mt-3">
              <label className="fw-bold fs-5" htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="請輸入信箱"
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label className="fw-bold fs-5" htmlFor="nickname">您的暱稱</label>
              <input
                className="form-control"
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                placeholder="請輸入暱稱"
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label className="fw-bold fs-5" htmlFor="password">密碼</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                placeholder="請輸入密碼"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label className="fw-bold fs-5" htmlFor="confirmPassword">密碼確認</label>
              <input
                className="form-control"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="請再次輸入密碼"
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="fw-bold btn btn-success mt-4" type="submit">註冊帳號</button>
            <button className="fw-bold btn btn-outline-secondary mt-3">
              <NavLink className="fw-bold text-dark" to="/login">登入</NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;