import Image from 'next/image';
import {Link} from '@/i18n/navigation';

type Props = {
    slug: string;
    title: string;
    description: string;
    dateISO: string;
    formattedDate: string;
    image?: string;
    imageAlt?: string;
    readMoreLabel: string;
};

export function BlogPostCard({
    slug,
    title,
    description,
    dateISO,
    formattedDate,
    image,
    imageAlt,
    readMoreLabel
}: Props) {
    return (
        <article className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all bg-white dark:bg-gray-800">
            {image && (
                <div className="relative w-full h-48">
                    <Image
                        src={image}
                        alt={imageAlt || title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="object-cover"
                        priority={false}
                    />
                </div>
            )}

            <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={dateISO}>{formattedDate}</time>
                </p>

                <h2 className="text-xl font-semibold mt-1 text-gray-900 dark:text-white">
                    {title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                    {description}
                </p>

                <Link
                    href={`/blog/${slug}`}
                    className="text-blue-600 dark:text-blue-400 font-medium mt-3 inline-block hover:underline"
                >
                    {readMoreLabel}
                </Link>
            </div>
        </article>
    );
}
