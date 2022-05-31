const fetch = require('node-fetch')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
    if (stripeEvent.type === 'checkout.session.completed') {
      
   
      const {
        SUPABASE_URL,
        SUPABASE_KEY
      } = process.env;
      
   
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

      const { name = "Anonymous" } = event.queryStringParameters;
      const { instagram = "Anonymous" } = event.queryStringParameters;
      const { youtube = "Anonymous" } = event.queryStringParameters;
      const { twitch = "Anonymous" } = event.queryStringParameters;
      const { reddit = "Anonymous" } = event.queryStringParameters;
      const { twitter = "Anonymous" } = event.queryStringParameters;
      const { region = "Anonymous" } = event.queryStringParameters;
      const { qt = "Anonymous" } = event.queryStringParameters;
      
      
        function newTime(){
          let a = new Date();
          return a.getTime();
        }

          const { data, error } = await supabase
              .from('users')
              .insert([
               {
                  cash:  `${qt}`,
                  name: `${name}`, 
                  instagram:  `${instagram}`, 
                  youtube:  `${youtube}`, 
                  twitch: `${twitch}`, 
                  reddit: `${reddit}`, 
                  twitter:  `${twitter}`, 
                  region: `${region}`, 
                  Date: newTime(),
               }
              ]);
      
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