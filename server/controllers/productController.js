const { uploadToCloudinary } = require("../services/cloudinaryService");
const { responseHandler } = require("../services/responseHandler");

const createProduct = async (req, res) => {
    try {
        const { title, description, category, price, discountPercentage, variants, tags, isActive } = req.body;
        const thumbnail = req.files?.thumbnail;
        const images = req.files?.images;
        // if (!title) return responseHandler(res, 400, "Product title is required");
        // if (!description) return responseHandler(res, 400, "Product Description is required");
        // if (!category) return responseHandler(res, 400, "Product Category is required");
        // if (!price) return responseHandler(res, 400, "Product Price is required");

        if (!thumbnail || thumbnail?.length === 0) return responseHandler(res, 400, "Product Thumbnail is required");
        if (images && images?.length > 4) return responseHandler(res, 400, "You can upload images max 4");

        // const thumnailUrl = await uploadToCloudinary(thumbnail[0], "products")
        let imagesUrl = [];

        if (images) {
            const resPromise = images.map(async (item) => uploadToCloudinary(item, "products"));
            const results = await Promise.all(resPromise)
            
            imagesUrl = results.map(r => r.secure_url)
        }

        console.log(imagesUrl);



    } catch (error) {
        console.log(error);

    }
}

module.exports = { createProduct };