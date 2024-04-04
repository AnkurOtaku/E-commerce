import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//create category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "name is required" });
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res.status(200).send({ message: "category already exists" });
    const category = await new categoryModel({
      name: name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

//update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//get all categories
export const getCategories = async(req, res) =>{
  try {
    const category = await categoryModel.find();
    if(!category){
      return res.status(404).send({
        success:false,
        message: 'no category found'
      })
    }
    res.status(200).send({
      success: true,
      message: 'categories fetched successfully',
      category
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: 'error in getting categories'
    })
  }
}

// get single category
export const getCategory = async(req, res)=>{
  try {
    const category = await categoryModel.findOne({slug:req.params.slug});
    if(!category){
      return res.status(404).send({
        success: false,
        message: 'category not found',
      })
    }
    res.status(200).send({
      success:true,
      messsage: 'one category found',
      category
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: 'error in single category'
    })
  }
}

// delete category
export const deleteCategory = async( req, res) =>{
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if(!category){
      return res.status(404).send({
        success: false,
        message:"no category found to delete"
      })
    }
    return res.status(200).send({
      success: true,
      message: 'category deleted successfully',
      category
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: 'error in deleting category'
    })
  }
}