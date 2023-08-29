import { NavLink, Outlet } from "react-router-dom";
import Check from "../assets/images/check.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar container">
        <div className="row justify-content-between">
          <div className="">
            <img src={Check} alt="check" style={{display: "block"}}/>
            <h1><NavLink to="/todos">Todos List</NavLink></h1>
          </div>
          <div className="">
            <ul>
              <li>
                <NavLink to="/todos" className="active">Todos</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main>
          <Outlet />
      </main>
    </>
  );
};

export default Navbar;