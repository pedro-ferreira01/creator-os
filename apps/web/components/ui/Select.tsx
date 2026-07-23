type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function Select({
  value,
  onChange,
  options,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f172a",
        color: "#fff",
        fontSize: 14,
        outline: "none",
      }}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}