import Logo from "./Logo";
import { navigation } from "@/lib/navigation";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        background: "#08111F",
        padding: 24,
        borderRight: "1px solid #1e293b",
      }}
    >
      <Logo />

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginTop: 40,
        }}
      >
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                opacity: 0.85,
              }}
            >
              <Icon size={18} />

              <span>{item.title}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}