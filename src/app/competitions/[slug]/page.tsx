import { Metadata } from 'next';
import competitionsRaw from '@/data/competitions.json';
import { TournamentInfo } from '@/data/types';
const allItemsData = competitionsRaw as TournamentInfo[];
import CompetitionDetailView from "@/components/features/competitions/detail/CompetitionDetailView";
import { notFound } from 'next/navigation';

interface Props {
    params: { slug: string };
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item) {
        return {
            title: 'Item Not Found | GameForSmart 2026',
        };
    }

    const baseTitle = "GameForSmart 2026";
    let title = "";

    if (item.type === 'game') {
        title = `${item.title} | ${baseTitle}`;
    } else {
        // Special mapping for tournaments
        if (item.slug === 'malang-raya') {
            title = `Malang Raya Competition | ${baseTitle}`;
        } else if (item.slug === 'jawa-timur') {
            title = `Jawa Timur Competition | ${baseTitle}`;
        } else if (item.slug === 'nasional') {
            title = `National Competition | ${baseTitle}`;
        } else {
            title = `${item.title} Competition | ${baseTitle}`;
        }
    }

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

    if (!item) {
        notFound();
    }

    return <CompetitionDetailView tournament={item} />;
}
