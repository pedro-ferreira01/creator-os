import { redirect } from "next/navigation";

import Shell from "@/components/layout/Shell";
import {
  createSupabaseServerClient,
} from "@/lib/supabase/server";

export default async function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <Shell>{children}</Shell>;
}