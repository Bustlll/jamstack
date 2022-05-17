

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
exports.handler = async (event, context) => {
 
  const session = await stripe.checkout.sessions.create({
    
    payment_method_types: ["card"],
    line_items: [
      
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Plebs, Status Game",
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    
    mode: "payment",
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),

    
  };
  
  
};

// if(session.cancel_url == true){session.cancel_url= "https://6271fc6b9edefc3d1e3a3815--lasttrythefuck.netlify.app/loaded.html", alert("hehexd")}



// stripe.retrievePaymentIntent(clientSecret).then(function(response) {
//   if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
//     // Handle successful payment here
//   } else {
//     // Handle unsuccessful, processing, or canceled payments and API errors here
//   }
// })

