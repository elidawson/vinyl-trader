import "../stylesheets/header.css";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "./App";
import { useContext } from "react";

export default function Header({ handleLogout }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="header-div">
        <h1 className="page-title">vinyl trader 🔊</h1>
        {user ? (
          <div className="user-menu">
            <div>
              <span>hello, {user.name}</span>
              <br />
              <button className="small-button" onClick={() => navigate("/user")}>
                my profile
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="button">
            login/signup
          </Link>
        )}
        <div className="nav">
          
          {user && (
            <>
            <NavLink
            to="/"
            className="nav-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            browse
          </NavLink><br/>
            <NavLink to="/records/new" className="nav-link">
            new record
            </NavLink>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
