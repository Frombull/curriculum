import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import './globals.css';

export default function NotFound() {
  return (
    <html lang="pt-BR">
      <head>
        <title>404 - Página Não Encontrada</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-8">
              <div className="flex justify-center mb-6">
                <AlertTriangle className="text-yellow-500" size={64} />
              </div>
              <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white">
                404
              </h1>
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mt-2">
                Oops! Página não existe ou foi movida.
              </h2>
              <div className="mt-8">
                <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                  <Home size={20} />
                  Voltar para a Página Inicial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
