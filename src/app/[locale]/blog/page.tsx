import {BlogPostCard} from '@/components/blogPostCard/blogPostCard';
import {getTranslations} from 'next-intl/server';
import {getBlogPostSummaries, type BlogLocale} from '@/content/blog/posts';

export default async function BlogPage({
    params
}: {
    params: Promise<{locale: BlogLocale}>;
}) {
    const {locale} = await params;
    const t = await getTranslations('Blog');
    const tCard = await getTranslations('blogPostCard');

    const posts = getBlogPostSummaries(locale);
    const formatter = new Intl.DateTimeFormat(locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-[70%]">
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <BlogPostCard
                                    key={post.slug}
                                    slug={post.slug}
                                    title={post.title}
                                    description={post.description}
                                    dateISO={post.publishedAt}
                                    formattedDate={formatter.format(new Date(post.publishedAt))}
                                    image={post.image}
                                    imageAlt={post.imageAlt}
                                    readMoreLabel={tCard('readMore')}
                                />
                            ))}
                        </div>

                        {posts.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                <p className="text-xl">{t('empty')}</p>
                            </div>
                        )}
                    </div>

                    <aside className="lg:w-[30%]">
                        <div className="sticky space-y-6" style={{top: 'calc(var(--header-height) + 1rem)'}}>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                    {t('postsRecentes')}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{t('sidebarSoon')}</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}