'use client';

// TODO:
// Criar paginamento
// Colocar categoria nos posts
// Adicionar filtros e busca
// Integrar com CMS ou sistema de posts

import { BlogPostCard } from "@/components/blogPostCard/blogPostCard";
import { useTranslations } from "next-intl";

export default function BlogPage() {
    const t = useTranslations('Blog');

    {/* Placeholder */}
    const posts = [
        {
            slug: 'first-post',
            title: 'Title Title Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet risus nec sapien fringilla gravida et vitae enim. Nunc ut mattis lacus.',
            date: '2024-11-15',
            image: '/logos/GROOVETREE_LOGO.jpg'
        },
        {
            slug: 'second-post',
            title: 'Title Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet risus nec sapien fringilla gravida et vitae enim. Nunc ut mattis lacus.',
            date: '2024-11-20',
            image: '/logos/GROOVETREE_LOGO.jpg'
        },
        {
            slug: 'third-post',
            title: 'Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet risus nec sapien fringilla gravida et vitae enim. Nunc ut mattis lacus.',
            date: '2024-11-25',
            image: '/logos/inatel_logo.png'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left column - Posts (70% width) */}
                    <div className="lg:w-[70%]">
                        
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <BlogPostCard
                                    key={post.slug}
                                    slug={post.slug}
                                    title={post.title}
                                    description={post.description}
                                    date={post.date}
                                    image={post.image}
                                />
                            ))}
                        </div>

                        {/* Message when no posts are available */}
                        {posts.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                <p className="text-xl">Nenhum post disponível no momento.</p>
                            </div>
                        )}
                    </div>

                    {/* Right column - Sidebar (30% width) */}
                    <aside className="lg:w-[30%]">
                        <div className="sticky space-y-6" style={{ top: 'calc(var(--header-height) + 1rem)' }}>
                            
                            {/* Placeholder */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('postsRecentes')}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Soon™</p>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}