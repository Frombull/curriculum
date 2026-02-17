import {redirect} from 'next/navigation';
import type {BlogLocale} from '@/content/blog/posts';

export default async function BlogPage({
    params
}: {
    params: Promise<{locale: BlogLocale}>;
}) {
    const {locale} = await params;

    redirect(`/${locale}`);
}