const fetch = require('node-fetch')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const queryString = require('query-string');




exports.handler = async ({ headers, body }) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const items = lineItems.data;

    console.log(items);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: `WebHook error: ${error.message}`,
    };
  }
};