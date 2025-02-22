import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";

function Header() {
  const [user, setUser] = useState({ id: null, role: null });
  const navigate = useNavigate();
  useEffect(() => {
    let id = localStorage.getItem("id");
    let role = localStorage.getItem("role");
    if (id) setUser({ id: id, role: role });
  }, []);
  function renderMenu() {
    if (user?.role == "admin") {
      return (
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>
              University Management
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>
              Order Management
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>
              User Management
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.home.name}>
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={ROUTES.about.name}>
              About
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={ROUTES.contact.name}>
              Contact
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={ROUTES.support.name}>
              Support
            </Link>
          </li>
        </ul>
      );
    }
  }
  function renderButtons() {
    if (user?.id) {
      return (
        <button
          class="btn btn-outline-success m-2 my-sm-0"
          onClick={() => {
            localStorage.clear();
            navigate(ROUTES.login.name);
          }}
        >
          Logout
        </button>
      );
    } else {
      return (
        <>
          <button
            class="btn btn-outline-success m-2 my-sm-0"
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.register.name);
            }}
          >
            Register
          </button>
          <button
            class="btn btn-outline-success m-2 my-sm-0"
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.login.name);
            }}
          >
            Login
          </button>
        </>
      );
    }
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {renderMenu()}
          {renderButtons()}
        </div>
      </nav>
    </>
  );
}

export default Header;
