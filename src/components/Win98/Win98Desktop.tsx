'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlobeShortcutIcon, PdfShortcutIcon } from './Win98Icons';

interface GridPos {
  col: number;
  row: number;
}

interface DesktopItem {
  id: string;
  label: string;
  title?: string;
  href?: string;
  onAction?: () => void;
  icon: React.ReactNode;
}

interface Win98DesktopProps {
  isPt: boolean;
  locale: string;
  isDark: boolean;
  onSwitchLocale: (nextLocale: string) => void;
  onToggleTheme: (nextDark: boolean) => void;
}

const GRID_OFFSET_X = 12;
const GRID_OFFSET_Y = 12;
const CELL_W = 86;
const CELL_H = 78;
const ICON_W = 78;
const ICON_H = 74;
const DRAG_THRESHOLD = 4;

const INITIAL_POSITIONS: Record<string, GridPos> = {
  'cv-pdf': { col: 0, row: 0 },
  language: { col: 1, row: 1 },
  github: { col: 1, row: 2 },
  theme: { col: 1, row: 3 },
  linkedin: { col: 0, row: 4 },
};

function gridToPx(pos: GridPos) {
  return {
    x: GRID_OFFSET_X + pos.col * CELL_W,
    y: GRID_OFFSET_Y + pos.row * CELL_H,
  };
}

function pxToGrid(x: number, y: number, maxCol: number, maxRow: number): GridPos {
  const col = Math.max(0, Math.min(maxCol, Math.round((x - GRID_OFFSET_X) / CELL_W)));
  const row = Math.max(0, Math.min(maxRow, Math.round((y - GRID_OFFSET_Y) / CELL_H)));
  return { col, row };
}

function findNearestFreeCell(
  target: GridPos,
  occupied: Set<string>,
  maxCol: number,
  maxRow: number
): GridPos {
  const key = (c: number, r: number) => `${c},${r}`;
  if (!occupied.has(key(target.col, target.row))) {
    return target;
  }

  let best: GridPos | null = null;
  let bestDist = Infinity;
  for (let c = 0; c <= maxCol; c++) {
    for (let r = 0; r <= maxRow; r++) {
      if (occupied.has(key(c, r))) continue;
      const dist = Math.hypot(c - target.col, r - target.row);
      if (dist < bestDist) {
        bestDist = dist;
        best = { col: c, row: r };
      }
    }
  }
  return best ?? target;
}

