'use client';

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { DM_Mono } from 'next/font/google';

const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });

export function Header() {
    const t = useTranslations('Header');
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const headerRef = useRef<HTMLElement>(null);

    const navLinks = [
        { href: '#about',      label: t('about') },
        { href: '#experience', label: t('experience') },
        { href: '#projects',   label: t('projects') },
        { href: '#skills',     label: t('skills') },
        { href: '#education',  label: t('education') },
    ];

    // Theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Header entrance animation
    useEffect(() => {
        const loadAnime = async () => {
            const anime = (await import('animejs')).default;
            anime({
                targets: headerRef.current,
                opacity: [0, 1],
                translateY: [-12, 0],
                duration: 600,
                easing: 'easeOutExpo',
            });
            anime({
                targets: '.header-item',
                opacity: [0, 1],
                translateY: [-8, 0],
                duration: 500,
                easing: 'easeOutExpo',
                delay: anime.stagger(60, { start: 150 }),
            });
        };
        loadAnime();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const loadAnime = async () => {
            const anime = (await import('animejs')).default;
            anime({
                targets: '.mobile-nav-item',
                opacity: [0, 1],
                translateX: [-10, 0],
                duration: 300,
                easing: 'easeOutExpo',
                delay: anime.stagger(40),
            });
        };
        loadAnime();
    }, [mobileMenuOpen]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <header
            ref={headerRef}
            style={{ opacity: 0 }}
            className="fixed top-0 w-full z-50 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200/70 dark:border-zinc-800"
        >
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 md:px-6 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className={`header-item text-xl font-bold text-slate-900 dark:text-zinc-200 tracking-tight hover:text-slate-950 dark:hover:text-white transition-colors ${dmMono.className}`}
                    style={{ opacity: 0 }}
                >
                    Marco Di Toro
                </Link>

                {/* Desktop Navigation — anchor links */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {navLinks.map(({ href, label }) => {
                            const id = href.replace('#', '');
                            const isActive = activeSection === id;
                            return (
                                <li key={href} className="header-item relative" style={{ opacity: 0 }}>
                                    <a
                                        href={href}
                                        className={`px-3 py-2 text-sm transition-colors block ${
                                            isActive
                                                ? 'text-slate-950 dark:text-white font-medium'
                                                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
                                        }`}
                                    >
                                        {label}
                                    </a>
                                    {/* Active indicator dot */}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-900 dark:bg-zinc-100" />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    <div className="header-item" style={{ opacity: 0 }}>
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-[2px] text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors hover:cursor-pointer [&>svg]:fill-none"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <div className="header-item" style={{ opacity: 0 }}>
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="header-item md:hidden p-2 rounded-[2px] text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors [&>svg]:fill-none"
                        aria-label="Toggle menu"
                        style={{ opacity: 0 }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className="md:hidden border-t border-slate-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <ul className="py-2 px-4">
                        {navLinks.map(({ href, label }) => (
                            <li key={href} className="mobile-nav-item" style={{ opacity: 0 }}>
                                <a
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-[2px] text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}