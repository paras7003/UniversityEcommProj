import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function UserProduct() {
  const navigate = useNavigate();
  const query = useQuery();
  const [products, setProducts] = useState(null);
  function getProductsByDepartment() {
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
    getProductsByDepartment();
  }, []);
  function renderProducts() {
    return products?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8081/" + item.images[0]}
              height="150px"
              width="150px"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Product Name : {item.name}</h5>
              <h5 class="card-title">
                Product Description : {item.description}
              </h5>
              <h5 class="card-title">Product Price : {item.price}</h5>
              <h5 class="card-title">Product Qty : {item.qty}</h5>
              <a
                class="btn btn-primary text-white"
                onClick={() => {
                  navigate(ROUTES.productDetail.name + "?id=" + item._id);
                }}
              >
                View Product Detail
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <Header />
      <div className="row border p-2 m-2">{renderProducts()}</div>
    </>
  );
}

export default UserProduct;
