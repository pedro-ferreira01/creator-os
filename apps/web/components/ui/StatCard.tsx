type Props = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: Props) {
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
          fontSize: 32,
        }}
      >
        {value}
      </h2>
    </div>
  );
}