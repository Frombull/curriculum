'use client';

import {
  Award,
  Briefcase,
  Code,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  Star,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import { Footer } from '@/components/Footer/Footer';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import {
  AnimatedName,
  Avatar,
  ExperienceCard,
  IconText,
  ProjectCard,
  SectionCard,
  SkillBadge,
} from '@/components/resume/ResumeCards';
import {
  CERTIFICATES,
  EDUCATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILL_GROUPS,
} from '@/data/resume';

function useScrollReveal() {
  useEffect(() => {
    const loadAnime = async () => {
      const { animate, stagger } = await import('animejs');

      animate('.animate-header', {
        opacity: [0, 1],
        translateY: [-24, 0],
        duration: 900,
        easing: 'easeOutExpo',
        delay: stagger(120),
      });

      animate('.animate-card', {
        opacity: [0, 1],
        translateY: [32, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: stagger(100, { start: 300 }),
      });

      animate('.skill-badge', {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 400,
        easing: 'easeOutBack',
        delay: stagger(40, { start: 700 }),
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 700,
                easing: 'easeOutExpo',
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        (el as HTMLElement).style.opacity = '0';
        observer.observe(el);
      });
    };

    loadAnime();
  }, []);
}

export default function Home() {
  const t = useTranslations('HomePage');
  useScrollReveal();

  return (
    <div className="relative bg-slate-50 dark:bg-zinc-950 min-h-screen font-sans pt-20">
      {/* Noise */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.15] dark:opacity-[0.3] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto p-4 md:px-8">
        {/* ── Header ── */}
        <header className="text-center mb-12">
          <Avatar src="/profile_picture.jpg" alt={t('profilePictureAlt')} />

          <div className="animate-header" style={{ opacity: 0 }}>
            <AnimatedName text={t('title')} />
          </div>

          <p className="animate-header text-lg text-slate-700 dark:text-zinc-300 mt-2 font-medium" style={{ opacity: 0 }}>
            {t('subtitle')}
          </p>
          <p className="animate-header text-sm text-slate-600 dark:text-zinc-400 mt-2 mb-6" style={{ opacity: 0 }}>
            {t('subtitle2')}
          </p>

          <div className="animate-header mt-6 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-8" style={{ opacity: 0 }}>
            <IconText icon={<Mail size={16} />}>marcorrditoro@gmail.com</IconText>
            <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer">
              <IconText
                icon={<GithubIcon size={16} />}
                className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                github.com/Frombull
              </IconText>
            </a>
            <a href="https://linkedin.com/in/marcoditoro/" target="_blank" rel="noopener noreferrer">
              <IconText
                icon={<LinkedinIcon size={16} />}
                className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                linkedin.com/in/marcoditoro
              </IconText>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-8">
            <SectionCard
              title={t('aboutMe')}
              icon={<User className="text-indigo-600 dark:text-indigo-400" />}
              id="about"
            >
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{t('aboutMeP1')}</p>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{t('aboutMeP2')}</p>
            </SectionCard>

            <SectionCard
              title={t('professionalExperience')}
              icon={<Briefcase className="text-indigo-600 dark:text-indigo-400" />}
              id="experience"
            >
              {EXPERIENCES.map(({ key, logo }, i) => (
                <Fragment key={key}>
                  {i > 0 && <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />}
                  <ExperienceCard
                    role={t(`${key}.role`)}
                    company={t(`${key}.company`)}
                    duration={t(`${key}.duration`)}
                    description={t(`${key}.description`)}
                    logo={logo}
                  />
                </Fragment>
              ))}
            </SectionCard>

            <SectionCard
              title={t('projects')}
              icon={<Code className="text-indigo-600 dark:text-indigo-400" />}
              id="projects"
            >
              {PROJECTS.map(({ key, logo, githubUrl, demoUrl }, i) => (
                <Fragment key={key}>
                  {i > 0 && <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />}
                  <ProjectCard
                    title={t(`${key}.title`)}
                    description={t(`${key}.description`)}
                    logo={logo}
                    githubUrl={githubUrl}
                    demoUrl={demoUrl}
                  />
                </Fragment>
              ))}
            </SectionCard>
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-8">
            <SectionCard
              title={t('interestsAndSkills')}
              icon={<Star className="text-indigo-600 dark:text-indigo-400" />}
              id="skills"
            >
              <div className="space-y-4">
                {SKILL_GROUPS.map(({ key, dotColor, items }) => (
                  <div key={key}>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <span className={`w-3 h-3 ${dotColor} rounded-full`} />
                      {t(`skills.${key}`)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map(({ label, translationKey, category }) => {
                        const text = translationKey ? t(translationKey) : label ?? '';
                        return (
                          <SkillBadge key={text} category={category}>
                            {text}
                          </SkillBadge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title={t('education')}
              icon={<GraduationCap className="text-indigo-600 dark:text-indigo-400" />}
              id="education"
            >
              {EDUCATIONS.map((edu, i) => (
                <Fragment key={edu}>
                  {i > 0 && <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />}
                  <div>
                    <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">{t(`${edu}.degree`)}</h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-300">{t(`${edu}.institution`)}</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">{t(`${edu}.period`)}</p>
                  </div>
                </Fragment>
              ))}
            </SectionCard>

            <SectionCard
              title={t('certificates')}
              icon={<Award className="text-indigo-600 dark:text-indigo-400" />}
              id="certificates"
            >
              {CERTIFICATES.map((cert, i) => {
                const url = t(`${cert}.credentialUrl`);
                return (
                  <div key={cert}>
                    {i > 0 && <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />}
                    <div className="flex items-start gap-3">
                      <Image
                        src="/logos/MICROSOFT_LOGO.png"
                        alt="Microsoft"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded object-contain bg-white p-0.5 shadow-sm flex-shrink-0"
                      />
                      <div>
                        {url?.length > 0 ? (
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300 hover:underline">
                              {t(`${cert}.title`)}
                            </h3>
                          </a>
                        ) : (
                          <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">
                            {t(`${cert}.title`)}
                          </h3>
                        )}
                        <p className="text-sm text-slate-600 dark:text-zinc-300">{t(`${cert}.issuer`)}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">{t(`${cert}.date`)}</p>
                        {t(`${cert}.credentialId`)?.length > 0 && (
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                            ID: {t(`${cert}.credentialId`)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </SectionCard>

            <SectionCard
              title={t('languages')}
              icon={<User className="text-indigo-600 dark:text-indigo-400" />}
              id="languages"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Image src="/flags/flag_br.svg" alt="Brazil" width={18} height={18} className="rounded-sm" />
                  <p className="text-sm text-slate-700 dark:text-zinc-300">{t('languagesSection.pt')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/flags/flag_us.svg" alt="United States" width={18} height={18} className="rounded-sm" />
                  <p className="text-sm text-slate-700 dark:text-zinc-300">{t('languagesSection.en')}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title={t('linkedin')}
              icon={<LinkedinIcon className="text-indigo-600 dark:text-indigo-400" />}
              id="linkedin"
            >
              <div className="flex justify-center p-2 rounded-lg">
                <a
                  href="https://linkedin.com/in/marcoditoro"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t('linkedinQRCodeTitle')}
                  className="hover:scale-105 transition-transform duration-300 block"
                >
                  <Image
                    src="/qrcode/qr-code.svg"
                    alt={t('linkedinQRCodeAlt')}
                    width={144}
                    height={144}
                    className="rounded shadow-sm w-36 h-36"
                  />
                </a>
              </div>
            </SectionCard>

            {/* ── Resume Button ── */}
            <div
              id="contact"
              className="animate-card scroll-reveal bg-white dark:bg-zinc-900 p-6 rounded-sm border border-slate-200/70 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-slate-800 dark:hover:border-zinc-800 transition-[border-color,box-shadow] duration-75"
              style={{ opacity: 0 }}
            >
              <h4 className="font-semibold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
                <FileText className="text-indigo-600 dark:text-indigo-400" size={20} />
                {t('contactSection.downloadTitle')}
              </h4>
              <a href="/CV_Marco_Di_Toro.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-2 px-4 rounded-[2px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:shadow-md hover:shadow-indigo-500/20">
                  <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  {t('contactSection.downloadButton')}
                </button>
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.4; transform: scale(1.05); }
          50% { opacity: 0.1; transform: scale(1.08); }
        }
        .animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
