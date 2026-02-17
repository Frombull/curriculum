import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {
  getBlogPostContent,
  getBlogPostSlugs,
  type BlogLocale,
  type BlogPostBlock
} from '@/content/blog/posts';
import {Link} from '@/i18n/navigation';

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({locale, slug})));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: BlogLocale; slug: string}>;
}) {
  const {locale, slug} = await params;
  const post = getBlogPostContent(locale, slug);

  if (!post) {
    return {
      title: 'Post not found'
    };
  }

  return {
    title: post.title,
    description: post.description
  };
}

function Block({block}: {block: BlogPostBlock}) {
  if (block.type === 'h2') {
    return (
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'p') {
    return <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{block.text}</p>;
  }

  return (
    <figure className="my-6">
      <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900">
        <Image
          src={block.src}
          alt={block.alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">{block.caption}</figcaption>
      )}
    </figure>
  );
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{locale: BlogLocale; slug: string}>;
}) {
  const {locale, slug} = await params;
  const t = await getTranslations('BlogPost');

  const post = getBlogPostContent(locale, slug);
  if (!post) notFound();

  const formatter = new Intl.DateTimeFormat(locale, {dateStyle: 'long'});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('backToBlog')}
          </Link>
        </div>

        <header className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.publishedAt}>{formatter.format(new Date(post.publishedAt))}</time>
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-2">
            {post.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-3">{post.description}</p>
        </header>

        {post.coverImage && (
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-10">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <article className="space-y-5">
          {post.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </article>
      </div>
    </div>
  );
}
