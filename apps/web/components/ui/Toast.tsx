type ToastProps = {
  message: string;
  visible: boolean;
};

export default function Toast({
  message,
  visible,
}: ToastProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,

        background: "#2563eb",
        color: "#fff",

        padding: "12px 18px",

        borderRadius: 10,

        fontSize: 14,

        fontWeight: 600,

        boxShadow:
          "0 8px 30px rgba(0,0,0,.35)",

        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}