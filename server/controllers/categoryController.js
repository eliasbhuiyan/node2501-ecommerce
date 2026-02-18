const categorySchema = require("../models/categorySchema");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { responseHandler } = require("../services/responseHandler");

const createNewCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        if (!name) return responseHandler(res, 400, "Category name is required");
        if (!slug) return responseHandler(res, 400, "Slug is required");
        if (!req.file) return responseHandler(res, 400, "Category Thumnail is required");

        const existingSlug = await categorySchema.findOne({ slug })
        if (existingSlug) return responseHandler(res, 400, "Category with this Slug already exist");

        const imgRes = await uploadToCloudinary(req.file, "categories")

        const category = categorySchema({
            name,
            slug,
            description,
            thumbnail: imgRes.secure_url
        })

        category.save();
        responseHandler(res, 201, true, "", category)
    } catch (error) {
        return responseHandler(res, 500, "Internal Server Error");
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categorySchema.find({});
        responseHandler(res, 200, true, "", categories)
    } catch (error) {
        return responseHandler(res, 500, "Internal Server Error");
    }
}

module.exports = { createNewCategory, getAllCategories }