const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
exports.handler = async (event, context) => {
 
  const session = await stripe.checkout.sessions.create({
    
    payment_method_types: ["card"],
    line_items: [
      
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "GOD, Status Game",
          },
          unit_amount: 10000000,
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
