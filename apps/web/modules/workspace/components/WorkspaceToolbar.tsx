import Button from "@/components/ui/Button";

type WorkspaceToolbarProps = {
  showCreateForm: boolean;

  editingProjectId: string | null;

  onToggleCreateForm: () => void;

  onCancelEdit: () => void;
};

export default function WorkspaceToolbar({
  showCreateForm,
  editingProjectId,
  onToggleCreateForm,
  onCancelEdit,
}: WorkspaceToolbarProps) {
  const isEditing =
    editingProjectId !== null;

  function handleClick() {
    if (isEditing) {
      onCancelEdit();
      return;
    }

    onToggleCreateForm();
  }

  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      <Button onClick={handleClick}>
        {isEditing
          ? "Cancelar edição"
          : showCreateForm
          ? "Cancelar"
          : "+ Novo Projeto"}
      </Button>
    </div>
  );
}