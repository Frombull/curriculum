'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { NotepadIcon } from './Win98Icons';

type Win98WindowProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  statusText?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
  className?: string;
};

export function Win98Window({
  title,
  icon,
  children,
  statusText,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
  className = '',
}: Win98WindowProps) {
  return (
    <section
      className={`win98-outset flex flex-col ${
        isMaximized ? 'w-full min-h-[calc(100vh-44px)]' : 'w-full'
      } ${className}`}
    >
      {/* Title Bar */}
      <div className="win98-titlebar flex items-center justify-between px-1.5 py-1 select-none gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {icon ?? <NotepadIcon className="w-4 h-4 shrink-0" />}
          <span className="font-win98 text-xs font-bold tracking-tight truncate">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {onMinimize && (
            <button
              type="button"
              onClick={onMinimize}
              aria-label="Minimize"
              className="win98-btn w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none pb-1"
            >
              _
            </button>
          )}
          {onMaximize && (
            <button
              type="button"
              onClick={onMaximize}
              aria-label="Maximize"
              className="win98-btn w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none"
            >
              {isMaximized ? '❐' : '□'}
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="win98-btn w-4 h-4 flex items-center justify-center text-[11px] font-bold leading-none ml-0.5"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col min-w-0">{children}</div>

      {/* Optional Status Bar */}
      {statusText && (
        <div className="win98-inset-gray px-2 py-0.5 text-[11px] font-win98 flex items-center justify-between gap-2 mt-0.5">
          <span className="truncate">{statusText}</span>
        </div>
      )}
    </section>
  );
}

/**
 * Shared Win98 window shell for legal and informational subpages.
 */
export function Win98LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen pb-6 pt-4 px-3 sm:px-6 max-w-4xl mx-auto">
      <Win98Window title={`${title} - Notepad.exe`} statusText="Read-Only | UTF-8">
        <div className="p-2 border-b border-[var(--win-border-dark)]">
          <Link href="/" className="win98-btn inline-block px-3 py-1 text-xs font-bold">
            ← Marco_Di_Toro_CV.md
          </Link>
        </div>
        <div className="win98-inset m-1 p-4 sm:p-6 font-win98 text-xs sm:text-sm space-y-4">
          <h1 className="text-lg sm:text-xl font-bold">{title}</h1>
          {children}
        </div>
      </Win98Window>
    </div>
  );
}
