const fetch = require('node-fetch')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// const queryString = require('query-string');

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
       

 
    
      // function newTime(){
      //   let a = new Date();
      //   return a.getTime();
      // }
    
    
      // // Insert a row
      //   const { data, error } = await supabase
      //       .from('users')
      //       .insert([
      //        {
      //           cash: 12,
      //           name: "ManCOW", 
      //           instagram: "ManCOW", 
      //           youtube: "ManCOW", 
      //           twitch: "ManCOW", 
      //           reddit: "ManCOW", 
      //           twitter: "ManCOW", 
      //           region: "ManCOW", 
      //           Date: newTime(),
      //        }
      //       ]);

            //     fetch(process.env.SUPABASE_UPDATE_CASH + "ManBear", { method: 'get' })
            //   .then(response => response.json())
            //   .then(res => {
            //   console.log(res);
            //   let summed =  res[0].cash + Number(10000/100);
            // let oldData = {
            //         cash: summed,
            //     };
            //     console.log(oldData);
            //     const SUPABASE_UPDATE_CASH = process.env.SUPABASE_UPDATE_CASH + "ManBear";
            //     console.log(SUPABASE_UPDATE_CASH);
            
                  // let xhr = new XMLHttpRequest();
                  //   xhr.open("PATCH", SUPABASE_UPDATE_CASH);
                  //   xhr.setRequestHeader("Accept", "application/json");
                  //   xhr.setRequestHeader("Content-Type", "application/json");
                  //   xhr.send(JSON. stringify(oldData));
           
            // })
            console.log(stripeEvent.data.object.amount_total);
            let summed =  Number(10000/100) + stripeEvent.data.object.amount_total/100
           console.log(summed);
  //           const { data, error } = await supabase
  // .from('users')
  // .update({ cash: 12})
  // .eq('name', 'ManBear')
  //           console.log(data);

            const { data, error } = await supabase
            .from('users')
            .select('cash')
            .eq('name', 'ManBear')
            console.log(data);
           //call the fetch with supabase_update_cash + name from query + get the cash
            //place the cash in a variable and add it to the new cash from query, make it a JSON variable like oldData
            //call another fetch patch and send the oldData variable as JSON
   
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