export function Win98Desktop({
  isPt,
  locale,
  isDark,
  onSwitchLocale,
  onToggleTheme,
}: Win98DesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  const [positions, setPositions] = useState<Record<string, GridPos>>(INITIAL_POSITIONS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [dragState, setDragState] = useState<{
    ids: string[];
    dx: number;
    dy: number;
    active: boolean;
  } | null>(null);
  const [marquee, setMarquee] = useState<{
    startX: number;
    startY: number;
    curX: number;
    curY: number;
  } | null>(null);

  const dragMetaRef = useRef<{
    ids: string[];
    startX: number;
    startY: number;
    hasMoved: boolean;
    clickedId: string;
  } | null>(null);
  const marqueeMetaRef = useRef<{
    startX: number;
    startY: number;
    additive: boolean;
    baseSelected: Set<string>;
  } | null>(null);

  const items: DesktopItem[] = [
    {
      id: 'cv-pdf',
      label: 'CV_Marco.pdf',
      href: '/CV_Marco_Di_Toro.pdf',
      icon: <PdfShortcutIcon className="w-8 h-8" />,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Frombull',
      icon: <GlobeShortcutIcon className="w-8 h-8" />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/marcoditoro/',
      icon: <GlobeShortcutIcon className="w-8 h-8" />,
    },
    {
      id: 'language',
      label: isPt ? 'Idioma: PT' : 'Lang: EN',
      title: isPt ? 'Switch to English' : 'Mudar para Português',
      onAction: () => onSwitchLocale(isPt ? 'en' : 'pt'),
      icon: (
        <span className="w-8 h-8 win98-outset flex items-center justify-center font-npp text-xs font-bold text-[var(--foreground)]">
          {locale.toUpperCase()}
        </span>
      ),
    },
    {
      id: 'theme',
      label: isDark
        ? isPt
          ? 'Tema: Dark'
          : 'Theme: Dark'
        : isPt
          ? 'Tema: Win98'
          : 'Theme: Win98',
      title: isDark ? 'Classic Win98 Light' : 'Notepad++ Dark',
      onAction: () => onToggleTheme(!isDark),
      icon: (
        <span className="w-8 h-8 win98-outset flex items-center justify-center text-base">
          {isDark ? '☀️' : '🌙'}
        </span>
      ),
    },
  ];

  const itemsRef = useRef(items);
  const positionsRef = useRef(positions);
  const hasUserMovedRef = useRef(false);

  useLayoutEffect(() => {
    const syncNearWindowIcons = () => {
      if (hasUserMovedRef.current) return;
      const winEl = document.getElementById('win98-main-window');
      if (!winEl) return;
      const winLeft = winEl.getBoundingClientRect().left;
      const nearCol = Math.max(
        1,
        Math.floor((winLeft - GRID_OFFSET_X - ICON_W - 12) / CELL_W)
      );
      setPositions((prev) => {
        if (prev.language?.col === nearCol && prev.theme?.col === nearCol) {
          return prev;
        }
        return {
          ...prev,
          language: { col: nearCol, row: 1 },
          theme: { col: nearCol, row: 3 },
        };
      });
    };

    syncNearWindowIcons();
    window.addEventListener('resize', syncNearWindowIcons);
    return () => window.removeEventListener('resize', syncNearWindowIcons);
  }, []);

  useEffect(() => {
    itemsRef.current = items;
    positionsRef.current = positions;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragMetaRef.current) {
        const meta = dragMetaRef.current;
        const dx = e.clientX - meta.startX;
        const dy = e.clientY - meta.startY;
        if (!meta.hasMoved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
          meta.hasMoved = true;
        }
        if (meta.hasMoved) {
          setDragState({ ids: meta.ids, dx, dy, active: true });
        }
        return;
      }

      if (marqueeMetaRef.current) {
        const meta = marqueeMetaRef.current;
        const curX = e.clientX;
        const curY = e.clientY;
        setMarquee({ startX: meta.startX, startY: meta.startY, curX, curY });

        const left = Math.min(meta.startX, curX);
        const right = Math.max(meta.startX, curX);
        const top = Math.min(meta.startY, curY);
        const bottom = Math.max(meta.startY, curY);

        const nextSelected = new Set(meta.additive ? meta.baseSelected : []);
        for (const item of itemsRef.current) {
          const pos = positionsRef.current[item.id];
          if (!pos) continue;
          const { x, y } = gridToPx(pos);
          const intersects =
            x < right && x + ICON_W > left && y < bottom && y + ICON_H > top;
          if (intersects) {
            nextSelected.add(item.id);
          }
        }
        setSelectedIds(nextSelected);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragMetaRef.current) {
        const meta = dragMetaRef.current;
        const dx = e.clientX - meta.startX;
        const dy = e.clientY - meta.startY;
        dragMetaRef.current = null;
        setDragState(null);

        if (meta.hasMoved) {
          hasUserMovedRef.current = true;
          const maxCol = Math.max(
            0,
            Math.floor((window.innerWidth - GRID_OFFSET_X - ICON_W) / CELL_W)
          );
          const maxRow = Math.max(
            0,
            Math.floor((window.innerHeight - GRID_OFFSET_Y - ICON_H) / CELL_H)
          );

          setPositions((prev) => {
            const next = { ...prev };
            const occupied = new Set<string>();
            for (const [id, pos] of Object.entries(next)) {
              if (!meta.ids.includes(id)) {
                occupied.add(`${pos.col},${pos.row}`);
              }
            }
            for (const id of meta.ids) {
              const origin = gridToPx(prev[id]);
              const target = pxToGrid(origin.x + dx, origin.y + dy, maxCol, maxRow);
              const snapped = findNearestFreeCell(target, occupied, maxCol, maxRow);
              next[id] = snapped;
              occupied.add(`${snapped.col},${snapped.row}`);
            }
            return next;
          });
        } else {
          const clicked = itemsRef.current.find((item) => item.id === meta.clickedId);
          if (clicked?.onAction) {
            clicked.onAction();
          } else if (clicked?.href) {
            window.open(clicked.href, '_blank', 'noopener,noreferrer');
          }
        }
      }

      if (marqueeMetaRef.current) {
        marqueeMetaRef.current = null;
        setMarquee(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDesktopMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (e.target !== desktopRef.current) return;
    e.preventDefault();

    const additive = e.ctrlKey || e.metaKey || e.shiftKey;
    if (!additive) {
      setSelectedIds(new Set());
    }
    marqueeMetaRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      additive,
      baseSelected: new Set(selectedIds),
    };
    setMarquee({
      startX: e.clientX,
      startY: e.clientY,
      curX: e.clientX,
      curY: e.clientY,
    });
  };

  const handleIconMouseDown = (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const additive = e.ctrlKey || e.metaKey || e.shiftKey;
    let nextSelected: Set<string>;
    if (additive) {
      nextSelected = new Set(selectedIds);
      if (nextSelected.has(id)) {
        nextSelected.delete(id);
      } else {
        nextSelected.add(id);
      }
    } else if (selectedIds.has(id)) {
      nextSelected = new Set(selectedIds);
    } else {
      nextSelected = new Set([id]);
    }
    setSelectedIds(nextSelected);

    const dragIds = nextSelected.has(id) ? Array.from(nextSelected) : [id];
    dragMetaRef.current = {
      ids: dragIds,
      startX: e.clientX,
      startY: e.clientY,
      hasMoved: false,
      clickedId: id,
    };
  };

  const marqueeRect = marquee
    ? {
        left: Math.min(marquee.startX, marquee.curX),
        top: Math.min(marquee.startY, marquee.curY),
        width: Math.abs(marquee.curX - marquee.startX),
        height: Math.abs(marquee.curY - marquee.startY),
      }
    : null;

  return (
    <div
      ref={desktopRef}
      aria-label="Desktop shortcuts"
      onMouseDown={handleDesktopMouseDown}
      className="no-print hidden lg:block fixed inset-0 z-0 pointer-events-auto select-none"
    >
      {items.map((item) => {
        const pos = positions[item.id] ?? { col: 0, row: 0 };
        const { x, y } = gridToPx(pos);
        const isSelected = selectedIds.has(item.id);
        const isDragging = dragState?.active && dragState.ids.includes(item.id);
        const tx = isDragging ? dragState.dx : 0;
        const ty = isDragging ? dragState.dy : 0;

        return (
          <button
            key={item.id}
            type="button"
            title={item.title}
            onMouseDown={(e) => handleIconMouseDown(e, item.id)}
            onDragStart={(e) => e.preventDefault()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (item.onAction) {
                  item.onAction();
                } else if (item.href) {
                  window.open(item.href, '_blank', 'noopener,noreferrer');
                }
              }
            }}
            style={{
              left: x,
              top: y,
              width: ICON_W,
              minHeight: ICON_H,
              transform: isDragging ? `translate3d(${tx}px, ${ty}px, 0)` : undefined,
            }}
            className={`absolute flex flex-col items-center gap-1 p-1 text-white cursor-pointer focus:outline-none ${
              isDragging ? 'opacity-75 z-20' : 'z-10'
            }`}
          >
            <span
              className={
                isSelected ? 'brightness-90 drop-shadow-[0_0_1px_#000080]' : ''
              }
            >
              {item.icon}
            </span>
            <span
              className={`font-win98 text-[11px] leading-tight text-center px-1 py-0.5 break-words ${
                isSelected
                  ? 'bg-[#000080] text-white outline-1 outline-dotted outline-white'
                  : 'drop-shadow-[1px_1px_0_#000]'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Classic Win98 Marquee Selection Box */}
      {marqueeRect && (marqueeRect.width > 2 || marqueeRect.height > 2) && (
        <div
          aria-hidden="true"
          style={{
            left: marqueeRect.left,
            top: marqueeRect.top,
            width: marqueeRect.width,
            height: marqueeRect.height,
          }}
          className="fixed z-30 pointer-events-none border border-dotted border-white bg-[#000080]/20"
        />
      )}
    </div>
  );
}
