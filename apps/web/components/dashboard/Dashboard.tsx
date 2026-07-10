import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";

import {
  dashboardStats,
  recentProjects,
  dailyMission,
} from "@/lib/dashboard-data";

import { ProjectList } from "@/modules/projects";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-header">
        <h1 className="page-title">Command Center</h1>

        <p className="page-subtitle">
          Bem-vindo ao CreatorOS, Sr. Finch. Seu ambiente de trabalho está
          pronto.
        </p>
      </div>

      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <Card title="Projetos Recentes">
          <div className="list">
            {recentProjects.map((project) => (
              <div key={project.title} className="list-item">
                <strong>{project.title}</strong>
                <span>{project.description}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Missão do Dia">
          <div className="list">
            {dailyMission.map((mission) => (
              <div key={mission} className="list-item">
                ✔ {mission}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <Button>Começar agora</Button>
          </div>
        </Card>

        <Card title="Workspace">
          <div style={{ marginBottom: 20 }}>
            <Button>+ Novo Projeto</Button>
          </div>

          <ProjectList />
        </Card>
      </div>
    </>
  );
}