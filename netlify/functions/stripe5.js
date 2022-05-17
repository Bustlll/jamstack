// Manage your variables with style: https://www.netlify.com/blog/2021/07/12/managing-environment-variables-from-your-terminal-with-netlify-cli/
// const storeItems = new Map([
//   [1, { priceInCents: 1000, name: "10 USD" }],
//   [2, { priceInCents: 2000, name: "20 USD" }],
//   [3, { priceInCents: 5000, name: "50 USD" }],
//   [4, { priceInCents: 10000, name: "100 USD" }],
//   [5, { priceInCents: 50000, name: "500 USD" }],
//   [6, { priceInCents: 100000, name: "1000 USD" }],
//   [7, { priceInCents: 1000000, name: "10000 USD" }],
// ])

// const baseNumebrs = [
//   [{ priceInCents: 1000, }],
//   [{ priceInCents: 2000, }],
//   [{ priceInCents: 5000, }],
//   [{ priceInCents: 10000, }],
//   [{ priceInCents: 50000, }],
//   [{ priceInCents: 100000, }],
//   [{ priceInCents: 1000000, }],
// ];



const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
exports.handler = async (event, context) => {
 
  const session = await stripe.checkout.sessions.create({
    
    payment_method_types: ["card"],
    line_items: [
      
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Supreme, Status Game",
          },
          unit_amount: 50000,
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


// function funSupply() {
//   return session.line_items[{unit_amount}] = localStorage.quantity;

// }