import { Outlet } from "react-router-dom";
import Work from "../assets/images/img.png";

function Auth () {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center gap-2">
        <div className="login-left-section col-4 mt-5 d-none d-md-block mr-5">
          <img className="img-fluid" src={Work} alt="work" />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth;