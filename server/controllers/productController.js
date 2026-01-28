const { responseHandler } = require("../services/responseHandler");

const createProduct = async (req, res) => {
    try {
        const { title, description, category, price, discountPercentage, variants, tags, isActive } = req.body;
        if (!title) return responseHandler(res, 400, "Product title is required");
        if (!description) return responseHandler(res, 400, "Product Description is required");
        if (!category) return responseHandler(res, 400, "Product Category is required");
        if (!price) return responseHandler(res, 400, "Product Price is required");

        console.log(req.files);

        console.log(req.file);


    } catch (error) {

    }
}

module.exports = { createProduct };