const cartSchema = require("../models/cartSchema");
const Orderschema = require("../models/Orderschema");
const { responseHandler } = require("../services/responseHandler");
const stripe = require("stripe")("process.env.STRIPE_SEC_KEY");
const endpointSecret = "process.env.STRIPE_ENDPOINT";


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
      metadata: {
        orderId: `${orderData._id}`,
      },
      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,
    });

    console.log(session);

    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
};

const webhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(event);


  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Saving the payment details in the database
    const orderData = await Orderschema.findByIdAndUpdate(session.metadata.orderId, { "payment.status": "paid" }, { new: true })
  }



  // Return a 200 response to acknowledge receipt of the event
  res.send();
}

module.exports = { checkOut, webhook };
