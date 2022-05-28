exports.handler = async (event, context) => {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    const { data, error } = await supabase
    .from('users')
    .select()
    const data2 = JSON.stringify(data);
    console.log(data2);
  
    return { statusCode: 200 };
}