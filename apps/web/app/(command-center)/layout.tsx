import Shell from "@/components/layout/Shell";

export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}