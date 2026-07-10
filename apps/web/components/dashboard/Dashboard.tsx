import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";

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
        <StatCard title="Downloads" value="0" />
        <StatCard title="Projetos" value="0" />
        <StatCard title="IA" value="0" />
        <StatCard title="Receita" value="R$ 0" />
      </div>

      <div className="dashboard-grid">
        <Card title="Projetos Recentes">
          <div className="list">
            <div className="list-item">
              <strong>CreatorOS</strong>
              <span>Arquitetura do sistema</span>
            </div>

            <div className="list-item">
              <strong>Landing Page</strong>
              <span>Em desenvolvimento</span>
            </div>

            <div className="list-item">
              <strong>Curso IA</strong>
              <span>Planejamento</span>
            </div>
          </div>
        </Card>

        <Card title="Missão do Dia">
          <div className="list">
            <div className="list-item">✔ Finalizar Dashboard</div>
            <div className="list-item">✔ Revisar Componentes</div>
            <div className="list-item">✔ Commit da Sprint</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <Button>Começar agora</Button>
          </div>
        </Card>
      </div>
    </>
  );
}