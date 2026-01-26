'use client';

import { usePathname, Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
    const pathname = usePathname();
    const t = useTranslations('Header');
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Saved theme preference or default to system preference
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

    return(
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 md:px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-300 tracking-tight hover:text-gray-900 dark:hover:text-white transition-colors">
                    Marco Di Toro
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        <li>
                            <Link 
                                href="/" 
                                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-150 hover:after:w-full">
                                {t('curriculo')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/blog" 
                                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-150 hover:after:w-full pointer-events-none opacity-50">
                                {t('blog')}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:cursor-pointer"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <LanguageSwitcher />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <ul className="py-2 px-4">
                        <li>
                            <Link 
                                href="/#about" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('about')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/#experience" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('experience')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/#projects" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('projects')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/#skills" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('skills')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/#education" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('education')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/#contact" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('contact')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/blog" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                {t('blog')}
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    )
}