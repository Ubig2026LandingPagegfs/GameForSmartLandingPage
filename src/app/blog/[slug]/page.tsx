import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import blogDataRaw from '@/data/blog.json';
import { BlogPost } from '@/data/types';
const blogData = blogDataRaw as BlogPost[];
import BlogDetailView from '@/components/features/blog/BlogDetailView';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = blogData.find((p) => p.slug === params.slug);

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
            images: [post.image],
            type: 'article',
        },
    };
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = blogData.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return <BlogDetailView post={post} />;
}
