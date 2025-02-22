import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function University() {
  const [universityId, setUniversityId] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [form, setForm] = useState({ name: "", image: null });
  const [formError, setFormError] = useState({ name: " ", image: " " });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function getUniversities() {
    try {
      axios.get("http://localhost:8081/university").then((d) => {
        setUniversities(d.data.univData);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unable to fetch data from API!",
      });
    }
  }
  useEffect(() => {
    getUniversities();
  }, []);
  function saveUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios
        .post("http://localhost:8081/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: d.data.message,
          });
          getUniversities();
          resetForm();
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong While Using API!",
      });
    }
  }
  function resetForm() {
    setForm({ name: " ", image: null });
  }
  function UpdateUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("id", universityId);
      axios
        .put("http://localhost:8081/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: d.data.message,
          });

          getUniversities();
          resetForm();
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong While Using API!",
      });
    }
  }
  function DeleteUniversity(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete("http://localhost:8081/university", { data: { id: id } })
            .then((d) => {
              Swal.fire("Deleted!", d.data.message, "success");
              getUniversities();
              resetForm();
            });
        } catch (error) {
          Swal.fire("Error!", "Something went wrong while using API!", "error");
        }
      }
    });
  }

  function onUniversitySubmit() {
    let errors = false;
    let error = { name: " ", image: " " };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Name Empty!!!" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please Select Image !!!" };
    }
    if (errors) setFormError(error);
    else setFormError(error);
    universityId ? UpdateUniversity() : saveUniversity();
  }
  function renderUniversities() {
    return universities?.map((item) => {
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
                  ROUTES.departmentAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Department
            </button>
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {
                setUniversityId(item._id);
                setForm({ ...form, name: item.name });
              }}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                DeleteUniversity(item._id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <Header />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {universityId ? "Edit University" : "New University"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">University Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  placeholder="University Name"
                  onChange={changeHandler}
                  value={form.name}
                  className="form-control"
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">University Image</label>
              <div className="col-8">
                <input
                  type="file"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                  className="form-control"
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onUniversitySubmit();
              }}
            >
              {universityId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="border m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </>
  );
}

export default University;
