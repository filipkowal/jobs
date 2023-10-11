"use client";

import { useRef } from "react";

export default function TextInput({
  type = "text",
  className,
  name,
  dict,
  label,
  required,
  value,
  disabled,
  pattern,
  rows,
  onChange,
}: {
  name: string;
  dict: { invalidEmail: string };
  type?: string;
  className?: string;
  label?: string;
  required?: boolean;
  value?: any;
  disabled?: boolean;
  pattern?: string;
  rows?: number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValidationMessage = () => {
    const inputElement = inputRef.current;

    if (!inputElement || type !== "email") return;

    if (inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity(dict.invalidEmail);
    } else {
      inputElement.setCustomValidity("");
    }
  };

  return (
    <div className={`group relative  ${className}`}>
      {rows ? (
        <textarea
          className={`w-full ring-2 bg-digitalent-gray-light text-digitalent-blue 
                    ring-digitalent-blue border-none pl-4 
                      mt-4 block autofill:bg-digitalent-gray-light ${className}
                      [&:not(:placeholder-shown)+label]:-translate-y-[1.2rem] [&:not(:placeholder-shown)+label]:text-sm`}
          required={required}
          name={name}
          value={value}
          disabled={disabled}
          rows={rows}
          onChange={onChange}
          id={name}
          placeholder=" "
        />
      ) : (
        <input
          type={type}
          className={`w-full ring-2 bg-digitalent-gray-light text-digitalent-blue 
                    ring-digitalent-blue border-none pl-4 
                      mt-4 block autofill:bg-digitalent-gray-light ${className} 
                      [&:not(:placeholder-shown)+label]:-translate-y-[1.2rem] [&:not(:placeholder-shown)+label]:text-sm
                      [&:not(:placeholder-shown)]:invalid:[&:not(:focus)]:ring-red-500 [&:not(:placeholder-shown)]:invalid:[&:not(:focus)]:ring-offset-red-500`}
          required={required}
          name={name}
          value={value}
          disabled={disabled}
          // The regex has double backslashes because otherwise it is escaped in the string.
          pattern={type === "email" && !pattern ? `.+@.+\\...+` : pattern}
          onChange={(e) => {
            handleValidationMessage();
            onChange && onChange(e);
          }}
          ref={inputRef}
          id={name}
          placeholder=" "
        />
      )}
      {typeof label !== "undefined" ? (
        <label
          className={` bg-digitalent-gray-light px-1 absolute left-4 top-2 transition-all ease-out font-light
          group-focus-within:-translate-y-[1.2rem] group-focus-within:text-sm`}
          htmlFor={name}
        >
          {label + (required ? " *" : "")}
        </label>
      ) : null}
    </div>
  );
}
