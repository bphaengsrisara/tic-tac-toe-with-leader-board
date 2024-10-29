import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex flex-col items-center gap-8 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild className="bg-[#383838] dark:bg-[#ccc]">
            <Link href="https://vercel.com/new" target="_blank">
              <Image
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://nextjs.org/docs" target="_blank">
              Read our docs
            </Link>
          </Button>
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-6">
        <Button asChild variant="link">
          <Link href="https://nextjs.org/learn" target="_blank">
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://vercel.com/templates" target="_blank">
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://nextjs.org" target="_blank">
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </Link>
        </Button>
      </footer>
    </div>
  );
}
