import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
  };

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = {
    primary: "button-primary",
    secondary: "button-secondary",
    danger: "button-danger",
  };

  return (
    <button
      className={`${classes[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}