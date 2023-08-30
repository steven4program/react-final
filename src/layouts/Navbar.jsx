import { NavLink, Outlet } from "react-router-dom";
import Check from "../assets/images/check.png";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand d-flex">
            <img className="img-fluid" src={Check} alt="check"/>
            <h1><NavLink className="text-black fs-2 fw-bold" to="/todos">ONLINE TODO LIST</NavLink></h1>
          </div>
          { !token ? (
              <></>
            ) : (
              <div className="d-flex">
                <h4 className="fw-bold px-3">王小明的 Todo List</h4>
                <button className="btn btn-outline-secondary">
                  <NavLink className="fw-bold text-secondary" to="/logout">Logout</NavLink>
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