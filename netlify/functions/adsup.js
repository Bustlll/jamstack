
// const {
//     DATABASE_URL,
//     SUPABASE_SERVICE_API_KEY
// } = process.env;





// // Connect to our database 
// const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function

exports.handler = async event => {

  const { name = "Anonymous" } = event.queryStringParameters;
const { instagram = "Anonymous" } = event.queryStringParameters;
const { youtube = "Anonymous" } = event.queryStringParameters;
const { twitch = "Anonymous" } = event.queryStringParameters;
const { reddit = "Anonymous" } = event.queryStringParameters;
const { twitter = "Anonymous" } = event.queryStringParameters;
const { region = "Anonymous" } = event.queryStringParameters;
const { qt = "Anonymous" } = event.queryStringParameters;
console.log(`
Hello, ${name},
yt, ${youtube},
tw, ${twitch},
ig, ${instagram},
red, ${reddit},
tw, ${twitter},
reg, ${region}
quant, ${qt}
`);


  // function newTime(){
  //   let a = new Date();
  //   return a.getTime();
  // }


  // Insert a row
    // const { data, error } = await supabase
    //     .from('users')
    //     .insert([
    //      {
    //         cash: 12,
    //         name: "ManCOW", 
    //         instagram: "ManCOW", 
    //         youtube: "ManCOW", 
    //         twitch: "ManCOW", 
    //         reddit: "ManCOW", 
    //         twitter: "ManCOW", 
    //         region: "ManCOW", 
    //         Date: newTime(),
    //      }
    //     ]);
  
  // Did it work?

  return {
    statusCode: 200,
  }
}