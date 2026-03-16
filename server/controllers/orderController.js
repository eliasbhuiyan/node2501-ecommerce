const cartSchema = require("../models/cartSchema");
const Orderschema = require("../models/Orderschema");
const { responseHandler } = require("../services/responseHandler")

// paymentType = SSLCommerz / cash
const checkOut = async (req, res) => {
    const { paymentType, cartId, shippingAddress, insideDhaka } = req.body;
    const orderNumber = `${Date.now()}`

    if (!paymentType || !cartId || !shippingAddress || !insideDhaka) return responseHandler.error(res, 400, "All fields are required.")

    try {
        if (!cartId) return responseHandler.error(res, 400, "Invalid Request");
        const cartData = await cartSchema.findOne({ _id: cartId })
        if (!cartData) return responseHandler.error(res, 400, "Invalid Request");
        const charge = insideDhaka === "true" ? 80 : 120;
        const totalPrice = cartData.items.reduce((total, current) => {
            return total += current.subtotal;
        }, charge)

        const orderData = new Orderschema({
            user: req.user._id,
            items: cartData.items,
            shippingAddress,
            insideDhaka,
            deliveryCharge: charge,
            totalPrice,
            payment: {
                method: paymentType,
            },
            orderNumber
        })
        orderData.save();

        if (paymentType === "cash") {
            return responseHandler.success(res, 200, "Order placed successfully.")
        }

    } catch (error) {
        console.log(error);

    }
}


module.exports = { checkOut }