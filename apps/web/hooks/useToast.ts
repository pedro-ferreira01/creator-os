import { useCallback, useState } from "react";

export function useToast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2500);
  }, []);

  return {
    message,
    visible,
    showToast,
  };
}