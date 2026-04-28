import { Metadata } from 'next';
import gamesRaw from '@/data/games.json';
import { TournamentInfo } from '@/data/types';
import GameDetailView from "@/components/features/games/game-detail/GameDetailView";
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const allItemsData = gamesRaw as TournamentInfo[];

// Helper untuk map data Supabase master_games ke tipe TournamentInfo
function mapToTournamentInfo(dbGame: any): TournamentInfo {
    return {
        id: dbGame.id,
        slug: dbGame.slug,
        title: dbGame.title,
        type: dbGame.type || 'game',
        genre: dbGame.genre || 'Uncategorized',
        platform: dbGame.platform || 'Web',
        image: dbGame.image || '',
        logo: dbGame.logo || '',
        playUrl: dbGame.play_url || '',
        videoUrl: dbGame.video_url || '',
        description: dbGame.description || '',
        features: dbGame.features || [],
        howToPlay: dbGame.how_to_play || [],
        charactersTitle: dbGame.characters_title || '',
        characters: dbGame.characters || [],
        categories: dbGame.categories || [],
        screenshots: dbGame.screenshots || [],
        isFavorite: dbGame.is_favorite || false,
        players: String(dbGame.played_count || 0),
        rating: "4.9",
        status: dbGame.status || "Active",
        href: `/games/${dbGame.slug}`
    } as unknown as TournamentInfo;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    
    // Ambil data dari Supabase
    const { data: dbGame } = await supabase
        .from('master_games')
        .select('*')
        .eq('slug', params.slug)
        .single();

    let item;
    if (dbGame) {
        item = mapToTournamentInfo(dbGame);
    } else {
        item = allItemsData.find(
            (t) => t.slug === params.slug || String(t.id) === String(params.slug)
        );
    }

    if (!item || item.type !== 'game') {
        return {
            title: 'Game Not Found | GameForSmart 2026',
        };
    }

    const baseTitle = "GameForSmart 2026";
    const title = `${item.title} | ${baseTitle}`;

    return {
        title: title,
        description: (item.description || '').substring(0, 160),
        openGraph: {
            title: title,
            description: (item.description || '').substring(0, 160),
            images: [item.image],
        },
    };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    console.log("Fetching game from Supabase...");
    const params = await props.params;
    
    // Mengambil data dari tabel master_games di Supabase
    const { data: dbGame, error } = await supabase
        .from('master_games')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!dbGame || error) {
        // Fallback jika tidak ditemukan di Supabase (misal URL /games/6 menggunakan ID statis)
        console.log("Game tidak ditemukan di Supabase, fallback ke JSON statis.");
        const fallbackItem = allItemsData.find(
            (t) => t.slug === params.slug || String(t.id) === String(params.slug)
        );
        
        if (!fallbackItem || fallbackItem.type !== 'game') {
            notFound();
        }
        
        return <GameDetailView game={fallbackItem} />;
    }

    // Mapping data Supabase ke bentuk yang dibutuhkan GameDetailView
    const item = mapToTournamentInfo(dbGame);

    return <GameDetailView game={item} />;
}
