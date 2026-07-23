type TextareaProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  rows?: number;
};

export default function Textarea({
  value,
  placeholder,
  onChange,
  rows = 4,
}: TextareaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="creator-textarea"
    />
  );
}