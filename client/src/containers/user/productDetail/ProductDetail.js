import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function ProductDetail() {
  const query = useQuery();
  const navigate = useNavigate();
  const [prdDet, setPrdDet] = useState(null);
  function getProductDetail() {
    try {
      axios
        .get("http://localhost:8081/productDetail?id=" + query.get("id"))
        .then((d) => {
          setPrdDet(d.data.prdData);
        });
    } catch (error) {
      alert("Unable to access API !!!");
    }
  }
  useEffect(() => {
    getProductDetail();
  }, []);
  function renderImages() {
    return prdDet?.images?.map((item) => {
      return (
        <img
          src={"http://localhost:8081/" + item}
          height="150px"
          width="150px"
        />
      );
    });
  }
  return (
    <>
      <Header />
      <div className="row p-2 m-2">
        <div class="card mx-auto">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderImages()}
          </div>
          <div class="card-body">
            <h5 class="card-title">Product Name:{prdDet?.name}</h5>
            <h5 class="card-title">
              Product Description:{prdDet?.description}
            </h5>
            <h5 class="card-title">Product Price:{prdDet?.price}</h5>
            <h5 class="card-title">
              Product Qty:
              <input type="number" value={prdDet?.qty} />
            </h5>
            <a
              class="btn btn-primary text-white"
              onClick={() => {
                localStorage.getItem("id")
                  ? navigate()
                  : navigate(ROUTES.login.name);
              }}
            >
              Add To Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
