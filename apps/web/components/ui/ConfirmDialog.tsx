import Button from "@/components/ui/Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "90%",
          background: "#111827",
          borderRadius: 12,
          padding: 24,
          border: "1px solid #334155",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#fff",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            marginTop: 16,
            color: "#cbd5e1",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 24,
          }}
        >
          <Button
  variant="secondary"
  onClick={onCancel}
>
  Cancelar
</Button>

<Button
  variant="danger"
  onClick={onConfirm}
>
  Confirmar
</Button>
        </div>
      </div>
    </div>
  );
}