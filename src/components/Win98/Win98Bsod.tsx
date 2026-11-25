'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Win98Bsod() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0000aa] text-white font-npp flex items-center justify-center p-6 sm:p-10">
      <div className="max-w-2xl w-full space-y-6 text-xs sm:text-sm leading-relaxed">
        <div className="text-center">
          <span className="inline-block bg-[#aaaaaa] text-[#0000aa] px-3 py-0.5 font-bold tracking-wide">
            Windows
          </span>
        </div>

        <p>
          A fatal exception 404 has occurred at 0028:C0011E36 in VXD HTTP(01) +
          00010E36. The requested page could not be found or has been moved.
        </p>

        <ul className="space-y-1.5 list-none">
          <li>
            * Click the prompt below or press ENTER to return to Marco&apos;s
            resume.
          </li>
          <li>
            * Press CTRL+ALT+DEL again to restart your computer. You will lose
            any unsaved information in all applications.
          </li>
        </ul>

        <div className="pt-4 text-center">
          <Link
            href="/"
            className="inline-block underline underline-offset-4 hover:bg-[#aaaaaa] hover:text-[#0000aa] px-2 py-0.5 focus:outline-1 focus:outline-dotted focus:outline-white"
          >
            Press ENTER or click here to continue{' '}
            <span className="animate-pulse font-bold">_</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
