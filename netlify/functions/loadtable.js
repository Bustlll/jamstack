exports.handler = async (event, context) => {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    const { data, error } = await supabase
    .from('users')
    .select()

  
  
    return { statusCode: 200,};
}