const apiKey = process.env.STRIPE_PRIVATE_KEY
const stripe = require("stripe")(apiKey)




exports.handler = async function(event, context){
  const { name = "Anonymous" } = event.queryStringParameters;
  const { qt = "Anonymous" } = event.queryStringParameters;
const quanti =  `${qt}` * 100;
  // const referer = event.handler.referer
  // const params = new URLSearchParams(event.body)
  // const price_id = params.get("price_id")

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],
    line_items: [
      
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Welcome to Toxtat, " + `${name}`,
          },
          unit_amount: quanti,
        },
        quantity: 1,
      },
    ],
    
    mode: "payment",
    success_url: "https://toxtat.com/api/checkou?name=${name}&instagram=${instagram}&youtube=${youtube}&twitch=${twitch}&reddit=${reddit}&twitter=${twitter}&region=${region}&qt=${qt}",
    cancel_url: "https://toxtat.com", 
  })
  return {
    statusCode: 303,
    headers: {
      Location: session.url
      
    }
  }
}
