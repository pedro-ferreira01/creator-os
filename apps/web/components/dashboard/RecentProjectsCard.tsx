import type { WorkspaceProject } from "@/modules/workspace";
import Card from "@/components/ui/Card";

type RecentProjectsCardProps = {
  projects: WorkspaceProject[];
};

export default function RecentProjectsCard({
  projects,
}: RecentProjectsCardProps) {
  const recentProjects = projects
    .filter((project) => !project.archived)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <Card title="Projetos Recentes">
      <div className="list">
        {recentProjects.length === 0 ? (
          <div className="list-item">
            <span>Nenhum projeto criado ainda.</span>
          </div>
        ) : (
          recentProjects.map((project) => (
            <div
              key={project.id}
              className="list-item"
            >
              <strong>{project.name}</strong>

              <span>
                {project.description || "Sem descrição"}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}