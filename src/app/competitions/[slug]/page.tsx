import { Metadata } from 'next';
import CompetitionDetailView from "@/components/features/competitions/detail/CompetitionDetailView";
import { supabase } from "@/lib/supabase";
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
    params: { slug: string };
}

async function getCompetitionBySlug(slug: string) {
    const { data } = await supabase.from('competitions').select('*').eq('slug', slug).single();
    if (!data) return null;
    
    const formatDateRange = (startStr: string | null, endStr: string | null) => {
      if (!startStr && !endStr) return "Sesuai Jadwal";
      try {
        const startObj = startStr ? new Date(startStr) : null;
        const endObj = endStr ? new Date(endStr) : null;
        
        if (startObj && endObj) {
            const startMonth = startObj.toLocaleString('id-ID', { month: 'long' });
            const startYear = startObj.getFullYear();
            const endMonth = endObj.toLocaleString('id-ID', { month: 'long' });
            const endYear = endObj.getFullYear();
            
            if (startYear === endYear) {
               if (startMonth === endMonth) {
                  return `${startMonth} ${startYear}`;
               }
               return `${startMonth} - ${endMonth} ${startYear}`;
            }
            return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
        }
        if (startObj) return `${startObj.toLocaleString('id-ID', { month: 'long' })} ${startObj.getFullYear()}`;
        return "Sesuai Jadwal";
      } catch (e) {
         return "Sesuai Jadwal";
      }
    };

    // Map to TournamentInfo
    return {
        id: data.id,
        type: data.category || 'Educational',
        title: data.title,
        subtitle: "Ajang Prestasi",
        image: data.poster_url || "/images/competitions/nasional.webp",
        prizeMoney: data.prize_pool || "Lihat Detail",
        ticketFee: data.registration_fee || "Free Entry",
        date: formatDateRange(data.qualification_start_date || data.registration_start_date, data.final_end_date || data.qualification_end_date || data.registration_end_date),
        teams: "Peserta Terbatas",
        players: "100",
        platform: "Web",
        rating: "5.0",
        genre: data.category || 'Educational',
        description: data.description || "Kompetisi terbaru",
        status: data.status === "published" ? "Active" : (data.status === "coming_soon" ? "Coming Soon" : "Upcoming"),
        slug: data.slug,
        href: `/competitions/${data.slug}`,
        finalRound: "TBA",
        rules: data.rules || [],
        prizes: []
    } as any;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = await getCompetitionBySlug(params.slug);

    if (!item) {
        return {
            title: 'Item Not Found | GameForSmart 2026',
        };
    }

    return {
        title: `${item.title} | GameForSmart 2026`,
        description: item.description.substring(0, 160),
        openGraph: {
            title: `${item.title} | GameForSmart 2026`,
            description: item.description.substring(0, 160),
            images: [item.image],
        },
    };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const item = await getCompetitionBySlug(params.slug);

    if (!item) {
        notFound();
    }

    return <CompetitionDetailView tournament={item} />;
}
