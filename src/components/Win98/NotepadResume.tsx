'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import {
  CERTIFICATES,
  EDUCATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILL_GROUPS,
} from '@/data/resume';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  ComputerIcon,
  GlobeShortcutIcon,
  NotepadIcon,
  PdfShortcutIcon,
  SmallFileIcon,
} from './Win98Icons';
import { Win98Window } from './Win98Window';

type TabId =
  | 'curriculum.md'
  | 'experience.log'
  | 'projects.cs'
  | 'skills.json'
  | 'education.txt'
  | 'contact.bmp';

const TABS: { id: TabId; color: string }[] = [
  { id: 'curriculum.md', color: '#000080' },
  { id: 'experience.log', color: '#008000' },
  { id: 'projects.cs', color: '#800080' },
  { id: 'skills.json', color: '#cc6600' },
  { id: 'education.txt', color: '#008080' },
  { id: 'contact.bmp', color: '#cc0000' },
];

const TAB_LINE_COUNTS: Record<TabId, number> = {
  'curriculum.md': 64,
  'experience.log': 32,
  'projects.cs': 32,
  'skills.json': 44,
  'education.txt': 32,
  'contact.bmp': 28,
};

type MenuKey = 'file' | 'edit' | 'view' | 'language' | 'help' | null;

