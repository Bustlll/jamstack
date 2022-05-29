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
      
      const { name = "Anonymous" } = event.queryStringParameters;
      const { instagram = "Anonymous" } = event.queryStringParameters;
      const { youtube = "Anonymous" } = event.queryStringParameters;
      const { twitch = "Anonymous" } = event.queryStringParameters;
      const { reddit = "Anonymous" } = event.queryStringParameters;
      const { twitter = "Anonymous" } = event.queryStringParameters;
      const { region = "Anonymous" } = event.queryStringParameters;
      const { qt = "Anonymous" } = event.queryStringParameters;
      // console.log(`
      // Hello, ${name},
      // yt, ${youtube},
      // tw, ${twitch},
      // ig, ${instagram},
      // red, ${reddit},
      // tw, ${twitter},
      // reg, ${region}
      // quant, ${qt}
      // `);
      const url = new URL('https://toxtat.com/?name=${name}&instagram=${instagram}&youtube=${youtube}&twitch=${twitch}&reddit=${reddit}&twitter=${twitter}&region=${region}&qt=${qt}');
      const parseParams = (querystring) => {

        // parse query string
        const params = new URLSearchParams(queryString);
    
        const obj = {};
    
        // iterate over all keys
        for (const key of params.keys()) {
            if (params.getAll(key).length > 1) {
                obj[key] = params.getAll(key);
            } else {
                obj[key] = params.get(key);
            }
        }
    
        return obj;
    };
    console.log(parseParams(url.search));
//       const data = queryString.split(" ")
//       const lolly = {
//         data: data
//     };
// console.log(lolly);
  

     
  


      // function newTime(){
      //   let a = new Date();
      //   return a.getTime();
      // }
    

      //   const { data, error } = await supabase
      //       .from('users')
      //       .insert([
      //        {
      //           cash: `${qt}`,
      //           name:  `${name}`,
      //           instagram: `${instagram}`,
      //           youtube: `${youtube}`,
      //           twitch: `${twitch}`,
      //           reddit: `${reddit}`,
      //           twitter: `${twitter}`,
      //           region: `${region}`,
      //           Date: newTime(),
      //        }
      //       ]);

// const { data: genre_data, error: genre_error } = await supabase
// .from('users')
// .select('cash')
// .eq('name', 'ManBear')
// const genre_id = genre_data[0].cash; 
   

// const { data: book_data, error: book_error } = await supabase
// .from('users')
// .update({ cash: genre_id + stripeEvent.data.object.amount_total/100})
// .eq('name', 'ManBear')



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