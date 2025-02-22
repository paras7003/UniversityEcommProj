import ProductModel from "../models/Product.js";

export const CreateProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    const prdData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
      images: images,
      department: req.body.departmentId,
    });
    if (prdData) res.status(201).send({ message: "Product Created !!!" });
    else res.status(404).send({ message: "Unable to Create Product !!!" });
  } catch (error) {
    console.log("Fail to Submit Data !!!");
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    const prdData = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        description: req.body.description,
        qty: req.body.qty,
        price: req.body.price,
        images: images,
        department: req.body.departmentId,
      }
    );
    if (prdData) res.status(200).send({ message: "Product Updated !!!" });
    else res.status(404).send({ message: "Unable to Update Product !!!" });
  } catch (error) {
    console.log("Fail to Submit Data !!!");
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const prdData = await ProductModel.deleteOne({ _id: req.body.id });
    if (prdData) res.status(200).send({ message: "Product Deleted !!!" });
    else res.status(404).send({ message: "Unable to Delete Product !!!" });
  } catch (error) {
    console.log("Fail to Submit Data !!!");
  }
};

export const GetProductByDepartmentId = async (req, res) => {
  try {
    const prdData = await ProductModel.find({
      department: req.query.id,
    }).populate({ path: "department", populate: [{ path: "university" }] });
    res.status(200).send({ prdData });
  } catch (error) {
    console.log("Fail to Submit Data !!!");
  }
};

export const GetProductDetail = async (req, res) => {
  try {
    const prdData = await ProductModel.findOne({
      _id: req.query.id,
    }).populate({ path: "department", populate: [{ path: "university" }] });
    res.status(200).send({ prdData });
  } catch (error) {
    console.log("Fail to Submit Data !!!");
  }
};

export const UpdateProductQty = async (req, res) => {
  try {
    let productInDb = await ProductModel.findOne({ _id: req.body.id });
    let active = true;
    if (productInDb.qty - req.body.qty <= 0) active = false;
    let prdData = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        qty: productInDb.qty - req.body.qty,
        active: active,
      }
    );
    if (prdData) res.status(200).send({ message: "Product Qty Updated !!!" });
    else res.status(404).send({ message: "Unable to Update Product Qty !!!" });
  } catch (error) {
    console.log("Fail to Submit Data !!!");
  }
};
