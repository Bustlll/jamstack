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
      const parsed = queryString.parseUrl();
      console.log(parsed);
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