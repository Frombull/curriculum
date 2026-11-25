import Link from 'next/link';
import { Win98Window } from '@/components/Win98/Win98Window';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full">
        <Win98Window title="Error 404 - Windows">
          <div className="p-5 font-win98 text-xs space-y-4">
            <div className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-[#cc0000] text-white flex items-center justify-center font-bold text-lg shrink-0 border-2 border-black"
              >
                ×
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-sm">404 - File Not Found</p>
                <p>Oops! Página não existe ou foi movida.</p>
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <Link href="/" className="win98-btn px-4 py-1.5 font-bold">
                OK (Voltar)
              </Link>
            </div>
          </div>
        </Win98Window>
      </div>
    </div>
  );
}
