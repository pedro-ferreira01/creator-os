import { useEffect, useMemo, useState } from "react";
import { commands } from "@/lib/commandPalette";

type CommandPaletteProps = {
  open: boolean;
  onExecute: (action: string) => void;
};

export default function CommandPalette({
  open,
  onExecute,
}: CommandPaletteProps) {

    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

const filteredCommands = useMemo(() => {
  
  
  const term = search.toLowerCase();

  return commands.filter(
    (command) =>
      command.title.toLowerCase().includes(term) ||
      command.subtitle.toLowerCase().includes(term)
  );
}, [search]);

useEffect(() => {
  setSelectedIndex(0);
}, [search]);

useEffect(() => {
  if (!open) {
    setSearch("");
    setSelectedIndex(0);
  }
}, [open]);

useEffect(() => {
  if (!open) return;

  function handleKeyDown(event: KeyboardEvent) {
    if (filteredCommands.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((current) =>
        current === filteredCommands.length - 1
          ? 0
          : current + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((current) =>
        current === 0
          ? filteredCommands.length - 1
          : current - 1
      );
      
    }
if (event.key === "Enter") {
  event.preventDefault();

  const command = filteredCommands[selectedIndex];

  if (!command) return;

  onExecute(command.action);
}

  }


  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [
  open,
  filteredCommands,
  selectedIndex,
  onExecute,
]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 120,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 650,
          maxWidth: "90%",
          background: "#111827",
          border: "1px solid #334155",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <input
  autoFocus
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Digite um comando..."
  style={{
    width: "100%",
    padding: 18,
    background: "transparent",
    color: "#fff",
    border: "none",
    outline: "none",
    fontSize: 16,
  }}
/>

        <div
  style={{
    borderTop: "1px solid #334155",
    maxHeight: 420,
    overflowY: "auto",
  }}
>
  {filteredCommands.map((command, index) => (
   <button
  key={command.id}
  onMouseEnter={() => setSelectedIndex(index)}
  onClick={() => onExecute(command.action)}
 style={{
  width: "100%",
  padding: "16px 20px",
  background:
    index === selectedIndex
      ? "#1e3a8a"
      : "transparent",
  border: "none",
  borderBottom: "1px solid #1f2937",
  cursor: "pointer",
  textAlign: "left",
  transition: "background .15s ease",
}}
    >
        {filteredCommands.length === 0 && (
  <div
    style={{
      padding: 20,
      textAlign: "center",
      color: "#94a3b8",
    }}
  >
    Nenhum comando encontrado.
  </div>
)}
      <div
        style={{
          color: "#fff",
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {command.title}
      </div>

      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
        }}
      >
        {command.subtitle}
      </div>
    </button>
  ))}
</div>
      </div>
    </div>
  );
}