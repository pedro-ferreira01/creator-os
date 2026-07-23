import Button from "@/components/ui/Button";

type WorkspaceToolbarProps = {
  showCreateForm: boolean;
  onToggleCreateForm: () => void;
};

export default function WorkspaceToolbar({
  showCreateForm,
  onToggleCreateForm,
}: WorkspaceToolbarProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Button onClick={onToggleCreateForm}>
        {showCreateForm ? "Cancelar" : "+ Novo Projeto"}
      </Button>
    </div>
  );
}