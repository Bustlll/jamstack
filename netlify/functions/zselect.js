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
 
  
   
    try {
    
      
      callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    } catch (error) {
      callback(error)
    }

    

  // Did it work?
  console.log(data, error);
  return {
    statusCode: 200,
  }
}