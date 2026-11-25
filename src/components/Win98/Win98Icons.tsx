import type { SVGProps } from 'react';

export function Win98FlagIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="2" width="6" height="5" fill="#ff0000" />
      <rect x="8" y="2" width="6" height="5" fill="#00a800" />
      <rect x="1" y="8" width="6" height="5" fill="#0055ff" />
      <rect x="8" y="8" width="6" height="5" fill="#ffcc00" />
      <rect x="0" y="1" width="15" height="1" fill="#000000" opacity="0.25" />
    </svg>
  );
}

export function NotepadIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="1" width="11" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
      <rect x="2" y="1" width="11" height="3" fill="#000080" />
      <rect x="4" y="6" width="7" height="1" fill="#008000" />
      <rect x="4" y="8" width="6" height="1" fill="#000000" />
      <rect x="4" y="10" width="7" height="1" fill="#0000ff" />
      <rect x="4" y="12" width="5" height="1" fill="#808080" />
    </svg>
  );
}

export function ComputerIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="4" width="24" height="17" fill="#c0c0c0" stroke="#000000" strokeWidth="1.5" />
      <rect x="7" y="7" width="18" height="11" fill="#008080" stroke="#404040" strokeWidth="1" />
      <rect x="12" y="21" width="8" height="3" fill="#808080" />
      <rect x="3" y="24" width="26" height="4" fill="#c0c0c0" stroke="#000000" strokeWidth="1.5" />
      <rect x="22" y="25" width="4" height="2" fill="#00a800" />
    </svg>
  );
}

export function PdfShortcutIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path d="M6 3h14l6 6v20H6V3z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
      <path d="M20 3v6h6" fill="#c0c0c0" stroke="#000000" strokeWidth="1.5" />
      <rect x="8" y="14" width="16" height="7" fill="#cc0000" />
      <text x="16" y="19.5" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="Tahoma, sans-serif">
        PDF
      </text>
    </svg>
  );
}

export function GlobeShortcutIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="#1084d0" stroke="#000000" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="5" ry="11" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="5" y1="16" x2="27" y2="16" stroke="#ffffff" strokeWidth="1" />
      <line x1="7" y1="11" x2="25" y2="11" stroke="#ffffff" strokeWidth="1" />
      <line x1="7" y1="21" x2="25" y2="21" stroke="#ffffff" strokeWidth="1" />
    </svg>
  );
}

export function SmallFileIcon({ color = '#000080', ...props }: { color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 shrink-0" shapeRendering="crispEdges" aria-hidden="true" {...props}>
      <path d="M2 1h7l3 3v9H2V1z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
      <rect x="4" y="5" width="6" height="1.5" fill={color} />
      <rect x="4" y="8" width="6" height="1" fill="#808080" />
      <rect x="4" y="10" width="4" height="1" fill="#808080" />
    </svg>
  );
}
