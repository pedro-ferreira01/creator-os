"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";
import LogoutButton from "@/components/auth/LogoutButton";
import { navigation } from "@/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Logo />

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${active ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}