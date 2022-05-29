const apiKey = process.env.STRIPE_PRIVATE_KEY
const stripe = require("stripe")(apiKey);

const fetch = require('node-fetch')
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const queryString = require('query-string');




exports.handler = async function(event, context){
  const { name = "Anonymous" } = event.queryStringParameters;
  const { qt = "Anonymous" } = event.queryStringParameters;
const quanti =  `${qt}` * 100;
  // const referer = event.handler.referer
  // const params = new URLSearchParams(event.body)
  // const price_id = params.get("price_id")

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],
    line_items: [
      
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hello "+`${name}` + ", Welcome to Toxtat ",
          },
          unit_amount: quanti,
        },
        quantity: 1,
      },
    ],
    
    mode: "payment",
    success_url: "https://toxtat.com",
    cancel_url: "https://toxtat.com", 
  })


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
        
        const { name = "Anonymous" } = event.queryStringParameters;
        const { instagram = "Anonymous" } = event.queryStringParameters;
        const { youtube = "Anonymous" } = event.queryStringParameters;
        const { twitch = "Anonymous" } = event.queryStringParameters;
        const { reddit = "Anonymous" } = event.queryStringParameters;
        const { twitter = "Anonymous" } = event.queryStringParameters;
        const { region = "Anonymous" } = event.queryStringParameters;
        const { qt = "Anonymous" } = event.queryStringParameters;
 console.log( `
 Hello, ${name},
 yt, ${youtube},
 tw, ${twitch},
 ig, ${instagram},
 red, ${reddit},
 tw, ${twitter},
 reg, ${region}
 quant, ${qt}
 `);
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
  
  return {
    statusCode: 303,
    headers: {
      Location: session.url
      
    }
  }
  
}
