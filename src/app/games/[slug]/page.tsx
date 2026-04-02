import { Metadata } from 'next';
import gamesRaw from '@/data/games.json';
import { TournamentInfo } from '@/data/types';
const allItemsData = gamesRaw as TournamentInfo[];
import GameDetailView from "@/components/features/games/game-detail/GameDetailView";
import { notFound } from 'next/navigation';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item || item.type !== 'game') {
        return {
            title: 'Game Not Found | GameForSmart 2026',
        };
    }

    const baseTitle = "GameForSmart 2026";
    const title = `${item.title} | ${baseTitle}`;

    return {
        title: title,
        description: item.description.substring(0, 160),
        openGraph: {
            title: title,
            description: item.description.substring(0, 160),
            images: [item.image],
        },
    };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item || item.type !== 'game') {
        notFound();
    }

    return <GameDetailView game={item} />;
}
