const apiKey = process.env.STRIPE_PRIVATE_KEY
const stripe = require("stripe")(apiKey)


exports.handler = async function(event, context){
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
    success_url: "https://toxtat.com",
    cancel_url: "https://toxtat.com/menu.html", 
  })
  return {
    statusCode: 303,
    headers: {
      Location: session.url
      
    }
  }
}
