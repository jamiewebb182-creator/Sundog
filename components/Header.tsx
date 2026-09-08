"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/commission", label: "Start a commission" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="wrap">
        <Link className="brand" href="/" aria-label={`${site.name} — go to homepage`}>
          <svg width="32" height="32" viewBox="0 0 34 34" aria-hidden="true">
            <circle cx="15" cy="18" r="10" fill="var(--amber)" />
            <circle cx="26" cy="9" r="4.5" fill="var(--sapphire)" />
            <g stroke="var(--ink)" strokeWidth="1" opacity=".45">
              <line x1="15" y1="4" x2="15" y2="8" />
              <line x1="15" y1="28" x2="15" y2="32" />
              <line x1="1" y1="18" x2="5" y2="18" />
              <line x1="25" y1="18" x2="29" y2="18" />
            </g>
          </svg>
          <span className="brand-name">{site.name}</span>
        </Link>
        <nav className="mainnav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
