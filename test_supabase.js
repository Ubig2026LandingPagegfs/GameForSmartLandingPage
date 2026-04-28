const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://humhaknetazvqkovlxdn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWhha25ldGF6dnFrb3ZseGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxOTY0ODUsImV4cCI6MjA3NDc3MjQ4NX0.LU9j-zyUOihFE-MAgXY9-cOBPiVJDGFArH5sLpmOTxw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    const slug = 'cerdas-cermat-online-malang-raya';
    const { data, error } = await supabase.from('competitions').select('*').eq('slug', slug).single();
    console.log('Result:', data ? data.slug : null, error);
}

test();
