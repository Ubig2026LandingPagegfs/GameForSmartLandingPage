const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Menggunakan kredensial dari test_supabase.js (atau ganti dengan yang ada di .env)
const supabaseUrl = 'https://humhaknetazvqkovlxdn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWhha25ldGF6dnFrb3ZseGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxOTY0ODUsImV4cCI6MjA3NDc3MjQ4NX0.LU9j-zyUOihFE-MAgXY9-cOBPiVJDGFArH5sLpmOTxw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function importGames() {
    console.log('Membaca data dari games.json...');
    const gamesPath = path.join(__dirname, 'src', 'data', 'games.json');
    const gamesData = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));

    console.log(`Ditemukan ${gamesData.length} game. Memulai proses import...`);

    for (const game of gamesData) {
        // Mapping data dari JSON ke Skema Tabel master_games
        const mappedData = {
            // Karena di tabel master_games ID-nya bertipe text dan ada trigger auto_generate_xid, 
            // kita abaikan pengisian ID dan biarkan database yang meng-generate-nya, 
            // atau jika ingin memaksakan ID dari JSON:
            // id: String(game.id), 
            
            slug: game.slug,
            title: game.title,
            type: game.type || 'game',
            genre: game.genre || null,
            platform: game.platform || null,
            image: game.image || null,
            logo: game.logo || null,
            play_url: game.playUrl || null,
            video_url: game.videoUrl || null,
            description: game.description || null,
            
            // Kolom JSONB, langsung kirim array/object
            features: game.features || [],
            how_to_play: game.howToPlay || [],
            characters_title: game.charactersTitle || null,
            characters: game.characters || [],
            categories: game.categories || [],
            screenshots: game.screenshots || [],
            
            is_favorite: game.isFavorite || false,
            
            // Mengubah format "128" (string) ke 128 (integer) untuk dimapping ke played_count
            played_count: game.players ? parseInt(game.players.replace(/[^0-9]/g, '')) || 0 : 0,
            
            // Kolom status, application, dan hashtags dikosongkan (akan mengikuti default value/null)
        };

        console.log(`Meng-upload: ${mappedData.title}...`);
        
        // Melakukan upsert (insert atau update jika slug sudah ada)
        const { data, error } = await supabase
            .from('master_games')
            .upsert(mappedData, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Gagal meng-upload ${mappedData.title}:`, error.message);
        } else {
            console.log(`✅ Berhasil meng-upload ${mappedData.title}`);
        }
    }
    
    console.log('🎉 Proses import selesai!');
}

importGames();
