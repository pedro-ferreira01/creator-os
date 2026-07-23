import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import MetaText from "@/components/ui/MetaText";
import ProgressBar from "@/components/ui/ProgressBar";
import { useToast } from "@/providers/ToastProvider";
import { useConfirm } from "@/providers/ConfirmProvider";
import { downloadStatusConfig } from "../config/downloadStatus";


import type { DownloadItem } from "../types";

type DownloadCardProps = {
  item: DownloadItem;
  onDelete: (id: string) => void;
  onPrimaryAction: (id: string) => void;
};







export default function DownloadCard({
  item,
  onDelete,
  onPrimaryAction,
}: DownloadCardProps) {

const { showToast } = useToast();
const { confirm } = useConfirm();
const statusConfig = downloadStatusConfig[item.status];

  return (
    <div className="list-item">
      <strong>{item.platform}</strong>

      <MetaText>{item.url}</MetaText>

      <div
        style={{
          marginTop: 10,
        }}
      >
        <Badge color={statusConfig.color}>
          {item.status}
        </Badge>
      </div>

      <div
  style={{
    marginTop: 12,
    marginBottom: 12,
  }}
>
  <ProgressBar value={item.progress} />
</div>

<MetaText>
  Progresso: {item.progress}% • Criado: {item.createdAt}
</MetaText>

     <div
  style={{
    display: "flex",
    gap: 12,
    marginTop: 12,
    flexWrap: "wrap",
  }}
>
  <Button
  onClick={() => onPrimaryAction(item.id)}
>
  {statusConfig.action}
</Button>

  <Button
    onClick={() => {
      navigator.clipboard.writeText(item.url);
showToast("Link copiado!");
    }}
  >
    Copiar Link
  </Button>

 <Button
  disabled={!statusConfig.canDelete}
  onClick={async () => {
    const confirmed = await confirm(
      "Excluir download",
      `Deseja realmente excluir este download de ${item.platform}?`
    );

    if (confirmed) {
      onDelete(item.id);
      showToast("Download excluído.");
    }
  }}
>
  Excluir
</Button>
</div>
    </div>
  );
}