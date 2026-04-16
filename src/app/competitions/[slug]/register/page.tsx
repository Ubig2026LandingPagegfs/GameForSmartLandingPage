import { supabase } from "@/lib/supabase";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RegistrationView from "@/components/features/auth/RegistrationView";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";

async function getCompetitionBySlug(slug: string) {
    const { data } = await supabase.from('competitions').select('*').eq('slug', slug).single();
    if (!data) return null;
    return data;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = await getCompetitionBySlug(params.slug);

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
    const item = await getCompetitionBySlug(params.slug);

    if (!item) {
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
                        competitionSlug={item.id} // Passing REAL UUID to match Database Foreign Key requirement
                        fee={item.registration_fee || 'Free Entry'}
                        availableCategories={item.category}
                    />
                </article>
            </main>
            <Footer />
        </>
    );
}
