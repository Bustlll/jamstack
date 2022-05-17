

const finalSupabaseUrl = process.env.FINAL_SUPA;

    



    // const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
    // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    
    
    
    // exports.handler = async ({ headers, body }) => {
    //   try {
    //     const event = stripe.webhooks.constructEvent(
    //       body,
    //       headers['stripe-signature'],
    //       endpointSecret,
    //     );
    
    //     if (event.type !== 'checkout.session.completed') {
    //       return;
    //     }
    
    //     const session = event.data.object;
    
    //     const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    
    //     const items = lineItems.data;
    
    //     insertUser();
    
    //     return {
    //       statusCode: 200,
    //       body: JSON.stringify({ received: true }),
    //     };
    //   } catch (error) {
    //     console.error(error);
    //     return {
    //       statusCode: 400,
    //       body: `WebHook error: ${error.message}`,
    //     };
    //   }
    // };

function insertUser() {
    const userArr = JSON.parse(localStorage.getItem('User'));
    let userDate = JSON.parse(localStorage.getItem("today"))
    let data = {
    "cash": localStorage.cashy/100,
    "name": userArr[0].name,
    "instagram": userArr[0].instagram,
    "youtube": userArr[0].youtube,
    "twitch": userArr[0].twitch,
    "reddit": userArr[0].reddit,
    "twitter": userArr[0].twitter,
    "region": userArr[0].region,
    "Date": parseInt(localStorage.today),
  };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", finalSupabaseUrl);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON. stringify(data));
  }
  


    const stripeKey = process.env.STRIPE_PRIVATE_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const stripe = require('stripe')(stripeKey);



exports.handler = async function (event, context) {
  const { body , headers } = event;
  // console.log({body, headers});

  try {
const stripeEvent = stripe.webhooks.constructEvent(
  body,
  headers["stripe-signature"],
  webhookSecret,
);
if (stripeEvent.type === "checkout-session.completed"){
  const eventObject = stripeEvent.data.object

  const items = await stripe.checkout-session.listLineItems(
    eventObject.id,
    { expand: ["data.price.product"]}
  )

const product = items.data[0]["price"]["product"];
console.log(product);
const filename = product.metadata.filename;
const itemName = product.name;

//fullfillment

const signedUrl = getSignedUrl(filename) 


localStorage.setItem('shots', true);
// insertUser();

}
  } catch(err) {
    console.error('Stripe webhook failed with ${err}.')
    return {
      statusCode: 400,
      body: 'Webhook error: ${err}'
    }
  }
  return {
    statusCode: 200,
  }
};