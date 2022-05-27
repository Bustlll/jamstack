const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
       

    
    // Connect to our database 
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_DATABASE, process.env.SUPABASE_SERVICE_API_KEY);
    
    // Our standard serverless handler function
    
    exports.handler = async event => {
    
      
    
      // Insert a row
        const { data, error } = await supabase
            .from('users')
            .insert([
             {
                cash: 12,
                name: "ManCOW", 
                instagram: "ManCOW", 
                youtube: "ManCOW", 
                twitch: "ManCOW", 
                reddit: "ManCOW", 
                twitter: "ManCOW", 
                region: "ManCOW", 
                Date: newTime(),
             }
            ]);
            function newTime(){
              let a = new Date();
              return a.getTime();
            }
          
      
      // Did it work?
      return {
        statusCode: 200,
      }
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