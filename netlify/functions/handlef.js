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
    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const items = lineItems.data;

    // console.log(items.cash); //actual cash; new value/old value = supabase old

    // let summed = Number(items.cash) + Number(genre_id);
   

 const { data: genre_data, error: genre_error } = await supabase
      .from('users')
      .select([
        { name: session.metadata.name }
      ]);
    const genre_id = genre_data[0].cash;
    console.log(genre_id);

    // const { data: book_data, error: book_error } = await supabase
    //      .from('users')
    //   .update({ cash: summed})
    //   .eq('name', session.metadata.name)






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







// function getRowOfButtAndAddCash(){

    


//   async function addCash() {
   
//       let storage = 69;
//       const UPDATE_API = 'https://apeowlwfmtpfbuvblclu.supabase.co/rest/v1/users?id=eq.' + localStorage.IDTOT + '&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZW93bHdmbXRwZmJ1dmJsY2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDczOTg4NDEsImV4cCI6MTk2Mjk3NDg0MX0.31WzhEkuIyJLjdAJlAVmTmuOHclgBM8jSjdE0eJnF30' 
//       const SUPABASE_UPDATE_CASH = "https://apeowlwfmtpfbuvblclu.supabase.co/rest/v1/users?id=eq."+ localStorage.IDTOT + "&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZW93bHdmbXRwZmJ1dmJsY2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDczOTg4NDEsImV4cCI6MTk2Mjk3NDg0MX0.31WzhEkuIyJLjdAJlAVmTmuOHclgBM8jSjdE0eJnF30&select=cash"  

      
//   const response = await fetch(SUPABASE_UPDATE_CASH); 
//   const data = await response.json();
//   let summed = Number(data[0].cash) + Number(localStorage.cashy/100);
//   let oldData = {
//           "cash": summed,
//       };
//       let xhr = new XMLHttpRequest();
//           xhr.open("PATCH", UPDATE_API);
//           xhr.setRequestHeader("Accept", "application/json");
//           xhr.setRequestHeader("Content-Type", "application/json");
//           xhr.send(JSON. stringify(oldData));
// }
// addCash();
// }