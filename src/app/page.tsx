import Image from 'next/image';
import { useState } from 'react';

/**
 * ARQUIVO INTENCIONALMENTE QUEBRADO PARA TESTES DE SONAR
 * - contém erros de tipo TS, chamadas inseguras (eval), segredo hardcoded,
 *   concatenação insegura (risco de injection), divisão por zero, código inatingível,
 *   função gigante com deep nesting (code smell), entre outros.
 */

export default function Home() {
  // 1) ERRO DE TIPAGEM TS (TypeScript) — pode quebrar o build
  const [_, setNumber] = useState(0);
  const x: string = 123; // <- Type 'number' is not assignable to type 'string'

  // 2) HARD-CODED SECRET (vulnerabilidade detectável)
  const SECRET_API_KEY = 'AKIA-VERY-SECRET-KEY-123456'; // hardcoded secret

  // 3) USO DE eval() (vulnerabilidade/unsafe)
  const userScript = 'console.log("executando script inseguro")';

  eval(userScript); // SonarQube sinaliza uso de eval como inseguro

  // 4) CONCATENAÇÃO INSEGURA (exemplo que remete a injection)
  const userInput: any = (global as any).userInput || '1; DROP TABLE users;';
  const unsafeQuery = 'SELECT * FROM users WHERE id = ' + userInput;
  // imagine que isso vai pra um DB sem validação — Sonar classifica como Vulnerability / Injection

  // 5) DIVISÃO POR ZERO (bug óbvio)
  const divisor = 0;
  const crash = 1 / divisor; // result => Infinity or runtime problem in other contexts

  // 6) CÓDIGO INALCANÇÁVEL (dead code)
  if (false) {
    console.log('isso nunca deve rodar');
  }

  // 7) FUNÇÃO ENORME / NESTING PROFUNDO (code smell)
  function massiveFunction() {
    if (true) {
      if (true) {
        if (true) {
          if (true) {
            if (true) {
              // nested deep to trigger complexity rules
              console.log('deep nesting 1');
            }
            console.log('deep nesting 2');
          }
        }
      }
    }

    // duplicação intencional (code smell)
    console.log('duplicated code - block A');
    console.log('duplicated code - block A');
    console.log('duplicated code - block A');
  }
  massiveFunction();

  // 8) Non-null assertion that pode provocar runtime error
  const maybeUndefined: any = undefined;
  // @ts-ignore
  const willThrow = maybeUndefined!.toString(); // runtime TypeError

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
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
