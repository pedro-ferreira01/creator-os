type MetaTextProps = {
  children: React.ReactNode;
};

export default function MetaText({
  children,
}: MetaTextProps) {
  return (
    <small
      style={{
        display: "block",
        marginTop: 8,
        color: "#94a3b8",
      }}
    >
      {children}
    </small>
  );
}