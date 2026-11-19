"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/equipment", label: "All Equipment" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    `relative py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition ${
      pathname === href
        ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-primary"
        : "text-base-content/75 hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base-100/70 backdrop-blur-xl">
      <div className="container-x flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm px-2">
              <FaBars className="text-lg" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-white/10 bg-base-200 p-2 shadow-xl"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" aria-label="NoiROBO home">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="btn btn-ghost btn-sm">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm px-5">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}