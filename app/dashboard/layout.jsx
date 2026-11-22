"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RequireAuth from "../components/RequireAuth";
import { useAuth } from "../components/AuthProvider";

const menu = {
  customer: [
    ["Overview", "/dashboard"],
    ["My Rentals", "/dashboard/my-rentals"],
    ["Favorites", "/dashboard/favorites"],
    ["Profile", "/dashboard/profile"],
  ],
  owner: [
    ["Overview", "/dashboard"],
    ["Add Equipment", "/dashboard/add-equipment"],
    ["My Equipment", "/dashboard/my-equipment"],
    ["My Equipment Rental", "/dashboard/my-equipment-rental"],
    ["My Profile", "/dashboard/profile"],
  ],
  admin: [
    ["Overview", "/dashboard"],
    ["All Users", "/dashboard/all-users"],
    ["All Equipment", "/dashboard/all-equipment"],
    ["All Rentals", "/dashboard/all-rentals"],
    ["My Profile", "/dashboard/profile"],
  ],
};

function Shell({ children }) {
  const { role, profile } = useAuth();
  const path = usePathname();
  const links = menu[role] || menu.customer;

  return (
    <div className="flex min-h-[80vh] flex-col lg:flex-row">
      <aside className="border-b border-white/10 bg-base-200/60 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="p-6">
          <p className="t-label text-primary capitalize">{role} dashboard</p>
          <p className="t-small mt-1 truncate">{profile?.name}</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-visible">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition ${
                path === href
                  ? "bg-primary text-primary-content"
                  : "text-base-content/75 hover:bg-base-300"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="w-full flex-1 p-5 sm:p-8">{children}</section>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <RequireAuth>
      <Shell>{children}</Shell>
    </RequireAuth>
  );
}