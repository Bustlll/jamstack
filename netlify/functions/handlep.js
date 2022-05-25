const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === 'checkout.session.completed') {
        if(window) {
            console.log(localStorage.cashy)
          } else {
            return true 
          }
    }

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

// data: () => ({
//     showMessage: process.isClient
//         ? !localStorage.getItem("hideMessage")
//         : false,
// })

// data: () => ({
//     showMessage: !localStorage.getItem("hideMessage"),

//   if(window) {
//     // use localStorage
//   } else {
//     return true 
//   }