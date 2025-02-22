import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  CreateUniversity,
  DeleteUniversity,
  GetUniversities,
  UpdateUniversity,
} from "./controllers/University.js";
import {
  CreateDepartment,
  DeleteDepartment,
  GetDepartmentByUniversityId,
  UpdateDepartment,
} from "./controllers/Department.js";
import {
  CreateProduct,
  DeleteProduct,
  GetProductByDepartmentId,
  GetProductDetail,
  UpdateProduct,
  UpdateProductQty,
} from "./controllers/Product.js";
import { Login, Register } from "./controllers/User.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
//university module
const storageUniv = multer.diskStorage({
  destination: "uploadsUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadsUniv = multer({
  storage: storageUniv,
});
// http://localhost:8081/university
app.post("/university", uploadsUniv.single("image"), CreateUniversity);
app.put("/university", uploadsUniv.single("image"), UpdateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", GetUniversities);

//Department Module
const storageDep = multer.diskStorage({
  destination: "uploadsDep/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadsDep = multer({
  storage: storageDep,
});
// http://localhost:8081/department
app.post("/department", uploadsDep.single("image"), CreateDepartment);
app.put("/department", uploadsDep.single("image"), UpdateDepartment);
app.delete("/department", DeleteDepartment);
app.get("/department", GetDepartmentByUniversityId);

//Product Module
const storagePrd = multer.diskStorage({
  destination: "uploadsPrd/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadsPrd = multer({
  storage: storagePrd,
});
app.post("/product", uploadsPrd.array("images"), CreateProduct);
app.put("/product", uploadsPrd.array("images"), UpdateProduct);
app.delete("/product", DeleteProduct);
app.get("/product", GetProductByDepartmentId);
app.get("/productDetail", GetProductDetail);
app.put("/updateProductQty", UpdateProductQty);
//User Module
app.post("/register", Register);
app.post("/login", Login);
//image access in frontend
app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsPrd/"));
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
      console.log("server running at port : " + process.env.PORT);
    });
  })
  .catch(() => {
    console.log("database connection error");
  });
