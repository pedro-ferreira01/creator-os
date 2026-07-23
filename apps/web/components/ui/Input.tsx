import { forwardRef } from "react";

type InputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(function Input(
  {
    value,
    placeholder,
    onChange,
  },
  ref
) {
  return (
    <input
      ref={ref}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="creator-input"
    />
  );
});

export default Input;