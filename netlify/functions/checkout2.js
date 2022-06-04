const apiKey = process.env.STRIPE_PRIVATE_KEY
const stripe = require("stripe")(apiKey)


exports.handler = async function(event, context){
  const { name = "Anonymous" } = event.queryStringParameters;
  const { qt = "Anonymous" } = event.queryStringParameters;

  const { instagram = "Anonymous" } = event.queryStringParameters;
  const { youtube = "Anonymous" } = event.queryStringParameters;
  const { twitch = "Anonymous" } = event.queryStringParameters;
  const { reddit = "Anonymous" } = event.queryStringParameters;
  const { twitter = "Anonymous" } = event.queryStringParameters;
  const { region = "Anonymous" } = event.queryStringParameters;

const quanti =  `${qt}` * 100;




function newTime(){
  let a = new Date();
  return a.getTime();
}

//aqui funcionan los event querystring, son reacheables porque vienen de url con event, body

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],
    line_items: [
      
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Give "+`${name}` +`${qt}` + " Bucks",
          },
          unit_amount: quanti,
        },
        quantity: 1,
      },
    ],
    metadata: {cash: `${qt}`,name:`${name}`},

    mode: "payment",
    success_url: "https://toxtat.com",
    cancel_url: "https://toxtat.com/menu.html", 
  }).then(function(result) {
    if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
    } else {
      const event = stripe.webhooks.constructEvent(
        body,
        headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET,
      );
        // The payment has been processed!
        if (event.type !== 'checkout.session.completed') {
          return;
        }
        const cash = items[0].amount_subtotal/100;
 const { data: genre_data, error: genre_error } = await supabase
 .from('users')
 .select()
 .eq("name", session.metadata.name)
    const genre_id = genre_data[0].cash;
   

    let summed = Number(cash) + Number(genre_id);

    const { data: book_data, error: book_error } = await supabase
         .from('users')
      .update({ cash: summed})
      .eq('name', session.metadata.name)

    }
});

return {
  statusCode: 303,
  headers: {
    Location: session.url
    
  }
}
}
 




//func handlef

  // try {
  //   const event = stripe.webhooks.constructEvent(
  //     body,
  //     headers['stripe-signature'],
  //     process.env.STRIPE_WEBHOOK_SECRET,
  //   );

  //   if (event.type !== 'checkout.session.completed') {
  //     return;
  //   }
  //   function newTime(){
  //     let a = new Date();
  //     return a.getTime();
  //   }
  //   const session = event.data.object;

  //   const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  //   const items = lineItems.data;


  //   const { data, error } = await supabase
  //       .from('users')
  //       .insert([
  //        {
  //           cash:  session.metadata.cash, 
  //           name: session.metadata.name, 
  //           instagram:  session.metadata.instagram, 
  //           youtube:  session.metadata.youtube, 
  //           twitch: session.metadata.twitch, 
  //           reddit: session.metadata.reddit, 
  //           twitter:  session.metadata.twitter, 
  //           region: session.metadata.region, 
  //           Date: newTime(),
  //        }
  //       ]);
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


  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ received: true }),
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     statusCode: 400,
  //     body: `WebHook error: ${error.message}`,
  //   };
  // }
