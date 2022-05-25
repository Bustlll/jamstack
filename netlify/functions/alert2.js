

exports.handler = async (event, context) => {

  
    return { statusCode: 200, body: process.env.FINAL_SUPABASE_URL };
  
};