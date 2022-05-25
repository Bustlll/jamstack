
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.handler = async function (event, context) {
  const { body, headers } = event;

  try {
    
    // Check that the request is really from Stripe by verifying the signature ...
    const stripeEvent = stripe.webhooks.constructEvent(
      
      body,
      headers["stripe-signature"],
      process.env.WEBHOOK_SECRET
    );
    // Handle successful payments
    if (stripeEvent.type === "checkout.session.completed") {
      // Extract the checkout object itself from the event
      const checkoutSession = stripeEvent.data.object;
      console.log(checkoutSession);

      const items = await stripe.checkout.sessions.listLineItems(
        checkoutSession.id,
        { expand: ["data.price.product"] }
      );


      // Custom Business logic to fulfill an order goes here ...
    }

    // Respond to Stripe that the event was received successfully ...
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};
