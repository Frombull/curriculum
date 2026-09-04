'use client';

import { Mail, Linkedin, Briefcase, Code, GraduationCap, Star, User, Github, ExternalLink, Award, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Footer } from '@/components/Footer/Footer';
import { useEffect, useRef } from 'react';

// ─── Animation Hook ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const loadAnime = async () => {
      const { animate, stagger } = await import('animejs');

      // Header animation on mount
      animate('.animate-header', {
        opacity: [0, 1],
        translateY: [-24, 0],
        duration: 900,
        easing: 'easeOutExpo',
        delay: stagger(120),
      });

      // Staggered card entrance
      animate('.animate-card', {
        opacity: [0, 1],
        translateY: [32, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: stagger(100, { start: 300 }),
      });

      // Skill badges pop-in
      animate('.skill-badge', {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 400,
        easing: 'easeOutBack',
        delay: stagger(40, { start: 700 }),
      });

      // Scroll reveal observer
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

// ─── Components ────────────────────────────────────────────────────────────────

const IconText = ({ icon, children, className = "text-gray-600 dark:text-gray-400" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {icon}
    <span className="text-sm">{children}</span>
  </div>
);

const SectionCard = ({ title, icon, children, id, className = '' }) => (
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
      <div className="space-y-4">
        {children}
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, description, logo, githubUrl, demoUrl }) => {
  const projectUrl = demoUrl || githubUrl;
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle tilt on hover
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
    const handleEnter = () => { el.style.transition = 'transform 0.1s ease-out'; };
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
    <div ref={cardRef} className="flex items-start gap-4 p-3 rounded-sm hover:bg-slate-50 dark:hover:bg-zinc-800/50 group cursor-default" style={{ willChange: 'transform' }}>
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
                <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors hover:underline">{title}</h3>
              </a>
            ) : (
              <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300">{title}</h3>
            )}
            <p className="text-sm text-slate-600 dark:text-zinc-300 mt-1">{description}</p>
          </div>
          <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors">
                <Github size={16} />
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-indigo-700 dark:text-zinc-500 dark:hover:text-indigo-300 transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({ role, company, duration, description, logo }: {
  role: string; company: string; duration: string; description: string; logo?: string
}) => (
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

const SkillBadge = ({ children, category }) => {
  const categoryColors = {
    frontend: "bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/60",
    backend: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/60",
    qa: "bg-sky-50 text-sky-900 dark:bg-sky-950/35 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/60",
    devops: "bg-violet-50 text-violet-900 dark:bg-violet-950/35 dark:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-900/60",
    default: "bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700"
  };
  const colorClass = categoryColors[category] || categoryColors.default;

  return (
    <span
      className={`skill-badge text-sm font-medium px-2.5 py-1 rounded ${colorClass} cursor-default transition-all duration-200 hover:scale-105 hover:shadow-sm inline-block`}
      style={{ opacity: 0 }}
    >
      {children}
    </span>
  );
};

// Animated underline for the name
const AnimatedName = ({ text }: { text: string }) => {
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
};

// Pulsing avatar ring
const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <div className="animate-header relative w-42 h-42 mx-auto mb-4" style={{ opacity: 0 }}>
    {/* Animated ring */}
    <div className="absolute inset-0 rounded-[2px] animate-pulse-ring border-2 border-indigo-400/40 dark:border-indigo-500/30 scale-105"></div>
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

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const t = useTranslations('HomePage');
  useScrollReveal();

  return (
    <div className="relative bg-slate-50 dark:bg-zinc-950 min-h-screen font-sans pt-20">
      {/* Noise */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.15] dark:opacity-[0.3] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
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
            <IconText icon={<Mail size={16} />}>
              marcorrditoro@gmail.com
            </IconText>
            <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer">
              <IconText icon={<Github size={16} />} className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                github.com/Frombull
              </IconText>
            </a>
            <a href="https://linkedin.com/in/marcoditoro/" target="_blank" rel="noopener noreferrer">
              <IconText icon={<Linkedin size={16} />} className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                linkedin.com/in/marcoditoro
              </IconText>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-8">
            <SectionCard title={t('aboutMe')} icon={<User className="text-indigo-600 dark:text-indigo-400" />} id="about">
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{t('aboutMeP1')}</p>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{t('aboutMeP2')}</p>
            </SectionCard>

            <SectionCard title={t('professionalExperience')} icon={<Briefcase className="text-indigo-600 dark:text-indigo-400" />} id="experience">
              <ExperienceCard role={t('experience4.role')} company={t('experience4.company')} duration={t('experience4.duration')} description={t('experience4.description')} />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ExperienceCard role={t('experience1.role')} company={t('experience1.company')} duration={t('experience1.duration')} description={t('experience1.description')} logo="/logos/VBL_LOGO_2.png" />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ExperienceCard role={t('experience3.role')} company={t('experience3.company')} duration={t('experience3.duration')} description={t('experience3.description')} />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ExperienceCard role={t('experience2.role')} company={t('experience2.company')} duration={t('experience2.duration')} description={t('experience2.description')} logo="/logos/WG_LOGO.jpg" />
            </SectionCard>

            <SectionCard title={t('projects')} icon={<Code className="text-indigo-600 dark:text-indigo-400" />} id="projects">
              <ProjectCard title={t('project1.title')} description={t('project1.description')} logo="/logos/PIXELFORGE_LOGO.jpg" githubUrl="https://github.com/Frombull/PixelForge" demoUrl="https://pixelforge3d.com.br" />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ProjectCard title={t('project5.title')} description={t('project5.description')} logo="/logos/GROOVETREE_LOGO.jpg" githubUrl="https://github.com/Frombull/Groovetree" demoUrl="https://groovetr.ee" />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ProjectCard title={t('project2.title')} description={t('project2.description')} logo="/logos/ETE_LOGO.jpg" githubUrl="https://github.com/Frombull" demoUrl="" />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ProjectCard title={t('project3.title')} description={t('project3.description')} logo="/logos/ETE_LOGO.jpg" githubUrl="https://github.com/Frombull" demoUrl="" />
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <ProjectCard title={t('project4.title')} description={t('project4.description')} logo="/logos/ETE_LOGO.jpg" githubUrl="https://github.com/Frombull" demoUrl="" />
            </SectionCard>
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-8">
            <SectionCard title={t('interestsAndSkills')} icon={<Star className="text-indigo-600 dark:text-indigo-400" />} id="skills">
              <div className="space-y-4">
                {[
                  { key: 'frontend', color: 'bg-red-500', items: [['Blazor', 'frontend'], ['React', 'frontend'], ['Next.js', 'frontend'], ['Tailwind CSS', 'frontend'], ['JavaScript', 'frontend'], ['TypeScript', 'frontend']] },
                  { key: 'backend', color: 'bg-green-500', items: [['C#', 'backend'], ['NestJS', 'backend'], ['Node.js', 'backend'], ['PostgreSQL', 'backend'], ['Prisma', 'backend'], ['EF Core', 'backend'], ['RabbitMQ', 'backend'], ['ABP Framework', 'backend'], ['Python', 'backend'], ['SQL Server', 'backend']] },
                  { key: 'qaAndTesting', color: 'bg-blue-500', items: [[t('skills.unitTesting'), 'qa'], ['Cypress', 'qa'], ['Postman', 'qa'], ['Selenium', 'qa']] },
                  { key: 'devopsAndCloud', color: 'bg-purple-500', items: [['AWS', 'devops'], ['Terraform', 'devops'], ['Docker', 'devops'], ['GitHub Actions', 'devops'], ['Azure', 'devops']] },
                  { key: 'designPatterns', color: 'bg-gray-500', items: [['DDD', 'default'], ['Clean Architecture', 'default'], ['MVC', 'default'], ['RESTful APIs', 'default'], ['MQTT', 'default'], ['Scrum/Kanban', 'default'], ['Git', 'default']] },
                ].map(({ key, color, items }) => (
                  <div key={key}>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <span className={`w-3 h-3 ${color} rounded-full`} />
                      {t(`skills.${key}`)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map(([label, cat]) => (
                        <SkillBadge key={label} category={cat}>{label}</SkillBadge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title={t('education')} icon={<GraduationCap className="text-indigo-600 dark:text-indigo-400" />} id="education">
              <div>
                <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">{t('education1.degree')}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300">{t('education1.institution')}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{t('education1.period')}</p>
              </div>
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />
              <div>
                <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">{t('education2.degree')}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300">{t('education2.institution')}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{t('education2.period')}</p>
              </div>
            </SectionCard>

            <SectionCard title={t('certificates')} icon={<Award className="text-indigo-600 dark:text-indigo-400" />} id="certificates">
              {[t('certificate1.title'), t('certificate2.title')].map((_, i) => {
                const cert = i === 0 ? 'certificate1' : 'certificate2';
                const url = t(`${cert}.credentialUrl`);
                return (
                  <div key={cert}>
                    {i > 0 && <div className="border-t border-slate-200 dark:border-zinc-800 my-4" />}
                    <div className="flex items-start gap-3">
                      <Image src="/logos/MICROSOFT_LOGO.png" alt="Microsoft" width={40} height={40} className="w-10 h-10 rounded object-contain bg-white p-0.5 shadow-sm flex-shrink-0" />
                      <div>
                        {url?.length > 0 ? (
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300 hover:underline">{t(`${cert}.title`)}</h3>
                          </a>
                        ) : (
                          <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">{t(`${cert}.title`)}</h3>
                        )}
                        <p className="text-sm text-slate-600 dark:text-zinc-300">{t(`${cert}.issuer`)}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">{t(`${cert}.date`)}</p>
                        {t(`${cert}.credentialId`)?.length > 0 && (
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">ID: {t(`${cert}.credentialId`)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </SectionCard>

            <SectionCard title={t('languages')} icon={<User className="text-indigo-600 dark:text-indigo-400" />} id="languages">
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

            <SectionCard title={t('linkedin')} icon={<Linkedin className="text-indigo-600 dark:text-indigo-400" />} id="linkedin">
              <div className="flex justify-center p-2 rounded-lg">
                <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" title={t('linkedinQRCodeTitle')}
                  className="hover:scale-105 transition-transform duration-300 block">
                  <Image src="/qrcode/qr-code.svg" alt={t('linkedinQRCodeAlt')} width={144} height={144} className="rounded shadow-sm w-36 h-36" />
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
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 10px) scale(0.97); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.4; transform: scale(1.05); }
          50% { opacity: 0.1; transform: scale(1.08); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
