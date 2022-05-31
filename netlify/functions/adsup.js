
const {
  SUPABASE_URL,
  SUPABASE_KEY
} = process.env;






const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);



exports.handler = async event => {

  const { name = "Anonymous" } = event.queryStringParameters;
const { instagram = "Anonymous" } = event.queryStringParameters;
const { youtube = "Anonymous" } = event.queryStringParameters;
const { twitch = "Anonymous" } = event.queryStringParameters;
const { reddit = "Anonymous" } = event.queryStringParameters;
const { twitter = "Anonymous" } = event.queryStringParameters;
const { region = "Anonymous" } = event.queryStringParameters;
const { qt = "Anonymous" } = event.queryStringParameters;


  function newTime(){
    let a = new Date();
    return a.getTime();
  }



    const { data, error } = await supabase
        .from('users')
        .insert([
         {
            cash:  `${qt}`,
            name: `${name}`, 
            instagram:  `${instagram}`, 
            youtube:  `${youtube}`, 
            twitch: `${twitch}`, 
            reddit: `${reddit}`, 
            twitter:  `${twitter}`, 
            region: `${region}`, 
            Date: newTime(),
         }
        ]);
  
  // Did it work?
  console.log(data);

  return {
    statusCode: 200,
  }
}