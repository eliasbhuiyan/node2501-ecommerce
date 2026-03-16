const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");
const { responseHandler } = require("../services/responseHandler");
const isValidId = require("../services/isValidId");

const addToCart = async (req, res) => {
    try {
        const { productId, sku, quantity } = req.body;
        if (!productId || !sku || !quantity) return responseHandler.error(res, 400, "Invalid request.")

        const productData = await productSchema.findById(productId);
        const discountAmount = (productData.price * productData.discountPercentage) / 100;
        const discountedPrice = productData.price - discountAmount;
        const subtotal = discountedPrice * quantity;

        const existingCart = await cartSchema.findOne({ user: req.user._id })

        if (existingCart) {
            const alreadyExists = existingCart.items.some((pItem) => pItem.sku === sku)
            if (alreadyExists) return responseHandler.error(res, 400, "Product already exist in cart")

            existingCart.items.push({
                product: productId,
                sku,
                quantity,
                subtotal
            })
            existingCart.save()
            return responseHandler.success(res, 201, "Product added to cart.")
        } else {
            await cartSchema.create({
                user: req.user._id,
                items: [
                    {
                        product: productId,
                        sku,
                        quantity,
                        subtotal
                    }
                ]
            })

            responseHandler.success(res, 201, "Product added to cart.")
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserCart = async (req, res) => {
    try {
        const cart = await cartSchema.findOne({ user: req.user._id }).select("-user")
        responseHandler.success(res, 200, cart)
    } catch (error) {
        responseHandler.error(res, 500, "Server Error")
    }
}

const updateCart = async (req, res) => {
    try {
        const { productId, itemId, quantity } = req.body;

        if (!isValidId([productId, itemId])) return responseHandler.error(res, 400, "Invalid Request");

        if (quantity < 1) return responseHandler.error(res, 400, "Keep minimum 1 item");

        if (!itemId || !quantity || !productId) return responseHandler.error(res, 400, "Invalid Request");


        const productData = await productSchema.findById(productId);
        const discountAmount = (productData.price * productData.discountPercentage) / 100;
        const discountedPrice = productData.price - discountAmount;
        const subtotal = discountedPrice * quantity;

        const cart = await cartSchema.findOneAndUpdate({ user: req.user._id, "items._id": itemId }, { $set: { "items.$.quantity": quantity, "items.$.subtotal": subtotal } }, { new: true }).select("items totalItems")

        responseHandler.success(res, 200, cart, "Cart Updated")
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 500, "Server Error")
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!isValidId([itemId])) return responseHandler.error(res, 400, "Invalid Request");

        if (!itemId) return responseHandler.error(res, 400, "Invalid Request");


        const cart = await cartSchema.findOneAndUpdate({ user: req.user._id, "items._id": itemId }, {
            $pull: {
                items: { _id: itemId }
            }
        }, { new: true }).select("items totalItems")

        responseHandler.success(res, 200, cart, "Cart Updated")
    } catch (error) {
        console.log(error);
        responseHandler.error(res, 500, "Server Error")
    }
}

module.exports = { addToCart, getUserCart, updateCart, removeFromCart };