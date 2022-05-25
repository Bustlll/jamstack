const apiKey = process.env.STRIPE_PRIVATE_KEY
const stripe = require("stripe")(apiKey)

exports.handler = async function(event, context){
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
            name: "Gold Nova 1, Toxtat Game",
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    
    mode: "payment",
    success_url: "https://toxtat.com",
    cancel_url: "https://toxtat.com", 
  })
  return {
    statusCode: 303,
    headers: {
      Location: session.url
    }
  }
}

