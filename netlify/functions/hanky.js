// const fetch = require('node-fetch')
const apiKey = process.env.STRIPE_PRIVATE_KEY
const stripe = require("stripe")(apiKey)
// const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// const queryString = require('query-string');






exports.handler = async function(event, body, headers, context){
    
    const { name = "Anonymous" } = event.queryStringParameters;
    const { qt = "Anonymous" } = event.queryStringParameters;
  const quanti =  `${qt}` * 100;


  
  //aqui funcionan los event querystring, son reacheables porque vienen de url con event, body
  
    const session = await stripe.checkout.sessions.create({
  
      payment_method_types: ["card"],
      line_items: [
        
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Hello "+`${name}` + ", Welcome to TOXTAT ",
            },
            unit_amount: quanti,
          },
          quantity: 1,
        },
      ],
      
      mode: "payment",
      success_url: "https://www.toxtat.com",
      cancel_url: "https://www.toxtat.com/menu.html", 
    })

  await session; 
    try {
        // check the webhook to make sure it’s valid
        const stripeEvent = stripe.webhooks.constructEvent(
          body,
          headers['stripe-signature'],
          process.env.STRIPE_WEBHOOK_SECRET
        );
    
        // only do stuff if this is a successful Stripe Checkout purchase
        if (stripeEvent.type === 'checkout.session.completed') {
          
         console.log("sssda");
         console.log(`U made it, ${name}`);
    
        }
    
        return {
          statusCode: 303,
          headers: {
            Location: session.url
            
          },
          body: JSON.stringify({ received: true }),
        };
      } catch (err) {
        console.log(`Stripe webhook failed with ${err}`);
    
        return {
          statusCode: 400,
          body: `Webhook Error: ${err.message}`,
        };
      }

    // return {
    //   statusCode: 303,
    //   body: JSON.stringify({ received: true }),
    //   headers: {
    //     Location: session.url
        
    //   }
      
    // }
    
  }

// exports.handler = async ({event, body, headers }) => {



//   try {
//     // check the webhook to make sure it’s valid
//     const stripeEvent = stripe.webhooks.constructEvent(
//       body,
//       headers['stripe-signature'],
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     // only do stuff if this is a successful Stripe Checkout purchase
//     if (stripeEvent.type === 'checkout.session.completed') {
      
//       const BASE_URL = "https://toxtat.com/wreckthisbeach/adsup"

//       const {date} = JSON.parse(event.body)

//       return fetch(`${BASE_URL}&date=${date}`)
//       .then(response => {if (!response.ok) 
//         {throw new Error('Network response was not ok');}
//             return response.json()}) 
//             .then(data => {  return {
//               statusCode: 200,
//               body: JSON.stringify(data)}})
//             //   .catch(error => { return {
//             //     statusCode: 500, 
//             //     body: JSON.stringify({error})}})}

//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ received: true }),
//     };
//   } catch (err) {
//     console.log(`Stripe webhook failed with ${err}`);

//     return {
//       statusCode: 400,
//       body: `Webhook Error: ${err.message}`,
//     };
//   }
// };
