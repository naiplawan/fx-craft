import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="SalakCode" width={28} height={28} className="rounded-md" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              SalakCode
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/principles">Principles</NavLink>
            <NavLink href="/info">Info</NavLink>
            <NavLink href="/articles">Articles</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
