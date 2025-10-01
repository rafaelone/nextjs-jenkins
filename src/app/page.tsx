import Image from 'next/image';
import { useState } from 'react';

/**
 * Versão com lint OK (evita erros TS/ESLint), mas com issues que Sonar costuma detectar:
 * - Hard-coded secret
 * - String concatenation que parece query (injection risk)
 * - Função com deep nesting / duplicação (complexity / code smell)
 * - Divisão por zero (suspicious)
 * - Uso de any / coerção que pode provocar runtime issues
 */

export default function Home() {
  // usar underscore para evitar warning de "unused" no eslint (dependendo da config)
  const [_counter, setCounter] = useState<number>(0);

  // 1) Hard-coded secret (security hotspot)
  const SECRET_API_KEY = 'AKIA-FAKE-VERY-SECRET-EXAMPLE-0001';

  // 2) Construção de query por concatenação (sonar vê como potencial injection)
  // não está sendo executada, apenas simulada
  const userInput = '1 OR 1=1'; // string intencional (não undefined)
  const unsafeQuery = `SELECT * FROM users WHERE id = ${userInput}`;

  // 3) Divisão por zero (suspicious)
  const maybeZero = 0;
  const suspicious = 1 / maybeZero; // Infinity — Sonar pode marcar como bug

  // 4) Função com nesting e duplicação para aumentar complexidade
  function complexFunction(a: number) {
    if (a > 0) {
      if (a % 2 === 0) {
        if (a % 4 === 0) {
          for (let i = 0; i < 3; i++) {
            if (i % 2 === 0) {
              // bloco repetido para simular duplicação
              console.log('duplicated block A');
              console.log('duplicated block A');
            }
          }
        } else {
          console.log('branch else 1');
        }
      } else {
        console.log('branch else 2');
      }
    } else {
      console.log('a <= 0');
    }

    // mais código para aumentar complexidade
    switch (a) {
      case 0:
        return 'zero';
      case 1:
        return 'one';
      default:
        return 'other';
    }
  }

  // chama para não ficar "unused"
  const _ = complexFunction(8);

  // 5) coerção perigosa: usar any e converter — pode gerar runtime error em outros contextos
  const maybeAny: unknown = null;
  const coerced = String(maybeAny); // não lança aqui, mas Sonar pode detectar uso de any

  // UI simples, tudo OK pro lint
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
