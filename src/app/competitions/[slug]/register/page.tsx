import { Metadata } from 'next';
import { allItemsData } from '@/data/allItemsData';
import { notFound } from 'next/navigation';
import RegistrationView from "@/components/features/auth/RegistrationView";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item) {
        return {
            title: 'Not Found | GameForSmart 2026',
        };
    }

    return {
        title: `Register: ${item.title} | GameForSmart 2026`,
        description: `Daftar untuk ${item.title} di GameForSmart 2026.`,
    };
}

export default async function RegistrationPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item || item.type === 'game') {
        // We only allow registration for tournaments, not games
        notFound();
    }

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-20 pb-12 px-0 position-relative" style={{ overflow: "visible" }}>
                <Sidebar />
                <article className="main-content w-100">
                    <RegistrationView
                        competitionTitle={item.title}
                        competitionSlug={item.slug}
                        fee={item.ticketFee || 'Free Entry'}
                    />
                </article>
            </main>
            <Footer />
        </>
    );
}
