'use client';

import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import Link from "next/link";

export function BlogPostCard({ slug, title, description, date, image }) {
    const t = useTranslations('blogPostCard');
    const locale = useLocale();

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all bg-white dark:bg-gray-800">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
            )}

            <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(date).toLocaleDateString(locale)}
                </p>

                <h2 className="text-xl font-semibold mt-1 text-gray-900 dark:text-white">
                    {title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                    {description}
                </p>

                <Link
                    href={`/${locale}/blog/${slug}`}
                    className="text-blue-600 dark:text-blue-400 font-medium mt-3 inline-block hover:underline"
                >
                    {t('readMore')}
                </Link>
            </div>
        </div>
    );
}
