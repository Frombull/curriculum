'use client';

import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Footer } from '@/components/Footer/Footer';

type TimelineSectionProps = {
  title: string;
  children: ReactNode;
  id: string;
  side?: 'left' | 'right';
};

type ExperienceItemProps = {
  role: string;
  company: string;
  duration: string;
  description: string;
  logo?: string;
};

type ProjectItemProps = {
  title: string;
  description: string;
  logo: string;
  githubUrl: string;
  demoUrl?: string;
};

type SkillCategory = 'frontend' | 'backend' | 'qa' | 'devops' | 'default';

function useTimelineProgress() {
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    const timeline = document.querySelector<HTMLElement>('.timeline-flow');
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!timeline) return;
        const rect = timeline.getBoundingClientRect();
        const cursor = window.innerHeight * 0.58;
        const travelled = Math.min(Math.max(cursor - rect.top, 0), rect.height);
        setProgressHeight(travelled);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progressHeight;
}

const TimelineSection = ({ title, children, id, side = 'left' }: TimelineSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -12% 0px' });
  const reduceMotion = useReducedMotion();
  const isVisible = Boolean(reduceMotion || isInView);

  return (
  <motion.section
    ref={sectionRef}
    id={id}
    className="relative grid grid-cols-[62fr_38fr] py-12 max-[900px]:block max-[900px]:py-11 max-[900px]:pl-[3.25rem]"
    data-side={side}
    initial="hidden"
    animate={isVisible ? 'visible' : 'hidden'}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    }}
  >
    <motion.span
      className="absolute left-[62%] top-[3.7rem] z-20 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full border bg-[var(--background)] max-[900px]:left-5 max-[900px]:top-[3.45rem]"
      initial={{ opacity: 0, scale: 0.45 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0.55, scale: 0.72 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.08 }}
      style={{ borderColor: isVisible ? 'rgb(99 102 241)' : undefined, boxShadow: isVisible ? '0 0 0 6px rgb(99 102 241 / 0.12), 0 0 28px rgb(99 102 241 / 0.35)' : undefined }}
      aria-hidden="true"
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-indigo-500"
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1.25 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 16, delay: 0.18 }}
      />
      {isVisible && (
        <motion.span
          className="absolute inset-[-7px] rounded-full border border-indigo-400/60"
          initial={{ opacity: 0.8, scale: 0.8 }}
          animate={reduceMotion ? { opacity: 0, scale: 1 } : { opacity: [0.8, 0], scale: [0.8, 2.3] }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 1.8, repeat: Infinity, repeatDelay: 1.4, ease: 'easeOut' }}
        />
      )}
    </motion.span>
    <motion.div
      className={`${side === 'right' ? 'col-start-2 pl-[clamp(2.5rem,4.5vw,4.5rem)]' : 'col-start-1 pr-[clamp(2.5rem,5vw,5rem)]'} max-[900px]:col-start-1 max-[900px]:p-0`}
      variants={{
        hidden: { opacity: 0, x: side === 'right' ? 28 : -28, y: 12 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <h2 className="mb-6 max-w-xl text-2xl font-semibold tracking-[-0.04em] text-slate-950 md:text-3xl dark:text-white">
        {title}
      </h2>
      <div className="space-y-5 text-[1rem] leading-7 text-slate-600 dark:text-zinc-400">{children}</div>
    </motion.div>
  </motion.section>
  );
};

const ExperienceItem = ({ role, company, duration, description, logo }: ExperienceItemProps) => (
  <article className="stagger-item group grid grid-cols-[2.75rem_1fr] gap-4 border-b border-slate-300/70 py-5 first:pt-0 last:border-0 last:pb-0 dark:border-white/10">
    {logo ? (
      <Image
        src={logo}
        alt={`${company} logo`}
        width={52}
        height={52}
        className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-contain p-1.5 shadow-sm dark:border-white/10"
      />
    ) : (
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
        <Briefcase size={20} />
      </span>
    )}
    <div>
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="font-semibold text-slate-950 dark:text-zinc-100">{role}</h3>
        <time className="shrink-0 font-mono text-xs tracking-wide text-slate-500 dark:text-zinc-500">{duration}</time>
      </div>
      <p className="mb-2 text-sm font-medium text-indigo-700 dark:text-indigo-300">{company}</p>
      <p className="leading-6">{description}</p>
    </div>
  </article>
);

const ProjectItem = ({ title, description, logo, githubUrl, demoUrl }: ProjectItemProps) => {
  const projectUrl = demoUrl || githubUrl;

  return (
    <article className="stagger-item group grid grid-cols-[2.75rem_1fr] gap-4 border-b border-slate-300/70 py-5 first:pt-0 last:border-0 last:pb-0 dark:border-white/10">
      <Image
        src={logo}
        alt={`${title} logo`}
        width={52}
        height={52}
        className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-contain p-1 shadow-sm dark:border-white/10"
      />
      <div>
        <div className="mb-3 flex items-start justify-between gap-4">
          <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2">
            <h3 className="font-semibold text-slate-950 transition-colors group-hover/link:text-indigo-700 dark:text-zinc-100 dark:group-hover/link:text-indigo-300">
              {title}
            </h3>
            <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
          <div className="flex shrink-0 items-center gap-1 text-slate-400 dark:text-zinc-600">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub — ${title}`} className="p-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300">
              <Github size={16} />
            </a>
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${title}`} className="p-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
        <p className="leading-6">{description}</p>
      </div>
    </article>
  );
};

