type DashboardHeaderProps = {
  title: string;
  subtitle: string;
};

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      <h1 className="page-title">{title}</h1>

      <p className="page-subtitle">
        {subtitle}
      </p>
    </div>
  );
}