import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Check from '../assets/images/check.png';
// import Work from '../assets/images/img.png';

const base_url = 'https://todolist-api.hexschool.io/';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const { token } = res.data;
      localStorage.setItem('token', token);
      if (res.data.status) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <div className="login__container__right__title">
            <img src={Check} alt="check" />
            <h1>登入</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login__container__right__form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="login__container__right__form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="login__container__right__form">
              <button type="submit">登入</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

