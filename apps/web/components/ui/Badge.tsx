type BadgeProps = {
  children: React.ReactNode;
  color: string;
};

export default function Badge({
  children,
  color,
}: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: `${color}20`,
        color,
      }}
    >
      {children}
    </span>
  );
}