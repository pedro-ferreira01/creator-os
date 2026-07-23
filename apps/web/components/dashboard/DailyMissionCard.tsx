import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type DailyMissionCardProps = {
  missions: string[];
};

export default function DailyMissionCard({
  missions,
}: DailyMissionCardProps) {
  return (
    <Card title="Missão do Dia">
      <div className="list">
        {missions.map((mission) => (
          <div
            key={mission}
            className="list-item"
          >
            ✔ {mission}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
        }}
      >
        <Button>
          Começar agora
        </Button>
      </div>
    </Card>
  );
}