const Skill = ({ children, category }: { children: ReactNode; category: SkillCategory }) => {
  const colors: Record<SkillCategory, string> = {
    frontend: 'border-indigo-300/70 text-indigo-800 dark:border-indigo-500/30 dark:text-indigo-200',
    backend: 'border-emerald-300/70 text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-200',
    qa: 'border-sky-300/70 text-sky-800 dark:border-sky-500/30 dark:text-sky-200',
    devops: 'border-violet-300/70 text-violet-800 dark:border-violet-500/30 dark:text-violet-200',
    default: 'border-slate-300 text-slate-700 dark:border-zinc-700 dark:text-zinc-300',
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${colors[category]}`}>
      {children}
    </span>
  );
};

export default function Home() {
  const t = useTranslations('HomePage');
  const progressHeight = useTimelineProgress();

  const skillGroups: Array<{ key: string; color: string; items: Array<[string, SkillCategory]> }> = [
    { key: 'frontend', color: 'bg-indigo-500', items: [['React', 'frontend'], ['Next.js', 'frontend'], ['TypeScript', 'frontend'], ['Tailwind CSS', 'frontend'], ['JavaScript', 'frontend'], ['Blazor', 'frontend']] },
    { key: 'backend', color: 'bg-emerald-500', items: [['NestJS', 'backend'], ['Node.js', 'backend'], ['PostgreSQL', 'backend'], ['Prisma', 'backend'], ['C#', 'backend'], ['EF Core', 'backend'], ['RabbitMQ', 'backend'], ['Python', 'backend'], ['SQL Server', 'backend'], ['ABP Framework', 'backend']] },
    { key: 'qaAndTesting', color: 'bg-sky-500', items: [[t('skills.unitTesting'), 'qa'], ['Cypress', 'qa'], ['Postman', 'qa'], ['Selenium', 'qa']] },
    { key: 'devopsAndCloud', color: 'bg-violet-500', items: [['AWS', 'devops'], ['Terraform', 'devops'], ['Docker', 'devops'], ['GitHub Actions', 'devops'], ['Azure', 'devops']] },
    { key: 'designPatterns', color: 'bg-slate-500', items: [['DDD', 'default'], ['Clean Architecture', 'default'], ['RESTful APIs', 'default'], ['MQTT', 'default'], ['Scrum/Kanban', 'default'], ['Git', 'default'], ['MVC', 'default']] },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(99,102,241,0.10),transparent_28rem)] dark:bg-[radial-gradient(circle_at_12%_0%,rgba(129,140,248,0.12),transparent_28rem)]" aria-hidden="true" />
      <div className="pointer-events-none fixed left-[12%] top-[-16rem] h-[32rem] w-[32rem] rounded-full bg-indigo-400/10 blur-[110px] dark:bg-indigo-500/10" aria-hidden="true" />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8">
        <section className="flex items-center py-20 md:py-24" aria-labelledby="hero-title">
          <motion.div
            className="grid w-full items-center gap-9 md:grid-cols-[11rem_1fr] md:gap-12 lg:gap-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
            }}
          >
            <motion.div
              className="relative mx-auto md:mx-0"
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            >
              <span className="absolute -left-5 -top-5 h-16 w-16 border-l border-t border-indigo-400/70 dark:border-indigo-500/50" aria-hidden="true" />
              <div className="h-44 w-36 overflow-hidden rounded-[4.5rem_4.5rem_1rem_1rem] border border-slate-300/80 shadow-[0_20px_48px_-28px_rgba(15,23,42,0.55)] dark:border-white/15 dark:shadow-[0_20px_56px_-26px_rgba(0,0,0,0.9)]">
                <Image src="/profile_picture.jpg" alt={t('profilePictureAlt')} width={384} height={480} priority className="h-full w-full object-cover grayscale-[15%]" />
              </div>
              <span className="absolute -bottom-4 -right-5 rounded-full border border-slate-300 bg-[var(--background)] px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-slate-500 dark:border-zinc-700 dark:text-zinc-400">
                BR · 2026
              </span>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.75, ease: 'easeOut' }}>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">
                {t('subtitle2')}
              </p>
              <h1 id="hero-title" className="max-w-4xl text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
                {t('title')}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg dark:text-zinc-400">
                {t('subtitle')}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-zinc-400">
                <a href="mailto:marcorrditoro@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"><Mail size={16} /> Email</a>
                <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"><Github size={16} /> GitHub</a>
                <a href="https://linkedin.com/in/marcoditoro/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"><Linkedin size={16} /> LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <div className="timeline-flow relative">

          <span className="pointer-events-none absolute inset-y-0 left-[62%] z-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent max-[900px]:left-5 dark:via-zinc-700" aria-hidden="true" />
          <motion.span
            className="pointer-events-none absolute left-[62%] top-0 z-10 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-sky-400 max-[900px]:left-5"
            animate={{ height: progressHeight }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            aria-hidden="true"
          />

          <TimelineSection title={t('aboutMe')} id="about">
            <p className="stagger-item text-lg leading-8 text-slate-700 dark:text-zinc-300">{t('aboutMeP1')}</p>
            <p className="stagger-item">{t('aboutMeP2')}</p>
          </TimelineSection>

          <TimelineSection title={t('professionalExperience')} id="experience">
            <ExperienceItem role={t('experience4.role')} company={t('experience4.company')} duration={t('experience4.duration')} description={t('experience4.description')} />
            <ExperienceItem role={t('experience1.role')} company={t('experience1.company')} duration={t('experience1.duration')} description={t('experience1.description')} logo="/logos/VBL_LOGO_2.png" />
            <ExperienceItem role={t('experience3.role')} company={t('experience3.company')} duration={t('experience3.duration')} description={t('experience3.description')} />
            <ExperienceItem role={t('experience2.role')} company={t('experience2.company')} duration={t('experience2.duration')} description={t('experience2.description')} logo="/logos/WG_LOGO.jpg" />
          </TimelineSection>

          <TimelineSection title={t('interestsAndSkills')} id="skills" side="right">
            <div className="space-y-6">
              {skillGroups.map(({ key, color, items }) => (
                <div key={key} className="stagger-item border-t border-slate-300/70 pt-4 first:border-0 first:pt-0 dark:border-white/10">
                  <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-zinc-100">
                    <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                    {t(`skills.${key}`)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map(([label, category]) => <Skill key={label} category={category}>{label}</Skill>)}
                  </div>
                </div>
              ))}
            </div>
          </TimelineSection>

          <TimelineSection title={t('projects')} id="projects">
            <ProjectItem title={t('project1.title')} description={t('project1.description')} logo="/logos/PIXELFORGE_LOGO.jpg" githubUrl="https://github.com/Frombull/PixelForge" demoUrl="https://pixelforge3d.com.br" />
            <ProjectItem title={t('project5.title')} description={t('project5.description')} logo="/logos/GROOVETREE_LOGO.jpg" githubUrl="https://github.com/Frombull/Groovetree" demoUrl="https://groovet.ee" />
            <ProjectItem title={t('project2.title')} description={t('project2.description')} logo="/logos/ETE_LOGO.jpg" githubUrl="https://github.com/Frombull" />
            <ProjectItem title={t('project3.title')} description={t('project3.description')} logo="/logos/ETE_LOGO.jpg" githubUrl="https://github.com/Frombull" />
            <ProjectItem title={t('project4.title')} description={t('project4.description')} logo="/logos/ETE_LOGO.jpg" githubUrl="https://github.com/Frombull" />
          </TimelineSection>

          <TimelineSection title={t('education')} id="education" side="right">
            <div className="stagger-item border-b border-slate-300/70 pb-7 dark:border-white/10">
              <h3 className="font-semibold text-slate-950 dark:text-zinc-100">{t('education1.degree')}</h3>
              <p className="mt-2 text-sm">{t('education1.institution')}</p>
              <p className="mt-2 font-mono text-xs tracking-wide text-slate-500 dark:text-zinc-500">{t('education1.period')}</p>
            </div>
            <div className="stagger-item pt-2">
              <h3 className="font-semibold text-slate-950 dark:text-zinc-100">{t('education2.degree')}</h3>
              <p className="mt-2 text-sm">{t('education2.institution')}</p>
              <p className="mt-2 font-mono text-xs tracking-wide text-slate-500 dark:text-zinc-500">{t('education2.period')}</p>
            </div>
          </TimelineSection>

          <TimelineSection title={t('certificates')} id="certificates">
            {[t('certificate1.title'), t('certificate2.title')].map((_, index) => {
              const cert = index === 0 ? 'certificate1' : 'certificate2';
              const url = t(`${cert}.credentialUrl`);
              return (
                <article key={cert} className="stagger-item grid grid-cols-[2.75rem_1fr] gap-4 border-b border-slate-300/70 py-6 first:pt-0 last:border-0 dark:border-white/10">
                  <Image src="/logos/MICROSOFT_LOGO.png" alt="Microsoft" width={44} height={44} className="h-11 w-11 rounded-lg border border-slate-200 bg-white object-contain p-1 dark:border-white/10" />
                  <div>
                    {url.length > 0 ? (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-slate-950 hover:text-indigo-700 dark:text-zinc-100 dark:hover:text-indigo-300">
                        {t(`${cert}.title`)} <ArrowUpRight size={14} />
                      </a>
                    ) : <h3 className="font-semibold text-slate-950 dark:text-zinc-100">{t(`${cert}.title`)}</h3>}
                    <p className="mt-1 text-sm">{t(`${cert}.issuer`)}</p>
                    <p className="mt-1 font-mono text-xs tracking-wide text-slate-500 dark:text-zinc-500">{t(`${cert}.date`)}</p>
                  </div>
                </article>
              );
            })}
          </TimelineSection>

          <TimelineSection title={t('languages')} id="languages" side="right">
            <div className="stagger-item flex items-center gap-4 border-b border-slate-300/70 pb-5 dark:border-white/10">
              <Image src="/flags/flag_br.svg" alt="Brasil" width={24} height={24} className="rounded-sm" />
              <p className="text-slate-800 dark:text-zinc-200">{t('languagesSection.pt')}</p>
            </div>
            <div className="stagger-item flex items-center gap-4 pt-1">
              <Image src="/flags/flag_us.svg" alt="United States" width={24} height={24} className="rounded-sm" />
              <p className="text-slate-800 dark:text-zinc-200">{t('languagesSection.en')}</p>
            </div>
          </TimelineSection>

          <TimelineSection title={t('contact')} id="contact">
            <div className="stagger-item flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" title={t('linkedinQRCodeTitle')} className="shrink-0 transition-transform duration-300 hover:-translate-y-1">
                <Image src="/qrcode/qr-code.svg" alt={t('linkedinQRCodeAlt')} width={128} height={128} className="h-32 w-32 rounded-xl" />
              </a>
              <div>
                <p className="mb-5 max-w-sm">{t('contactSection.description')}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:marcorrditoro@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-500 hover:text-indigo-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300">
                    <Mail size={16} /> Email
                  </a>
                  <a href="/CV_Marco_Di_Toro.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/15 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                    <FileText size={16} /> {t('contactSection.downloadButton')}
                  </a>
                </div>
              </div>
            </div>
          </TimelineSection>
        </div>
      </main>

      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
