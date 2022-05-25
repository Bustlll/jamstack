require('dotenv').config();
const {
    SUPAB_DATAB,
    SUPABASE_SERVICE_API_KEY
} = process.env;



// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPAB_DATAB, SUPABASE_SERVICE_API_KEY);
// Our standard serverless handler function

exports.handler = async event => {
  function addCashy(){return 10};
//crear function para comparar dos datas
 
  const { data, error } = await supabase
  .from('users')
  .update({ cash: addCashy()})
  .eq('name', '100K')


  // Did it work?
  console.log({data});
  return {
    statusCode: 200,
  }
}


