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
    if (stripeEvent.type === 'checkout.session.completed') {
      
      // const BASE_URL = "https://toxtat.com/wreckthisbeach/adsup"
      // const {date} = JSON.parse(event.body)
      // return fetch(`${BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${date}`)
      // .then(response => {if (!response.ok) 
      //   {throw new Error('Network response was not ok');}
      //       return response.json()}) 
      //       .then(data => {  return {
      //         statusCode: 200,
      //         body: JSON.stringify(data)}})

        

        // const url = 'https://toxtat.com/wreckthisbeach/hello';
        // const result = fetch(`${url}`, { method: 'get' })
        


console.log(location.pathname);
console.log(location.href);
     

    

    }

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