import { Mail, Phone, Linkedin, Briefcase, Code, GraduationCap, Star, User, Download, Github, ExternalLink, Award, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Footer } from '@/components/Footer/Footer';

const IconText = ({ icon, children, className = "text-gray-600 dark:text-gray-400" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {icon}
    <span className="text-sm">{children}</span>
  </div>
);

const SectionCard = ({ title, icon, children, id }) => (
  <div id={id} className="bg-white dark:bg-zinc-900 mb-4 rounded-md border border-slate-200/70 dark:border-zinc-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in-up">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
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

  return (
    <div className="flex items-start gap-4 p-4 border border-slate-200 dark:border-zinc-800 rounded-md bg-slate-50/60 dark:bg-zinc-900/40 hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-colors duration-200 group">
      {logo && <img src={logo} alt={`${title} logo`} className="w-14 h-14 rounded object-contain bg-white shadow-sm" />}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            {projectUrl ? (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors hover:underline">{title}</h3>
              </a>
            ) : (
              <h3 className="font-bold text-md text-indigo-700 dark:text-indigo-300 transition-colors">{title}</h3>
            )}
            <p className="text-sm text-slate-600 dark:text-zinc-300 mt-1">{description}</p>
          </div>
          <div className="flex gap-2 ml-4">
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

const ExperienceCard = ({ role, company, duration, description, logo }: { role: string; company: string; duration: string; description: string; logo?: string }) => (
  <div className="flex items-start gap-4 p-4 border border-slate-200 dark:border-zinc-800 rounded-md bg-slate-50/60 dark:bg-zinc-900/40 hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-colors duration-200">
    {logo && <img src={logo} alt={`${company} logo`} className="w-14 h-14 rounded object-contain bg-white p-1 shadow-sm" />}
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
    frontend: "bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
    backend: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-200",
    qa: "bg-sky-50 text-sky-900 dark:bg-sky-950/35 dark:text-sky-200",
    devops: "bg-violet-50 text-violet-900 dark:bg-violet-950/35 dark:text-violet-200",
    default: "bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200"
  };

  const colorClass = categoryColors[category] || categoryColors.default;

  return (
    <span className={`text-sm font-medium px-2.5 py-1 rounded ${colorClass} cursor-default`}>
      {children}
    </span>
  );
};

// TODO: Add certificate cards
const CertificateCard = ({ title, issuer, date, credentialId, credentialUrl }) => (
  <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-300 group">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
        <Award className="text-white" size={24} />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-md text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{issuer}</p>
          <div className="flex items-center gap-1 mt-1">
            <Calendar size={14} className="text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
          </div>
          {credentialId && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ID: {credentialId}
            </p>
          )}
        </div>
        {credentialUrl && (
          <a href={credentialUrl} target="_blank" rel="noopener noreferrer"
            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen font-sans pt-20">
      <div className="container mx-auto p-4 md:px-8">
        {/* --- Header --- */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="w-42 h-42 rounded-full mx-auto mb-4 ring-1 ring-slate-200 dark:ring-zinc-800 shadow-sm">
            <Image
              src="/profile_picture.jpg"
              alt={t('profilePictureAlt')}
              width={256}
              height={256}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-zinc-50 mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-700 dark:text-zinc-300 mt-2 font-medium mb-6">
            {t('subtitle')}
          </p>
          <div className="mt-6 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-8">
            <IconText icon={<Mail size={16} />}>
              marcorrditoro@gmail.com
            </IconText>

            <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              <IconText icon={<Github size={16} />} className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                github.com/Frombull
              </IconText>
            </a>

            <a href="https://linkedin.com/in/marcoditoro/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              <IconText icon={<Linkedin size={16} />} className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                linkedin.com/in/marcoditoro
              </IconText>
            </a>

          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Left Column --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* --- About Me --- */}
            <SectionCard title={t('aboutMe')} icon={<User className="text-indigo-600 dark:text-indigo-400" />} id="about">
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                {t('aboutMeP1')}
              </p>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                {t('aboutMeP2')}
              </p>
            </SectionCard>

            {/* --- Professional Experience --- */}
            <SectionCard title={t('professionalExperience')} icon={<Briefcase className="text-indigo-600 dark:text-indigo-400" />} id="experience">
              <ExperienceCard
                role={t('experience1.role')}
                company={t('experience1.company')}
                duration={t('experience1.duration')}
                description={t('experience1.description')}
                logo="/logos/VBL_LOGO_2.png"
              />
              <ExperienceCard
                role={t('experience3.role')}
                company={t('experience3.company')}
                duration={t('experience3.duration')}
                description={t('experience3.description')}
              />
              <ExperienceCard
                role={t('experience2.role')}
                company={t('experience2.company')}
                duration={t('experience2.duration')}
                description={t('experience2.description')}
                logo="/logos/WG_LOGO.jpg"
              />
            </SectionCard>

            {/* --- Projects --- */}
            <SectionCard title={t('projects')} icon={<Code className="text-indigo-600 dark:text-indigo-400" />} id="projects">
              <ProjectCard
                title={t('project5.title')}
                description={t('project5.description')}
                logo="/logos/GROOVETREE_LOGO.jpg"
                githubUrl="https://github.com/Frombull/Groovetree"
                demoUrl="https://groovetr.ee"
              />
              <ProjectCard
                title={t('project1.title')}
                description={t('project1.description')}
                logo="/logos/PIXELFORGE_LOGO.jpg"
                githubUrl="https://github.com/Frombull/PixelForge"
                demoUrl="https://pixelforge3d.com.br"
              />
              <ProjectCard
                title={t('project2.title')}
                description={t('project2.description')}
                logo="/logos/ETE_LOGO.jpg"
                githubUrl="https://github.com/Frombull" // TODO: Add url
                demoUrl="" // TODO: Add url
              />
              <ProjectCard
                title={t('project3.title')}
                description={t('project3.description')}
                logo="/logos/ETE_LOGO.jpg"
                githubUrl="https://github.com/Frombull" // TODO: Add url
                demoUrl="" // TODO: Add url
              />
              <ProjectCard
                title={t('project4.title')}
                description={t('project4.description')}
                logo="/logos/ETE_LOGO.jpg"
                githubUrl="https://github.com/Frombull" // TODO: Add url 
                demoUrl="" // TODO: Add url
              />
            </SectionCard>
          </div>

          {/* --- Right Column --- */}
          <div className="space-y-8">
            {/* --- Interests / Skills --- */}
            <SectionCard title={t('interestsAndSkills')} icon={<Star className="text-indigo-600 dark:text-indigo-400" />} id="skills">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    {t('skills.frontend')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="frontend">Blazor</SkillBadge>
                    <SkillBadge category="frontend">React</SkillBadge>
                    <SkillBadge category="frontend">Next.js</SkillBadge>
                    <SkillBadge category="frontend">Tailwind CSS</SkillBadge>
                    <SkillBadge category="frontend">JavaScript</SkillBadge>
                    <SkillBadge category="frontend">TypeScript</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    {t('skills.backend')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="backend">C#</SkillBadge>
                    <SkillBadge category="backend">ABP Framework</SkillBadge>
                    <SkillBadge category="backend">Python</SkillBadge>
                    <SkillBadge category="backend">Node.js</SkillBadge>
                    <SkillBadge category="backend">SQL Server</SkillBadge>
                    <SkillBadge category="backend">EF Core</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    {t('skills.qaAndTesting')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="qa">{t('skills.unitTesting')}</SkillBadge>
                    <SkillBadge category="qa">Cypress</SkillBadge>
                    <SkillBadge category="qa">Postman</SkillBadge>
                    <SkillBadge category="qa">Selenium</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                    {t('skills.devopsAndCloud')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="devops">Azure</SkillBadge>
                    <SkillBadge category="devops">AWS</SkillBadge>
                    <SkillBadge category="devops">Docker</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                    {t('skills.designPatterns')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="designPatterns">DDD</SkillBadge>
                    <SkillBadge category="designPatterns">Clean Architecture</SkillBadge>
                    <SkillBadge category="designPatterns">MVC</SkillBadge>
                    <SkillBadge category="designPatterns">RESTful APIs</SkillBadge>
                    <SkillBadge category="designPatterns">Scrum/Kanban</SkillBadge>
                    <SkillBadge category="designPatterns">Git</SkillBadge>
                  </div>
                </div>

              </div>
            </SectionCard>

            {/* --- Education --- */}
            <SectionCard title={t('education')} icon={<GraduationCap className="text-indigo-600 dark:text-indigo-400" />} id="education">
              <div>
                <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">{t('education1.degree')}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300">{t('education1.institution')}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{t('education1.period')}</p>
              </div>
              <div className="border-t border-slate-200 dark:border-zinc-800 my-4"></div>
              <div>
                <h3 className="font-bold text-md text-slate-900 dark:text-zinc-50">{t('education2.degree')}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300">{t('education2.institution')}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{t('education2.period')}</p>
              </div>
            </SectionCard>

            {/* --- Languages --- */}
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

            {/* --- LinkedIn QR Code --- */}
            <SectionCard title={t('linkedin')} icon={<Linkedin className="text-indigo-600 dark:text-indigo-400" />} id="linkedin">
              <div className="flex justify-center p-2 rounded-lg">
                <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" title={t('linkedinQRCodeTitle')}>
                  <img
                    src="/qrcode/qr-code.svg"
                    alt={t('linkedinQRCodeAlt')}
                    className="rounded shadow-sm w-36 h-36"
                  />
                </a>
              </div>
            </SectionCard>

            {/* --- Download Resume --- */}
            <div id="contact" className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-slate-200/70 dark:border-zinc-800 shadow-sm animate-fade-in-up">
              <h4 className="font-semibold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
                <Download className="text-indigo-600 dark:text-indigo-400" size={20} />
                {t('contactSection.downloadTitle')}
              </h4>
              <p className="text-sm text-slate-600 dark:text-zinc-300 mb-4">
                {t('contactSection.downloadDescription')}
              </p>
              <a href="/CV_Marco_Di_Toro.pdf" download="CV_Marco_Di_Toro.pdf" className="w-full">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
                  <Download size={18} />
                  {t('contactSection.downloadButton')}
                </button>
              </a>
            </div>
          </div>
        </div>
        <Footer />

      </div>
    </div>
  );
}
