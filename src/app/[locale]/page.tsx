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
  <div id={id} className="bg-white dark:bg-gray-800/50 mb-4 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 animate-fade-in-up">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
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
    <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-300 group">
      {logo && <img src={logo} alt={`${title} logo`} className="w-14 h-14 rounded-md object-contain bg-white shadow-sm" />}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            {projectUrl ? (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold text-md text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors hover:underline">{title}</h3>
              </a>
            ) : (
              <h3 className="font-bold text-md text-blue-600 dark:text-blue-400 transition-colors">{title}</h3>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
          </div>
          <div className="flex gap-2 ml-4">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <Github size={16} />
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
  <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-300">
    {logo && <img src={logo} alt={`${company} logo`} className="w-14 h-14 rounded-md object-contain bg-white p-1 shadow-sm" />}
    <div className="flex-1">
      <h3 className="font-bold text-md text-blue-600 dark:text-blue-400">{role}</h3>
      <p className="font-semibold text-gray-700 dark:text-gray-200">{company}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{duration}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
    </div>
  </div>
);

const SkillBadge = ({ children, category }) => {
  const categoryColors = {
    frontend: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    backend: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    qa: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    devops: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  };

  const colorClass = categoryColors[category] || categoryColors.default;

  return (
    <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${colorClass} hover:scale-105 transition-transform duration-200 cursor-default`}>
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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans pt-20">
      <div className="container mx-auto p-4 md:px-8">
        {/* --- Header --- */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="w-42 h-42 rounded-full mx-auto mb-4 shadow-lg bg-gradient-to-tr from-blue-400 to-purple-500 hover:scale-101 transition-transform duration-300">
            <Image
              src="/profile_picture.jpg"
              alt={t('profilePictureAlt')}
              width={256}
              height={256}
              className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-600"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-blue-600 dark:text-blue-400 mt-2 font-medium mb-6">
            {t('subtitle')}
          </p>
          <div className="mt-6 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-8">
            <IconText icon={<Mail size={16} />}>
              marco.renzo@ges.inatel.br
            </IconText>

            <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <IconText icon={<Github size={16} />} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                github.com/Frombull
              </IconText>
            </a>

            <a href="https://linkedin.com/in/marcoditoro/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <IconText icon={<Linkedin size={16} />} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                linkedin.com/in/marcoditoro
              </IconText>
            </a>

          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Left Column --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* --- About Me --- */}
            <SectionCard title={t('aboutMe')} icon={<User className="text-blue-500" />} id="about">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('aboutMeP1')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('aboutMeP2')}
              </p>
            </SectionCard>

            {/* --- Professional Experience --- */}
            <SectionCard title={t('professionalExperience')} icon={<Briefcase className="text-blue-500" />} id="experience">
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
            <SectionCard title={t('projects')} icon={<Code className="text-blue-500" />} id="projects">
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
                demoUrl="https://pixelforge-inatel.vercel.app"
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
            <SectionCard title={t('interestsAndSkills')} icon={<Star className="text-blue-500" />} id="skills">
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
                    <SkillBadge category="backend">Python</SkillBadge>
                    <SkillBadge category="backend">Node.js</SkillBadge>
                    <SkillBadge category="backend">SQL Server</SkillBadge>
                    <SkillBadge category="backend">ABP Framework</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    {t('skills.qaAndTesting')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="qa">Cypress</SkillBadge>
                    <SkillBadge category="qa">Postman</SkillBadge>
                    <SkillBadge category="qa">Selenium</SkillBadge>
                    <SkillBadge category="qa">{t('skills.unitTesting')}</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                    {t('skills.devopsAndCloud')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="devops">AWS</SkillBadge>
                    <SkillBadge category="devops">Docker</SkillBadge>
                    <SkillBadge category="devops">Git</SkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                    {t('skills.designPatterns')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge category="designPatterns">MVC</SkillBadge>
                    <SkillBadge category="designPatterns">DDD</SkillBadge>
                    <SkillBadge category="designPatterns">Clean Architecture</SkillBadge>
                    <SkillBadge category="designPatterns">RESTful APIs</SkillBadge>
                  </div>
                </div>

              </div>
            </SectionCard>

            {/* --- Education --- */}
            <SectionCard title={t('education')} icon={<GraduationCap className="text-blue-500" />} id="education">
              <div>
                <h3 className="font-bold text-md text-gray-800 dark:text-white">{t('education1.degree')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('education1.institution')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('education1.period')}</p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <div>
                <h3 className="font-bold text-md text-gray-800 dark:text-white">{t('education2.degree')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('education2.institution')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('education2.period')}</p>
              </div>
            </SectionCard>

            {/* --- Languages --- */}
            <SectionCard title={t('languages')} icon={<User className="text-blue-500" />} id="languages">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Image src="/flags/flag_br.svg" alt="Brazil" width={18} height={18} className="rounded-sm" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{t('languagesSection.pt')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/flags/flag_us.svg" alt="United States" width={18} height={18} className="rounded-sm" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{t('languagesSection.en')}</p>
                </div>
              </div>
            </SectionCard>

            {/* --- LinkedIn QR Code --- */}
            <SectionCard title={t('linkedin')} icon={<Linkedin className="text-blue-500" />} id="linkedin">
              <div className="flex justify-center p-2 rounded-lg">
                <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" title={t('linkedinQRCodeTitle')}>
                  <img
                    src="/qrcode/qr-code.svg"
                    alt={t('linkedinQRCodeAlt')}
                    className="rounded-lg shadow-md w-36 h-36 hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>
            </SectionCard>

            {/* --- Download Resume --- */}
            <div id="contact" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg animate-fade-in-up">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Download className="text-blue-500" size={20} />
                {t('contactSection.downloadTitle')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('contactSection.downloadDescription')}
              </p>
              <a href="/CV_Marco_Di_Toro.pdf" download="CV_Marco_Di_Toro.pdf" className="w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
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
