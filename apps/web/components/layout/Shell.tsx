import Sidebar from "./Sidebar";

type ShellProps = {
  children: React.ReactNode;
};

export default function Shell({ children }: ShellProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
        }}
      >
        {children}
      </main>
    </div>
  );
}