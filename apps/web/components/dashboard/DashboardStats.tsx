import StatCard from "@/components/ui/StatCard";

type Stat = {
  title: string;
  value: string | number;
  description?: string;
};

type DashboardStatsProps = {
  stats: Stat[];
};

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard
  key={stat.title}
  title={stat.title}
  value={stat.value}
  description={stat.description}
/>
      ))}
    </div>
  );
}