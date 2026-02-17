export type BlogLocale = 'pt' | 'en';

export type BlogPostBlock =
  | {type: 'p'; text: string}
  | {type: 'h2'; text: string}
  | {type: 'image'; src: string; alt: string; caption?: string};

export type BlogPost = {
  slug: string;
  publishedAt: string; // ISO (YYYY-MM-DD)
  coverImage?: {src: string; alt: string};
  title: Record<BlogLocale, string>;
  description: Record<BlogLocale, string>;
  content: Record<BlogLocale, BlogPostBlock[]>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'bem-vindo-ao-blog',
    publishedAt: '2026-01-29',
    coverImage: {
      src: '/logos/GROOVETREE_LOGO.jpg',
      alt: 'Logo',
    },
    title: {
      pt: 'Bem-vindo ao meu blog',
      en: 'Welcome to my blog',
    },
    description: {
      pt: 'Um post simples só para começar — com texto e imagem.',
      en: 'A simple starter post — with text and an image.',
    },
    content: {
      pt: [
        {type: 'p', text: 'Criei esta área do blog para postar textos curtos e imagens enquanto eu ainda estou montando o site.'},
        {type: 'p', text: 'A ideia aqui é manter tudo bem simples por enquanto: cada post é um arquivo (um objeto) com título, descrição, data e blocos de conteúdo.'},
        {type: 'image', src: '/logos/GROOVETREE_LOGO.jpg', alt: 'Imagem de exemplo', caption: 'Imagem de exemplo usando arquivos em /public.'},
        {type: 'h2', text: 'Próximos passos'},
        {type: 'p', text: 'Depois dá para evoluir isso para Markdown/MDX, CMS, categorias, busca e etc.'},
      ],
      en: [
        {type: 'p', text: 'I created this blog area to post short texts and images while the site is still evolving.'},
        {type: 'p', text: 'For now it is intentionally simple: each post is an object with title, description, date and content blocks.'},
        {type: 'image', src: '/logos/GROOVETREE_LOGO.jpg', alt: 'Example image', caption: 'Example image served from /public.'},
        {type: 'h2', text: 'Next steps'},
        {type: 'p', text: 'Later we can upgrade this to Markdown/MDX, a CMS, categories, search, etc.'},
      ],
    },
  },
  {
    slug: 'sobre-este-site',
    publishedAt: '2026-01-20',
    coverImage: {
      src: '/logos/inatel_logo.png',
      alt: 'Inatel logo',
    },
    title: {
      pt: 'Sobre este site',
      en: 'About this site',
    },
    description: {
      pt: 'Notas rápidas sobre o que estou construindo e por quê.',
      en: 'Quick notes on what I am building and why.',
    },
    content: {
      pt: [
        {type: 'p', text: 'Este post é só um exemplo de como adicionar mais conteúdo sem complicar.'},
        {type: 'p', text: 'Para criar um novo post: copie um desses objetos em posts.ts, troque o slug, título, descrição e os blocos.'},
        {type: 'image', src: '/logos/inatel_logo.png', alt: 'Logo Inatel', caption: 'Outra imagem de exemplo.'},
      ],
      en: [
        {type: 'p', text: 'This post is just an example of how to add more content without making things complex.'},
        {type: 'p', text: 'To create a new post: copy one of these objects in posts.ts, change the slug, title, description and blocks.'},
        {type: 'image', src: '/logos/inatel_logo.png', alt: 'Inatel logo', caption: 'Another example image.'},
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostSummaries(locale: BlogLocale) {
  return blogPosts
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map((p) => ({
      slug: p.slug,
      title: p.title[locale],
      description: p.description[locale],
      publishedAt: p.publishedAt,
      image: p.coverImage?.src,
      imageAlt: p.coverImage?.alt,
    }));
}

export function getBlogPostContent(locale: BlogLocale, slug: string) {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;

  return {
    slug: post.slug,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    title: post.title[locale],
    description: post.description[locale],
    blocks: post.content[locale],
  };
}
