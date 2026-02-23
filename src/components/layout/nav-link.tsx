"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100",
        isActive
          ? "text-gray-900 dark:text-gray-100"
          : "text-gray-600 dark:text-gray-400",
        className
      )}
    >
      {children}
    </Link>
  );
}