export function NotepadResume() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isPt = locale === 'pt';

  const [activeTab, setActiveTab] = useState<TabId>('curriculum.md');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onToggleMinimize = () => setIsMinimized((v) => !v);
    window.addEventListener('win98-toggle-minimize', onToggleMinimize);
    return () => window.removeEventListener('win98-toggle-minimize', onToggleMinimize);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [openMenu]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('marcorrditoro@gmail.com');
      setStatusNote(isPt ? 'Email copiado!' : 'Email copied to clipboard!');
      window.setTimeout(() => setStatusNote(null), 2500);
    } catch {
      setStatusNote('marcorrditoro@gmail.com');
    }
    setOpenMenu(null);
  };

  const handleSwitchLocale = (nextLocale: string) => {
    setOpenMenu(null);
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    }
  };

  const statusText = `UTF-8  |  Windows (CR LF)  |  ${activeTab}  |  ${
    statusNote ?? (isPt ? 'Pronto' : 'Ready')
  }`;

  const lineCount = TAB_LINE_COUNTS[activeTab];

  return (
    <div className="min-h-screen pb-12 pt-3 px-2 sm:px-4 md:px-6 flex flex-col lg:flex-row items-start gap-4">
      {/* Desktop Shortcuts (left column on desktop) */}
      <aside
        aria-label="Desktop shortcuts"
        className="no-print hidden lg:flex flex-col gap-4 w-24 shrink-0 pt-1 select-none"
      >
        <button
          type="button"
          onClick={() => setAboutOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-white hover:bg-[#000080]/50 focus:outline-1 focus:outline-dotted focus:outline-white cursor-pointer"
        >
          <ComputerIcon className="w-8 h-8" />
          <span className="font-win98 text-[11px] leading-tight text-center drop-shadow-[1px_1px_0_#000]">
            {isPt ? 'Meu Computador' : 'My Computer'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            setActiveTab('curriculum.md');
          }}
          className="flex flex-col items-center gap-1 p-1 text-white hover:bg-[#000080]/50 focus:outline-1 focus:outline-dotted focus:outline-white cursor-pointer"
        >
          <NotepadIcon className="w-8 h-8" />
          <span className="font-win98 text-[11px] leading-tight text-center drop-shadow-[1px_1px_0_#000]">
            curriculum.md
          </span>
        </button>

        <a
          href="/CV_Marco_Di_Toro.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-1 text-white hover:bg-[#000080]/50"
        >
          <PdfShortcutIcon className="w-8 h-8" />
          <span className="font-win98 text-[11px] leading-tight text-center drop-shadow-[1px_1px_0_#000]">
            CV_Marco.pdf
          </span>
        </a>

        <a
          href="https://github.com/Frombull"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-1 text-white hover:bg-[#000080]/50"
        >
          <GlobeShortcutIcon className="w-8 h-8" />
          <span className="font-win98 text-[11px] leading-tight text-center drop-shadow-[1px_1px_0_#000]">
            GitHub.url
          </span>
        </a>

        <a
          href="https://linkedin.com/in/marcoditoro/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-1 text-white hover:bg-[#000080]/50"
        >
          <GlobeShortcutIcon className="w-8 h-8" />
          <span className="font-win98 text-[11px] leading-tight text-center drop-shadow-[1px_1px_0_#000]">
            LinkedIn.url
          </span>
        </a>
      </aside>

      {/* Main Notepad++ / Win98 Window */}
      <div
        className={`flex-1 w-full ${
          isMaximized ? 'max-w-none' : 'max-w-5xl mx-auto'
        }`}
      >
        {isMinimized ? (
          <div className="win98-outset p-6 max-w-md mx-auto mt-12 text-center font-win98">
            <p className="text-sm mb-4">
              {isPt
                ? 'A janela do Notepad++ foi minimizada.'
                : 'The Notepad++ window has been minimized.'}
            </p>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="win98-btn px-4 py-1.5 text-xs font-bold"
            >
              {isPt ? 'Restaurar Janela' : 'Restore Window'}
            </button>
          </div>
        ) : (
          <Win98Window
            title={`${activeTab} - Notepad++ [Win98 Edition]`}
            statusText={statusText}
            isMaximized={isMaximized}
            onMinimize={() => setIsMinimized(true)}
            onMaximize={() => setIsMaximized((v) => !v)}
            onClose={() => setIsMinimized(true)}
          >
            {/* Menu Bar */}
            <div
              ref={menuBarRef}
              className="no-print relative flex flex-wrap items-center gap-0.5 px-1 py-0.5 text-xs font-win98 border-b border-[var(--win-border-dark)] select-none"
            >
              {/* File */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    openMenu === 'file'
                      ? 'bg-[#000080] text-white'
                      : 'hover:bg-[#000080] hover:text-white'
                  }`}
                >
                  {isPt ? 'Arquivo' : 'File'}
                </button>
                {openMenu === 'file' && (
                  <div className="win98-outset absolute left-0 top-full mt-0.5 w-48 py-1 z-40 shadow-md">
                    <a
                      href="/CV_Marco_Di_Toro.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpenMenu(null)}
                      className="block px-3 py-1 hover:bg-[#000080] hover:text-white"
                    >
                      {isPt ? 'Abrir CV (PDF)...' : 'Open CV (PDF)...'}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(null);
                        window.print();
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {isPt ? 'Imprimir...' : 'Print...'}
                    </button>
                    <div className="border-t border-[var(--win-border-dark)] my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(null);
                        setIsMinimized(true);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {isPt ? 'Minimizar' : 'Minimize'}
                    </button>
                  </div>
                )}
              </div>

              {/* Edit */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    openMenu === 'edit'
                      ? 'bg-[#000080] text-white'
                      : 'hover:bg-[#000080] hover:text-white'
                  }`}
                >
                  {isPt ? 'Editar' : 'Edit'}
                </button>
                {openMenu === 'edit' && (
                  <div className="win98-outset absolute left-0 top-full mt-0.5 w-52 py-1 z-40 shadow-md">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {isPt ? 'Copiar Email' : 'Copy Email'}
                    </button>
                  </div>
                )}
              </div>

              {/* View */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'view' ? null : 'view')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    openMenu === 'view'
                      ? 'bg-[#000080] text-white'
                      : 'hover:bg-[#000080] hover:text-white'
                  }`}
                >
                  {isPt ? 'Exibir' : 'View'}
                </button>
                {openMenu === 'view' && (
                  <div className="win98-outset absolute left-0 top-full mt-0.5 w-52 py-1 z-40 shadow-md">
                    <button
                      type="button"
                      onClick={() => {
                        setShowLineNumbers((v) => !v);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {showLineNumbers ? '✓ ' : '   '}
                      {isPt ? 'Números de Linha' : 'Line Numbers'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMaximized((v) => !v);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {isMaximized
                        ? isPt
                          ? 'Restaurar Janela'
                          : 'Restore Window'
                        : isPt
                          ? 'Maximizar Janela'
                          : 'Maximize Window'}
                    </button>
                  </div>
                )}
              </div>

              {/* Language */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(openMenu === 'language' ? null : 'language')
                  }
                  className={`px-2 py-0.5 cursor-pointer ${
                    openMenu === 'language'
                      ? 'bg-[#000080] text-white'
                      : 'hover:bg-[#000080] hover:text-white'
                  }`}
                >
                  {isPt ? 'Idioma' : 'Language'}
                </button>
                {openMenu === 'language' && (
                  <div className="win98-outset absolute left-0 top-full mt-0.5 w-40 py-1 z-40 shadow-md">
                    <button
                      type="button"
                      onClick={() => handleSwitchLocale('pt')}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {isPt ? '✓ ' : '   '}Português (PT)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchLocale('en')}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {!isPt ? '✓ ' : '   '}English (EN)
                    </button>
                  </div>
                )}
              </div>

              {/* Help */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    openMenu === 'help'
                      ? 'bg-[#000080] text-white'
                      : 'hover:bg-[#000080] hover:text-white'
                  }`}
                >
                  {isPt ? 'Ajuda' : 'Help'}
                </button>
                {openMenu === 'help' && (
                  <div className="win98-outset absolute left-0 top-full mt-0.5 w-48 py-1 z-40 shadow-md">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(null);
                        setAboutOpen(true);
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      {isPt ? 'Sobre Marco Di Toro...' : 'About Marco Di Toro...'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Toolbar */}
            <div className="no-print flex flex-wrap items-center gap-1 px-1.5 py-1 border-b border-[var(--win-border-dark)] text-[11px] font-win98">
              <a
                href="/CV_Marco_Di_Toro.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="win98-btn px-2 py-0.5 flex items-center gap-1"
              >
                <span>📄</span>
                <span>{t('contactSection.downloadButton')}</span>
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="win98-btn px-2 py-0.5 flex items-center gap-1"
              >
                <span>🖨️</span>
                <span>{isPt ? 'Imprimir' : 'Print'}</span>
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="win98-btn px-2 py-0.5 flex items-center gap-1"
              >
                <span>📋</span>
                <span>{isPt ? 'Copiar Email' : 'Copy Email'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowLineNumbers((v) => !v)}
                className={`win98-btn px-2 py-0.5 flex items-center gap-1 ${
                  showLineNumbers ? 'win98-btn-active' : ''
                }`}
              >
                <span className="font-npp font-bold">#</span>
                <span className="hidden sm:inline">
                  {isPt ? 'Linhas' : 'Lines'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAboutOpen(true)}
                className="win98-btn px-2 py-0.5 flex items-center gap-1"
              >
                <span>ℹ️</span>
                <span>{isPt ? 'Sobre' : 'About'}</span>
              </button>
            </div>

            {/* Notepad++ Document Tabs */}
            <div
              role="tablist"
              aria-label="Resume sections"
              className="no-print flex items-end gap-0.5 px-1.5 pt-1.5 overflow-x-auto border-b-2 border-[var(--win-border-dark)] select-none"
            >
              {TABS.map(({ id, color }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-win98 whitespace-nowrap ${
                      isActive ? 'npp-tab-active' : 'npp-tab'
                    }`}
                  >
                    <SmallFileIcon color={color} />
                    <span>{id}</span>
                  </button>
                );
              })}
            </div>

            {/* Editor Surface */}
            <div className="win98-inset m-1 flex min-h-[540px] overflow-x-auto">
              {/* Notepad++ Line Number Gutter */}
              {showLineNumbers && (
                <div
                  aria-hidden="true"
                  className="no-print hidden sm:flex flex-col items-end px-2 py-3 select-none font-npp text-xs leading-[1.6] border-r border-[var(--win-border-dark)] bg-[var(--win-gutter)] text-[var(--win-gutter-text)] shrink-0"
                >
                  {Array.from({ length: lineCount }, (_, idx) => (
                    <span key={idx + 1}>{idx + 1}</span>
                  ))}
                </div>
              )}

              {/* Active Tab Document Content */}
              <div className="flex-1 p-3 sm:p-5 text-sm font-win98 space-y-5 min-w-0">
                {activeTab === 'curriculum.md' && (
                  <FullCurriculumView t={t} isPt={isPt} />
                )}

                {activeTab === 'experience.log' && (
                  <ExperienceTabView t={t} />
                )}

                {activeTab === 'projects.cs' && (
                  <ProjectsTabView t={t} isPt={isPt} />
                )}

                {activeTab === 'skills.json' && (
                  <SkillsTabView t={t} />
                )}

                {activeTab === 'education.txt' && (
                  <EducationTabView t={t} />
                )}

                {activeTab === 'contact.bmp' && (
                  <ContactTabView t={t} onCopyEmail={handleCopyEmail} isPt={isPt} />
                )}
              </div>
            </div>
          </Win98Window>
        )}
      </div>

      {/* Classic Win98 About Dialog */}
      {aboutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="win98-about-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="max-w-sm w-full">
            <Win98Window
              title={isPt ? 'Sobre Marco Di Toro' : 'About Marco Di Toro'}
              onClose={() => setAboutOpen(false)}
            >
              <div className="p-4 space-y-3 text-xs font-win98">
                <div className="flex items-start gap-3">
                  <div className="win98-inset p-0.5 shrink-0">
                    <Image
                      src="/profile_picture.jpg"
                      alt={t('profilePictureAlt')}
                      width={56}
                      height={56}
                      className="w-14 h-14 object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p id="win98-about-title" className="font-bold text-sm">
                      {t('title')}
                    </p>
                    <p>{t('subtitle2')}</p>
                    <p className="text-[11px] opacity-80">
                      Notepad++ [Win98 Edition] v1.98
                    </p>
                  </div>
                </div>
                <div className="border-t border-[var(--win-border-dark)] pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setAboutOpen(false)}
                    className="win98-btn px-5 py-1 font-bold"
                  >
                    OK
                  </button>
                </div>
              </div>
            </Win98Window>
          </div>
        </div>
      )}
    </div>
  );
}

type TFunc = ReturnType<typeof useTranslations<'HomePage'>>;

function FullCurriculumView({ t, isPt }: { t: TFunc; isPt: boolean }) {
  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="win98-fieldset flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="win98-inset p-1 shrink-0 bg-white">
          <Image
            src="/profile_picture.jpg"
            alt={t('profilePictureAlt')}
            width={96}
            height={96}
            className="w-24 h-24 object-cover"
            priority
          />
        </div>
        <div className="text-center sm:text-left space-y-1.5 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xs sm:text-sm font-bold">{t('subtitle')}</p>
          <p className="text-xs opacity-80 font-npp">{t('subtitle2')}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 pt-1 text-xs">
            <a href="mailto:marcorrditoro@gmail.com" className="win98-link">
              marcorrditoro@gmail.com
            </a>
            <a
              href="https://github.com/Frombull"
              target="_blank"
              rel="noopener noreferrer"
              className="win98-link"
            >
              github.com/Frombull
            </a>
            <a
              href="https://linkedin.com/in/marcoditoro/"
              target="_blank"
              rel="noopener noreferrer"
              className="win98-link"
            >
              linkedin.com/in/marcoditoro
            </a>
          </div>
        </div>
      </div>

      {/* About Me */}
      <fieldset id="about" className="win98-fieldset space-y-2">
        <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
          {t('aboutMe')}
        </legend>
        <p className="leading-relaxed text-xs sm:text-sm">{t('aboutMeP1')}</p>
        <p className="leading-relaxed text-xs sm:text-sm">{t('aboutMeP2')}</p>
      </fieldset>

      {/* Professional Experience */}
      <fieldset id="experience" className="win98-fieldset space-y-4">
        <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
          {t('professionalExperience')}
        </legend>
        <ExperienceList t={t} />
      </fieldset>

      {/* Projects */}
      <fieldset id="projects" className="win98-fieldset space-y-4">
        <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
          {t('projects')}
        </legend>
        <ProjectsList t={t} isPt={isPt} />
      </fieldset>

      {/* Skills */}
      <fieldset id="skills" className="win98-fieldset space-y-3">
        <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
          {t('interestsAndSkills')}
        </legend>
        <SkillsList t={t} />
      </fieldset>

      {/* Education & Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset id="education" className="win98-fieldset space-y-3">
          <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
            {t('education')}
          </legend>
          <EducationList t={t} />
        </fieldset>

        <fieldset id="certificates" className="win98-fieldset space-y-3">
          <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
            {t('certificates')}
          </legend>
          <CertificatesList t={t} />
        </fieldset>
      </div>

      {/* Languages & Contact / QR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset id="languages" className="win98-fieldset space-y-2">
          <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
            {t('languages')}
          </legend>
          <LanguagesList t={t} />
        </fieldset>

        <fieldset id="contact" className="win98-fieldset flex flex-col sm:flex-row items-center justify-between gap-4">
          <legend className="px-1.5 font-bold text-xs uppercase tracking-wide">
            {t('contactSection.downloadTitle')}
          </legend>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-xs">{t('linkedinQRCodeTitle')}</p>
            <a
              href="/CV_Marco_Di_Toro.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="win98-btn inline-block px-3 py-1.5 text-xs font-bold"
            >
              📄 {t('contactSection.downloadButton')} (PDF)
            </a>
          </div>
          <a
            href="https://linkedin.com/in/marcoditoro"
            target="_blank"
            rel="noopener noreferrer"
            title={t('linkedinQRCodeTitle')}
            className="win98-inset p-1 bg-white shrink-0"
          >
            <Image
              src="/qrcode/qr-code.svg"
              alt={t('linkedinQRCodeAlt')}
              width={88}
              height={88}
              className="w-[88px] h-[88px]"
            />
          </a>
        </fieldset>
      </div>
    </div>
  );
}

function ExperienceList({ t }: { t: TFunc }) {
  return (
    <div className="space-y-3">
      {EXPERIENCES.map(({ key, logo }, i) => (
        <Fragment key={key}>
          {i > 0 && <hr className="border-[var(--win-border-dark)]" />}
          <div className="flex items-start gap-3">
            <div className="win98-inset p-0.5 bg-white shrink-0 w-10 h-10 flex items-center justify-center">
              {logo ? (
                <Image
                  src={logo}
                  alt={t(`${key}.company`)}
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              ) : (
                <span className="font-npp text-xs font-bold text-black">DEV</span>
              )}
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <h3 className="font-bold text-sm">{t(`${key}.role`)}</h3>
                <span className="font-npp text-xs opacity-75">
                  [{t(`${key}.duration`)}]
                </span>
              </div>
              <p className="text-xs font-bold opacity-85">{t(`${key}.company`)}</p>
              <p className="text-xs leading-relaxed">{t(`${key}.description`)}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function ProjectsList({ t, isPt }: { t: TFunc; isPt: boolean }) {
  return (
    <div className="space-y-3">
      {PROJECTS.map(({ key, logo, githubUrl, demoUrl }, i) => (
        <Fragment key={key}>
          {i > 0 && <hr className="border-[var(--win-border-dark)]" />}
          <div className="flex items-start gap-3">
            <div className="win98-inset p-0.5 bg-white shrink-0 w-10 h-10 flex items-center justify-center">
              <Image
                src={logo}
                alt={t(`${key}.title`)}
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-bold text-sm">{t(`${key}.title`)}</h3>
              <p className="text-xs leading-relaxed">{t(`${key}.description`)}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win98-btn px-2 py-0.5 text-[11px]"
                  >
                    GitHub
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win98-btn px-2 py-0.5 text-[11px] font-bold"
                  >
                    {isPt ? 'Abrir Site ↗' : 'Live Demo ↗'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function SkillsList({ t }: { t: TFunc }) {
  return (
    <div className="space-y-3">
      {SKILL_GROUPS.map(({ key, items }) => (
        <div key={key} className="space-y-1">
          <h4 className="font-npp text-xs font-bold">
            &gt; {t(`skills.${key}`)}:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {items.map(({ label, translationKey }) => {
              const text = translationKey ? t(translationKey) : label ?? '';
              return (
                <span
                  key={text}
                  className="win98-inset-gray px-2 py-0.5 text-xs font-npp"
                >
                  {text}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationList({ t }: { t: TFunc }) {
  return (
    <div className="space-y-2.5">
      {EDUCATIONS.map((edu, i) => (
        <Fragment key={edu}>
          {i > 0 && <hr className="border-[var(--win-border-dark)]" />}
          <div>
            <h3 className="font-bold text-xs sm:text-sm">{t(`${edu}.degree`)}</h3>
            <p className="text-xs">{t(`${edu}.institution`)}</p>
            <p className="font-npp text-[11px] opacity-75">{t(`${edu}.period`)}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function CertificatesList({ t }: { t: TFunc }) {
  return (
    <div className="space-y-2.5">
      {CERTIFICATES.map((cert, i) => {
        const url = t(`${cert}.credentialUrl`);
        return (
          <Fragment key={cert}>
            {i > 0 && <hr className="border-[var(--win-border-dark)]" />}
            <div className="flex items-start gap-2.5">
              <div className="win98-inset p-0.5 bg-white shrink-0">
                <Image
                  src="/logos/MICROSOFT_LOGO.png"
                  alt="Microsoft"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="min-w-0">
                {url?.length > 0 ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win98-link font-bold text-xs sm:text-sm"
                  >
                    {t(`${cert}.title`)}
                  </a>
                ) : (
                  <h3 className="font-bold text-xs sm:text-sm">{t(`${cert}.title`)}</h3>
                )}
                <p className="text-xs">{t(`${cert}.issuer`)}</p>
                <p className="font-npp text-[11px] opacity-75">{t(`${cert}.date`)}</p>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

function LanguagesList({ t }: { t: TFunc }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2.5">
        <Image
          src="/flags/flag_br.svg"
          alt="Brazil"
          width={24}
          height={18}
          className="w-6 h-auto border border-black/30"
        />
        <span className="text-xs sm:text-sm">{t('languagesSection.pt')}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <Image
          src="/flags/flag_us.svg"
          alt="United States"
          width={24}
          height={18}
          className="w-6 h-auto border border-black/30"
        />
        <span className="text-xs sm:text-sm">{t('languagesSection.en')}</span>
      </div>
    </div>
  );
}

function ExperienceTabView({ t }: { t: TFunc }) {
  return (
    <div className="space-y-4">
      <div className="font-npp text-xs text-[#008000] dark:text-[#6a9955]">
        # {t('professionalExperience')} — Marco Di Toro
      </div>
      <ExperienceList t={t} />
    </div>
  );
}

function ProjectsTabView({ t, isPt }: { t: TFunc; isPt: boolean }) {
  return (
    <div className="space-y-4">
      <div className="font-npp text-xs text-[#008000] dark:text-[#6a9955]">
        {'// '}{t('projects')} — github.com/Frombull
      </div>
      <ProjectsList t={t} isPt={isPt} />
    </div>
  );
}

function SkillsTabView({ t }: { t: TFunc }) {
  return (
    <div className="space-y-3 font-npp text-xs">
      <div className="text-[#008000] dark:text-[#6a9955]">
        {'// '}{t('interestsAndSkills')}
      </div>
      <div>{'{'}</div>
      <div className="pl-4 space-y-3">
        {SKILL_GROUPS.map(({ key, items }, idx) => (
          <div key={key}>
            <span className="text-[#800000] dark:text-[#9cdcfe] font-bold">
              &quot;{t(`skills.${key}`)}&quot;
            </span>
            : [
            <div className="pl-4 flex flex-wrap gap-1.5 py-1">
              {items.map(({ label, translationKey }) => {
                const text = translationKey ? t(translationKey) : label ?? '';
                return (
                  <span
                    key={text}
                    className="win98-inset-gray px-1.5 py-0.5 text-[#0000ff] dark:text-[#ce9178]"
                  >
                    &quot;{text}&quot;
                  </span>
                );
              })}
            </div>
            ]{idx < SKILL_GROUPS.length - 1 ? ',' : ''}
          </div>
        ))}
      </div>
      <div>{'}'}</div>
    </div>
  );
}

function EducationTabView({ t }: { t: TFunc }) {
  return (
    <div className="space-y-5">
      <fieldset className="win98-fieldset space-y-3">
        <legend className="px-1.5 font-bold text-xs uppercase">
          {t('education')}
        </legend>
        <EducationList t={t} />
      </fieldset>
      <fieldset className="win98-fieldset space-y-3">
        <legend className="px-1.5 font-bold text-xs uppercase">
          {t('certificates')}
        </legend>
        <CertificatesList t={t} />
      </fieldset>
      <fieldset className="win98-fieldset space-y-2">
        <legend className="px-1.5 font-bold text-xs uppercase">
          {t('languages')}
        </legend>
        <LanguagesList t={t} />
      </fieldset>
    </div>
  );
}

function ContactTabView({
  t,
  onCopyEmail,
  isPt,
}: {
  t: TFunc;
  onCopyEmail: () => void;
  isPt: boolean;
}) {
  return (
    <div className="space-y-4">
      <fieldset className="win98-fieldset space-y-3">
        <legend className="px-1.5 font-bold text-xs uppercase">
          {t('contactSection.title')}
        </legend>
        <p className="text-xs sm:text-sm font-bold">{t('contactSection.subtitle')}</p>
        <p className="text-xs sm:text-sm">{t('contactSection.description')}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={onCopyEmail}
            className="win98-btn px-3 py-1.5 text-xs font-bold"
          >
            📋 {isPt ? 'Copiar Email' : 'Copy Email'} (marcorrditoro@gmail.com)
          </button>
          <a
            href="/CV_Marco_Di_Toro.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="win98-btn px-3 py-1.5 text-xs font-bold"
          >
            📄 {t('contactSection.downloadButton')}
          </a>
        </div>
      </fieldset>

      <fieldset className="win98-fieldset flex flex-col items-center gap-3">
        <legend className="px-1.5 font-bold text-xs uppercase">
          {t('linkedin')}
        </legend>
        <a
          href="https://linkedin.com/in/marcoditoro"
          target="_blank"
          rel="noopener noreferrer"
          className="win98-inset p-1.5 bg-white"
        >
          <Image
            src="/qrcode/qr-code.svg"
            alt={t('linkedinQRCodeAlt')}
            width={144}
            height={144}
            className="w-36 h-36"
          />
        </a>
        <a
          href="https://linkedin.com/in/marcoditoro"
          target="_blank"
          rel="noopener noreferrer"
          className="win98-link text-xs"
        >
          https://linkedin.com/in/marcoditoro
        </a>
      </fieldset>
    </div>
  );
}
