"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRobot, FaBars } from "react-icons/fa6";

const links = [
  { href: "/", label: "Home" },
  { href: "/equipment", label: "All Equipment" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      pathname === href
        ? "bg-primary text-primary-content"
        : "text-base-content hover:bg-base-200"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm px-2">
              <FaBars className="text-lg" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content">
              <FaRobot />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-primary">
              Noi<span className="text-secondary">ROBO</span>
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn btn-ghost btn-sm rounded-full">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm rounded-full">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}