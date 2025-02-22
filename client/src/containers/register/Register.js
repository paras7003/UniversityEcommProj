import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../navigations/Routes";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function registerUser() {
    try {
      axios.post("http://localhost:8081/register", form).then((d) => {
        alert(d.data.message);
        navigate(ROUTES.login.name);
      });
    } catch (error) {
      alert(error?.message);
    }
  }
  function onSubmitUser() {
    let errors = false;
    let error = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (form.firstName.trim().length == 0) {
      errors = true;
      error = { ...error, firstName: "First Name Empty !!!" };
    }
    if (form.lastName.trim().length == 0) {
      errors = true;
      error = { ...error, lastName: "Last Name Empty !!!" };
    }
    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: "Email Empty !!!" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Password Empty !!!" };
    }
    if (form.confirmPassword.trim().length == 0) {
      errors = true;
      error = { ...error, confirmPassword: "Confirm Password Empty !!!" };
    }
    if (form.password != form.confirmPassword) {
      errors = true;
      error = {
        ...error,
        confirmPassword: "Password and Confirm password must be same !!!",
      };
    }
    if (
      !(form.password.trim().length >= 6 && form.password.trim().length <= 12)
    ) {
      errors = true;
      error = {
        password: "Password length between 6 to 12 character long !!!",
      };
    }
    if (errors) setForm(error);
    else {
      setFormError(error);
      registerUser();
    }
  }
  return (
    <>
      <Header />
      <div className="row p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">Register</div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">First Name</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                  name="firstName"
                />
                <p className="text-danger">{formError.firstName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Last Name</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                  name="lastName"
                />
                <p className="text-danger">{formError.lastName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Email</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                  name="email"
                />
                <p className="text-danger">{formError.email}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Password</label>
              <div className="col-8">
                <input
                  type="password"
                  className="form-control"
                  onChange={changeHandler}
                  name="password"
                />
                <p className="text-danger">{formError.password}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Confirm Password</label>
              <div className="col-8">
                <input
                  type="password"
                  className="form-control"
                  onChange={changeHandler}
                  name="confirmPassword"
                />
                <p className="text-danger">{formError.confirmPassword}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onSubmitUser();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
