'use client';

// TODO:
// Criar paginamento
// Colocar categoria nos posts
// Adicionar filtros e busca
// Integrar com CMS ou sistema de posts

import { BlogPostCard } from "@/components/blogPostCard/blogPostCard";
import { useTranslations } from "next-intl";

export default function BlogPage() {
    const t = useTranslations('blog');

    {/* Placeholder */}
    const posts = [
        {
            slug: 'primeiro-post',
            title: 'Primeiro Post do Blog',
            description: 'Este é o primeiro post do nosso blog. Aqui você encontrará conteúdo interessante e relevante sobre diversos tópicos.',
            date: '2024-11-15',
            image: '/logos/logo.png'
        },
        {
            slug: 'segundo-post',
            title: 'Segundo Post do Blog',
            description: 'Continuamos compartilhando conhecimento e experiências através deste segundo post. Fique atento para mais conteúdo!',
            date: '2024-11-20',
            image: '/logos/logo.png'
        },
        {
            slug: 'terceiro-post',
            title: 'Terceiro Post do Blog',
            description: 'Mais um post repleto de informações úteis e insights valiosos para você. Continue acompanhando!',
            date: '2024-11-25',
            image: '/logos/logo.png'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left column - Posts (70% width) */}
                    <div className="lg:w-[70%]">
                        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blog</h1>
                        
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
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categorias</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Em breve...</p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Posts Recentes</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Em breve...</p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Newsletter</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Em breve...</p>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}