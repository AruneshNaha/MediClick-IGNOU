const Category = require('../models/categoryModel')
const Product = require('../models/productModel');
const { json } = require("body-parser");
const ErrorHandler = require('../utils/errorHandler');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in db!"
            })
        }

        req.category = cate;
        next();
    });
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);

    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save category in db!"
            })
        }

        res.json({category});
    })
}

exports.getCategory = (req,res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req,res) => {
    Category.find().exec((err, items) => {
        if(err){
            return res.status(400).json({
                error:"No categories found!"
            })
        }
        res.json(items)
    })
}

exports.getProductsByCategoryID = async(req,res, next) =>{
    const products = await Product.find().where({'category': req.params.categoryId}).populate('category')

    if(products.length === 0){
        return next(new ErrorHandler('No products found in this category', 404))
    }else{
        res.status(200).json({
            productCount: products.length,
            products
        })
    }
}

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to update category!"
            })
        }
        res.json(updatedCategory)
    })
}

exports.deleteCategory = (req,res) => {
    const category = req.category;

    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error:"Failed to delete category!"
            })
        }
        res.json({
            message: "Success in deleting category"
        })
    })
}