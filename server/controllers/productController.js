const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { responseHandler } = require("../services/responseHandler");
const { SIZE_ENUM } = require("../services/utils");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive,
    } = req.body;
    const thumbnail = req.files?.thumbnail;
    const images = req.files?.images;

    if (!title) return responseHandler(res, 400, "Product title is required");
    if (!slug) return responseHandler(res, 400, "Slug is required");
    const isSlugExist = await productSchema.findOne({
      slug: slug.toLowerCase(),
    });
    if (isSlugExist) return responseHandler(res, 400, "Slug already exist");
    if (!description)
      return responseHandler(res, 400, "Product Description is required");
    if (!category)
      return responseHandler(res, 400, "Product Category is required");
    const isCategoryExist = await categorySchema.findById(category);
    if (!isCategoryExist) return responseHandler(res, 400, "Invalid Category");
    if (!price) return responseHandler(res, 400, "Product Price is required");

    // apadotor jonno
    const variantsData = JSON.parse(variants);
    if (!Array.isArray(variantsData) || variantsData.length === 0)
      return responseHandler(res, 400, "Minimum 1 variant is required.");

    for (const variant of variantsData) {
      if (!variant.sku) return responseHandler(res, 400, "SKU is required.");
      if (!variant.color)
        return responseHandler(res, 400, "Color is required.");
      if (!variant.size) return responseHandler(res, 400, "Color is required.");
      if (!SIZE_ENUM.includes(variant.size))
        return responseHandler(res, 400, "Invalid size");
      if (!variant.stock || variant.stock < 1)
        return responseHandler(
          res,
          400,
          "Stock is required and must be more then 0",
        );
    }

    const skus = variantsData.map((v) => v.sku);
    if (new Set(skus).size !== skus.length)
      return responseHandler(res, 400, "SUK must unique");

    if (!thumbnail || thumbnail?.length === 0)
      return responseHandler(res, 400, "Product Thumbnail is required");
    if (images && images?.length > 4)
      return responseHandler(res, 400, "You can upload images max 4");

    const thumnailUrl = await uploadToCloudinary(thumbnail[0], "products");
    let imagesUrl = [];

    if (images) {
      const resPromise = images.map(async (item) =>
        uploadToCloudinary(item, "products"),
      );
      const results = await Promise.all(resPromise);
      imagesUrl = results.map((r) => r.secure_url);
    }

    const newProduct = new productSchema({
      title,
      slug: slug.toLowerCase(),
      description,
      category,
      price,
      discountPercentage,
      variants: variantsData,
      thumbnail: thumnailUrl.secure_url,
      images: imagesUrl,
      tags,
      isActive,
    });
    newProduct.save();
    return responseHandler(res, 201, "Product uploaded successfully", true);
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
};

const getProductList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const skip = (page - 1) * limit;
    console.log(category);

    const totalProducts = await productSchema.countDocuments();

    const pipeline = [
      {
        $match: {
          "isActive": true,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    if (category) {
      pipeline.push({
        $match: {
          "category.slug": category,
        },
      });
    }

    const productList = await productSchema.aggregate(pipeline);
    console.log(productList);

    const totalPages = Math.ceil(totalProducts / limit);

    responseHandler(res, 200, "", true, {
      products: productList,
      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
};

const getProductDetals = async (req, res) => {
  try {
    const { slug } = req.params;
    const productDetails = await productSchema.findOne({ slug, isActive: true }).populate("category", "name").select("-isActive -updatedAt -__v")
    if (!productDetails) return responseHandler(res, 404, "Product not found");

    return responseHandler(res, 200, "", true, productDetails);
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
}

const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive, } = req.body;
    const { slug } = req.params;

    const productData = await productSchema.findOne({ slug })

    console.log(productData);



  } catch (error) {
    console.log(error);

  }
}

module.exports = { createProduct, getProductList, getProductDetals, updateProduct };
