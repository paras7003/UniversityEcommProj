import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Product() {
  const query = useQuery();
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState(null);
  const [form, setForm] = useState({
    name: "",
    images: null,
    departmentId: query.get("id"),
    description: "",
    qty: 10,
    price: 0,
  });
  const [formError, setFormError] = useState({
    name: "",
    images: "",
    description: "",
    qty: "",
    price: "",
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function getProductsByDepartmentId() {
    try {
      axios
        .get("http://localhost:8081/product?id=" + query.get("id"))
        .then((d) => {
          setProducts(d.data.prdData);
        });
    } catch (error) {
      alert("Unable to access API !!!");
    }
  }
  useEffect(() => {
    getProductsByDepartmentId();
  }, []);
  function saveProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("qty", form.qty);
      formData.append("departmentId", query.get("id"));
      axios
        .post("http://localhost:8081/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getProductsByDepartmentId();
          resetForm();
        });
    } catch (error) {
      alert("Unable to access API !!!");
    }
  }
  function resetForm() {
    setForm({
      name: "",
      images: null,
      departmentId: query.get("id"),
      description: "",
      qty: 10,
      price: 0,
    });
  }
  function UpdateProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("qty", form.qty);
      formData.append("departmentId", query.get("id"));
      formData.append("id", productId);
      axios
        .put("http://localhost:8081/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getProductsByDepartmentId();
          resetForm();
        });
    } catch (error) {
      alert("Unable to access API !!!");
    }
  }
  function deleteProduct(id) {
    try {
      axios
        .delete("http://localhost:8081/product", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          getProductsByDepartmentId();
          resetForm();
        });
    } catch (error) {
      alert("Unable to access API !!!");
    }
  }
  function onProductSubmit() {
    let errors = false;
    let error = { name: "", images: "", description: "", qty: "", price: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Product Name Empty !!!" };
    }
    if (form.description.trim().length == 0) {
      errors = true;
      error = { ...error, description: "Product Description Empty !!!" };
    }
    if (form.qty == "" || form.qty == 0) {
      errors = true;
      error = { ...error, qty: "Please Enter Qty !!!" };
    }
    if (form.price == "" || form.price == 0) {
      errors = true;
      error = { ...error, price: "Please Enter Price !!!" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      productId ? UpdateProduct() : saveProduct();
    }
  }
  function renderProducts() {
    return products?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:8081/" + item.images[0]}
              height="150px"
              width="150px"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.qty}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteProduct(item._id);
              }}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => {
                setProductId(item._id);
                setForm({
                  ...form,
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  qty: item.qty,
                });
              }}
            >
              Edit
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
            {productId ? "Edit Product" : "New Product"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">Department Name</label>
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
              <label className="col-4">Product Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Product Name"
                  onChange={changeHandler}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Description</label>
              <div className="col-8">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter Product Description"
                  onChange={changeHandler}
                  value={form.description}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Price</label>
              <div className="col-8">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Enter Product Price"
                  onChange={changeHandler}
                  value={form.price}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Qty</label>
              <div className="col-8">
                <input
                  type="number"
                  name="qty"
                  className="form-control"
                  placeholder="Enter Product Qty"
                  onChange={changeHandler}
                  value={form.qty}
                />
                <p className="text-danger">{formError.qty}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Images</label>
              <div className="col-8">
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) => {
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onProductSubmit();
              }}
            >
              {productId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="row border p-2 m-2">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
