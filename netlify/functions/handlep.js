const fetch = require('node-fetch')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const queryString = require('query-string');

exports.handler = async ({event, body, headers }) => {



  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // only do stuff if this is a successful Stripe Checkout purchase
    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const items = lineItems.data;

    alert(items);

    return {
      statusCode: 200,
      // body: JSON.stringify({ received: true }),
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
