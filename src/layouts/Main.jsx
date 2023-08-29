import { NavLink, Outlet } from "react-router-dom";
import Check from "../assets/images/check.png";

const Main = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container__left">
          <img src={Check} alt="check" />
          <h1>Todo List</h1>
        </div>
        <div className="navbar__container__right">
          <ul>
            <li>
              <NavLink to="/todos" activeClassName="active">Todos</NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;