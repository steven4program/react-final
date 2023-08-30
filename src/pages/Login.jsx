import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Work from "../assets/images/img.png";

const base_url = "https://todolist-api.hexschool.io/";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}users/sign_in`, formData);
      console.log(res)
      const { token } = res.data;
      localStorage.setItem("token", token);
      if (res.data.status) {
        navigate("/");
      }
    } catch (error) {
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
          <h2 className="fw-bold text-center">最實用的線上代辦事項服務</h2>
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
            <button className="fw-bold btn btn-success mt-4" type="submit">登入</button>
            <button className="fw-bold btn btn-outline-secondary mt-3">
              <NavLink className="fw-bold text-dark" to="/register">註冊帳號</NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

