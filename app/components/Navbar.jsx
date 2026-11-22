"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";
import { useAuth } from "./AuthProvider";
import { toast } from "../lib/notify";

const links = [
  { href: "/", label: "Home" },
  { href: "/equipment", label: "All Equipment" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [pathname, setPathname] = useState("/");
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const onLogout = async () => {
    await logout();
    toast("success", "Logged out successfully");
    router.push("/");
  };

  const linkClass = (href) =>
    `relative py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition ${
      pathname === href
        ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-primary"
        : "text-base-content/75 hover:text-primary"
    }`;

  const avatar =
    user?.image ||
    `https://placehold.co/80x80/12161c/ff6a1a?text=${encodeURIComponent(
      (user?.name || "U").charAt(0).toUpperCase()
    )}`;

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
                  <Link href={l.href} onClick={() => setPathname(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" aria-label="NoiROBO home" onClick={() => setPathname("/")}>
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setPathname(l.href)}
              className={linkClass(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setPathname("/dashboard")}
                className="btn btn-ghost btn-sm hidden sm:inline-flex"
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="btn btn-outline-light btn-sm hidden md:inline-flex"
              >
                Logout
              </button>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-9 rounded-full border border-white/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} alt="profile" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-10 mt-3 w-52 rounded-box border border-white/10 bg-base-200 p-2 shadow-xl"
                >
                  <li className="menu-title">{user.name}</li>
                  <li>
                    <Link href="/dashboard" onClick={() => setPathname("/dashboard")}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={onLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setPathname("/login")}
                className="btn btn-ghost btn-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setPathname("/register")}
                className="btn btn-primary btn-sm px-5"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}