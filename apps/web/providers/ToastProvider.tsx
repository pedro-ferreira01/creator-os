"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import Toast from "@/components/ui/Toast";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext =
  createContext<ToastContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function ToastProvider({
  children,
}: Props) {
  const [message, setMessage] = useState("");

  const [visible, setVisible] =
    useState(false);

  function showToast(text: string) {
    setMessage(text);

    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2500);
  }

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >
      {children}

      <Toast
        message={message}
        visible={visible}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context =
    useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast deve ser usado dentro do ToastProvider."
    );
  }

  return context;
}