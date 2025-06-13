export default function Checkbox({
  name,
  checked,
  onChange,
  value,
  inverse,
  required,
  disabled,
  className,
  children,
}: {
  name: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  inverse?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <label
      className={disabled ? "cursor-text text-gray-400" : "cursor-pointer"}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        value={value}
        disabled={disabled}
        className={`form-checkbox -translate-y-0.5 my-3 mr-4 ${className}
      ring-1 ring-offset-0! h-6 w-6 ${
        disabled
          ? "ring-transparent border-gray-300 bg-gray-300"
          : inverse
          ? `ring-digitalent-gray-light bg-digitalent-blue checked:bg-digitalent-green hover:checked:bg-digitalent-green
          border-digitalent-gray-light text-digitalent-gray-light focus:ring-digitalent-gray-light focus:checked:ring-digitalent-green focus:checked:bg-digitalent-green checked:ring-digitalent-green cursor-pointer`
          : `ring-digitalent-blue bg-digitalent-gray-light checked:bg-digitalent-blue hover:checked:bg-digitialent-blue
          border-digitalent-blue text-digitalent-blue focus:ring-digitalent-blue cursor-pointer`
      }
      `}
      />
      <span>{children}</span>
    </label>
  );
}
