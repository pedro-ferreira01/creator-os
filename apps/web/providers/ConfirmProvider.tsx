"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

type ConfirmContextType = {
  confirm: (
    title: string,
    message: string
  ) => Promise<boolean>;
};

const ConfirmContext =
  createContext<ConfirmContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function ConfirmProvider({
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  const [resolver, setResolver] =
    useState<((value: boolean) => void) | null>(
      null
    );

  function confirm(
    title: string,
    message: string
  ) {
    setTitle(title);

    setMessage(message);

    setOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }

  function handleConfirm() {
    resolver?.(true);

    setOpen(false);
  }

  function handleCancel() {
    resolver?.(false);

    setOpen(false);
  }

  return (
    <ConfirmContext.Provider
      value={{ confirm }}
    >
      {children}

      <ConfirmDialog
        open={open}
        title={title}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context =
    useContext(ConfirmContext);

  if (!context) {
    throw new Error(
      "useConfirm deve ser usado dentro do ConfirmProvider."
    );
  }

  return context;
}