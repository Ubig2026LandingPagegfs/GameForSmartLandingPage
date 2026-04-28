import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import blogDataRaw from '@/data/blog.json';
import { BlogPost } from '@/data/types';
import BlogDetailView from '@/components/features/blog/BlogDetailView';

const fallbackData = blogDataRaw as unknown as BlogPost[];

// Server-side Supabase client (tidak perlu auth session)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'PUBLISHED')
            .single();

        if (data && !error) {
            return data as BlogPost;
        }
    } catch (err) {
        console.error('getBlogBySlug: Supabase fetch failed, using fallback', err);
    }

    // Fallback ke JSON lokal
    const fallbackPost = fallbackData.find((p) => p.slug === slug);
    return fallbackPost || null;
}

async function getRelatedBlogs(currentId: string, limit: number = 5): Promise<BlogPost[]> {
    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('status', 'PUBLISHED')
            .neq('id', currentId)
            .order('published_at', { ascending: false })
            .limit(limit);

        if (data && !error && data.length > 0) {
            return data as BlogPost[];
        }
    } catch (err) {
        console.error('getRelatedBlogs: Supabase fetch failed, using fallback', err);
    }

    // Fallback ke JSON lokal
    return fallbackData.filter((p) => p.id !== currentId).slice(0, limit);
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = await getBlogBySlug(params.slug);

    if (!post) {
        return {
            title: 'Halaman Tidak Ditemukan | GameForSmart',
        };
    }

    const baseTitle = "GameForSmart";
    const title = `${post.title} | ${baseTitle}`;

    return {
        title: title,
        description: post.excerpt,
        openGraph: {
            title: title,
            description: post.excerpt,
            images: post.image ? [post.image] : [],
            type: 'article',
        },
    };
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getBlogBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedBlogs(post.id);

    return <BlogDetailView post={post} relatedPosts={relatedPosts} />;
}
