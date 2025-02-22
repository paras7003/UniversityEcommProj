import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const query = useQuery();
  const navigate = useNavigate();
  const [departmentId, setDepartmentId] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [form, setForm] = useState({
    name: "",
    image: null,
    university: query.get("id"),
  });
  const [formError, setFormError] = useState({
    name: "",
    image: "",
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function GetDepartmentByUniversityId() {
    try {
      axios
        .get("http://localhost:8081/department?id=" + query.get("id"))
        .then((d) => {
          setDepartments(d.data.depData);
        });
    } catch (error) {
      alert("Unable to Access API !!!");
    }
  }
  useEffect(() => {
    GetDepartmentByUniversityId();
  }, []);
  function SaveDepartment() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", query.get("id"));
      axios
        .post("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          GetDepartmentByUniversityId();
          resetForm();
        });
    } catch (error) {
      alert("Unable to access API!!!");
    }
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }
  function UpdateDepartment() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", query.get("id"));
      formData.append("id", departmentId);
      axios
        .put("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          GetDepartmentByUniversityId();
          resetForm();
        });
    } catch (error) {
      alert("Unable to access API!!!");
    }
  }
  function DeleteDepartment(id) {
    try {
      axios
        .delete("http://localhost:8081/department", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          GetDepartmentByUniversityId();
          resetForm();
        });
    } catch (error) {
      alert("Unable to access API!!!");
    }
  }
  function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Department Name Empty !!!" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please Select Image !!!" };
    }
    if (errors) setFormError(error);
    departmentId ? UpdateDepartment() : SaveDepartment();
  }
  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:8081/" + item.image}
              height="150px"
              width="150px"
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => {
                navigate(
                  ROUTES.productAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
            >
              Add Product
            </button>
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {
                setDepartmentId(item._id);
                setForm({ ...form, name: item.name });
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                DeleteDepartment(item._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <Header />
      <div className="row p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">University Name</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={query.get("name")}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Department Name</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                  placeholder="Department Name"
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Department Image</label>
              <div className="col-8">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onDepartmentSubmit();
              }}
            >
              {departmentId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="row border p-2 m-2">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add Product</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Department;
