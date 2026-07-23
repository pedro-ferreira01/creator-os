import { forwardRef } from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(function SearchInput(
  {
    value,
    onChange,
    placeholder = "Pesquisar...",
  },
  ref
) {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f172a",
        color: "#fff",
        outline: "none",
        fontSize: 14,
      }}
    />
  );
});

export default SearchInput;