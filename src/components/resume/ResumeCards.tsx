'use client';

import { Briefcase, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, type ReactNode } from 'react';
import { GithubIcon } from '@/components/icons/BrandIcons';
import type { SkillCategory } from '@/data/resume';

export function IconText({
  icon,
  children,
  className = 'text-gray-600 dark:text-gray-400',
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {icon}
      <span className="text-sm">{children}</span>
    </div>
  );
}

export function SectionCard({
  title,
  icon,
  children,
  id,
  className = '',
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`animate-card bg-white dark:bg-zinc-900 mb-4 rounded-[2px] border border-slate-200/70 dark:border-zinc-800 shadow-sm overflow-hidden hover:shadow-md transition-[border-color,box-shadow] duration-75 ${className}`}
      style={{ opacity: 0 }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="[&>svg]:fill-none">{icon}</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function ProjectCard({
  title,
  description,
  logo,
  githubUrl,
  demoUrl,
}: {
  title: string;
  description: string;
  logo?: string;
  githubUrl?: string;
  demoUrl?: string;
}) {
  const projectUrl = demoUrl || githubUrl;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${xPct * 4}deg) rotateX(${-yPct * 4}deg) scale(1.01)`;
    };
    const handleLeave = () => {
      el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    };
    const handleEnter = () => {
      el.style.transition = 'transform 0.1s ease-out';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('mouseenter', handleEnter);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex items-start gap-4 p-3 rounded-sm hover:bg-slate-50 dark:hover:bg-zinc-800/50 group cursor-default"
      style={{ willChange: 'transform' }}
    >
      {logo && (
        <Image
          src={logo}
          alt={`${title} logo`}
          width={56}
          height={56}
          className="w-14 h-14 rounded object-contain bg-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            {projectUrl ? (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors hover:underline">
                  {title}
                </h3>
              </a>
            ) : (
              <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300">{title}</h3>
            )}
            <p className="text-sm text-slate-600 dark:text-zinc-300 mt-1">{description}</p>
          </div>
          <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors"
                aria-label={`${title} GitHub`}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-indigo-700 dark:text-zinc-500 dark:hover:text-indigo-300 transition-colors"
                aria-label={`${title} Demo`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceCard({
  role,
  company,
  duration,
  description,
  logo,
}: {
  role: string;
  company: string;
  duration: string;
  description: string;
  logo?: string;
}) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-sm hover:bg-slate-50 dark:hover:bg-zinc-800/40 group transition-colors duration-200">
      {logo ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          width={56}
          height={56}
          className="w-14 h-14 rounded object-contain bg-white p-1 shadow-sm flex-shrink-0 group-hover:shadow-md transition-shadow duration-200"
        />
      ) : (
        <div className="w-14 h-14 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 shadow-sm text-slate-400 dark:text-zinc-500">
          <Briefcase size={24} />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300">{role}</h3>
        <p className="font-semibold text-slate-800 dark:text-zinc-200">{company}</p>
        <p className="text-xs text-slate-500 dark:text-zinc-400">{duration}</p>
        <p className="text-sm text-slate-600 dark:text-zinc-300 mt-2">{description}</p>
      </div>
    </div>
  );
}

const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
  frontend:
    'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/60',
  backend:
    'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/60',
  qa: 'bg-sky-50 text-sky-900 dark:bg-sky-950/35 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/60',
  devops:
    'bg-violet-50 text-violet-900 dark:bg-violet-950/35 dark:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-900/60',
  default:
    'bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700',
};

export function SkillBadge({
  children,
  category,
}: {
  children: ReactNode;
  category: SkillCategory;
}) {
  const colorClass = SKILL_CATEGORY_COLORS[category] || SKILL_CATEGORY_COLORS.default;

  return (
    <span
      className={`skill-badge text-sm font-medium px-2.5 py-1 rounded ${colorClass} cursor-default transition-all duration-200 hover:scale-105 hover:shadow-sm inline-block`}
      style={{ opacity: 0 }}
    >
      {children}
    </span>
  );
}

export function AnimatedName({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loadAnime = async () => {
      const { animate, stagger } = await import('animejs');
      if (!ref.current) return;
      const chars = ref.current.querySelectorAll('.char');
      animate(chars, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: stagger(30),
      });
    };
    loadAnime();
  }, []);

  return (
    <h1 ref={ref} className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-zinc-50 mb-2">
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="animate-header relative w-42 h-42 mx-auto mb-4" style={{ opacity: 0 }}>
      <div className="absolute inset-0 rounded-[2px] animate-pulse-ring border-2 border-indigo-400/40 dark:border-indigo-500/30 scale-105" />
      <div className="w-full h-full rounded-[2px] ring-1 ring-slate-200 dark:ring-zinc-800 shadow-sm overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={256}
          height={256}
          className="w-full h-full rounded-[2px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}
