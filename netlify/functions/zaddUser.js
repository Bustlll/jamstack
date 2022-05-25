require('dotenv').config();
const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function

exports.handler = async event => {

  function newTime(){
    let a = new Date();
    return a.getTime();
  }

    // let getValueInput = () =>{
    
    // let inputValue = {  cash: 11,
    //                     name: document.getElementById("name").value, 
    //                     instagram: document.getElementById("instagram").value,
    //                     youtube: document.getElementById("youtube").value,
    //                     twitch: document.getElementById("twitch").value,
    //                     reddit: document.getElementById("reddit").value,
    //                     twitter: document.getElementById("twitter").value,
    //                     region: document.getElementById("region").value,
    //                     Date: b.getTime()}
    //                     }
   
     


  // Insert a row
    const { data, error } = await supabase
        .from('users')
        .insert([
         {
            cash: 12,
            name: "ManCOW", 
            instagram: "ManCOW", 
            youtube: "ManCOW", 
            twitch: "ManCOW", 
            reddit: "ManCOW", 
            twitter: "ManCOW", 
            region: "ManCOW", 
            Date: newTime(),
         }
        ]);
  
  // Did it work?
  console.log(data, error);
  return {
    statusCode: 200,
  }
}