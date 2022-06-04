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
            name: "Give "+`${name}` + " "`${qt}` + ", Bucks",
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
  })
  return {
    statusCode: 303,
    headers: {
      Location: session.url
      
    }
  }
}
