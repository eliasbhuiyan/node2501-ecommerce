const cartSchema = require("../models/cartSchema");
const Orderschema = require("../models/Orderschema");
const { responseHandler } = require("../services/responseHandler");
const stripe = require("stripe")(process.env.STRIPESE);

// paymentType = SSLCommerz / cash
const checkOut = async (req, res) => {
  const { paymentType, cartId, shippingAddress, insideDhaka } = req.body;
  const orderNumber = `${Date.now()}`;

  if (!paymentType || !cartId || !shippingAddress || !insideDhaka)
    return responseHandler.error(res, 400, "All fields are required.");

  try {
    if (!cartId) return responseHandler.error(res, 400, "Invalid Request");
    const cartData = await cartSchema.findOne({ _id: cartId });
    if (!cartData) return responseHandler.error(res, 400, "Invalid Request");
    const charge = insideDhaka === "true" ? 80 : 120;
    const totalPrice = cartData.items.reduce((total, current) => {
      return (total += current.subtotal);
    }, charge);

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
      orderNumber,
    });
    orderData.save();

    if (paymentType === "cash") {
      return responseHandler.success(res, 200, "Order placed successfully.");
    }

    // For Online Banking

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: "T-Shirt",
              description: `Blue T-Shirt with chest print`,
            },
            unit_amount: 500 * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: `${req.user.email}`,
      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,
    });

    console.log(session);

    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkOut };
