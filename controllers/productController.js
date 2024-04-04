import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import orderModel from "../models/orderModel.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size < 5120:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 5mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

// get products
export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    if (!products)
      res.status(404).send({
        success: false,
        message: "unable to get products",
      });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error getting product",
    });
  }
};

// get single product
export const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (!product)
      res.status(404).send({
        success: false,
        message: "unable to get product",
      });
    res.status(200).send({
      success: true,
      message: "product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error getting product",
    });
  }
};

// get photo of product
export const getProductPhoto = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Tpye", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error getting product photo",
    });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size < 5120:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 5mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: "error updating product",
    });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).send({
        success: false,
        message: "unable to delete product",
      });
    }
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: "error deleting product",
    });
  }
};

// product filter
export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: "error in filtering products",
    });
  }
};

// product count
export const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productList = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// get similar products
export const productRelated = async (req, res) => {
  try {
    const {pid,cid} = req.params;
    const products = await productModel.find({
      category: cid,
      _id: {$ne:pid}
    }).select('-photo').limit(3).populate('category');
    res.status(200).send({
      success:true,
      message: 'similar products fethced successfully',
      products
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: 'error finding related products'
    })
  }
}

// get product category
export const productCategory = async(req, res) => {
  try {
    const category = await categoryModel.find({slug:req.params.slug});
    const products = await productModel.find({category}).populate("category");
    res.status(200).send({
      success:true,
      category,
      products
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: 'error getting category of product'
    })
  }
}

// place orders
export const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    console.log('user id in order : ',req.user._id);
    
    // Await the result of saving the order
    const order = await new orderModel({
      products: cart,
      buyer: req.user._id,
      status: 'Processing'
    }).save();

    // Send the saved order object in the response
    return res.status(200).send({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: "Error placing order",
    });
  }
};
