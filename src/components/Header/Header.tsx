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
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Work In Progress :)
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        <li>
                            <Link 
                                href="/blog" 
                                className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {t('blog')}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/" 
                                className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {t('curriculo')}
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