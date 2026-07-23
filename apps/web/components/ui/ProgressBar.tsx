type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <div
      style={{
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 8,
          background: "#1e293b",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: "#2563eb",
          }}
        />
      </div>
    </div>
  );
}