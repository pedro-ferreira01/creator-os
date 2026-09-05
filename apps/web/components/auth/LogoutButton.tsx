"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  createSupabaseBrowserClient,
} from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase =
      createSupabaseBrowserClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-opacity hover:opacity-80"
      style={{
        color: "var(--text-muted)",
      }}
    >
      <LogOut
        size={17}
        strokeWidth={1.8}
      />

      <span>Sair</span>
    </button>
  );
}