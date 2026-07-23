import Card from "@/components/ui/Card";

type RecentProject = {
  title: string;
  description: string;
};

type RecentProjectsCardProps = {
  projects: RecentProject[];
};

export default function RecentProjectsCard({
  projects,
}: RecentProjectsCardProps) {
  return (
    <Card title="Projetos Recentes">
      <div className="list">
        {projects.map((project) => (
          <div
            key={project.title}
            className="list-item"
          >
            <strong>{project.title}</strong>

            <span>{project.description}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}