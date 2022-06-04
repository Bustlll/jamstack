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

    const items = lineItems.data;


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
    //     console.log(data);



   
// function supabase, selects name and updates cash with sumed one from stripe + supa before


// const cash = items[0].amount_subtotal/100;
//  const { data: genre_data, error: genre_error } = await supabase
//  .from('users')
//  .select()
//  .eq("name", session.metadata.name)
//     const genre_id = genre_data[0].cash;
   

//     let summed = Number(cash) + Number(genre_id);

//     const { data: book_data, error: book_error } = await supabase
//          .from('users')
//       .update({ cash: summed})
//       .eq('name', session.metadata.name)


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