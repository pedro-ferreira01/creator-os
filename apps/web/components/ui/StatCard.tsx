type Props = {
  title: string;
  value: string | number;
  description?: string;
};

export default function StatCard({
  title,
  value,
  description,
}: Props) {
  return (
    <div className="card">
      <small
        style={{
          opacity: 0.7,
        }}
      >
        {title}
      </small>

      <h2
        style={{
          marginTop: 12,
          marginBottom: 8,
          fontSize: 32,
        }}
      >
        {value}
      </h2>

      {description && (
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#9ca3af",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}