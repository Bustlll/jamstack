// const fetch = require('node-fetch')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// const queryString = require('query-string');




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
    function newTime(){
      let a = new Date();
      return a.getTime();
    }
    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // const items = lineItems.data;

    // console.log(session.metadata);
    // console.log(session.metadata.name);


    const { data, error } = await supabase
        .from('users')
        .insert([
         {
            cash:  session.metadata.cash, 
            name: session.metadata.name, 
            instagram:  session.metadata.instagram, 
            youtube:  session.metadata.youtube, 
            twitch: session.metadata.twitch, 
            reddit: session.metadata.reddit, 
            twitter:  session.metadata.twitter, 
            region: session.metadata.region, 
            Date: newTime(),
         }
        ]);
        // console.log(data);


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