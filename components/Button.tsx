import { MouseEventHandler, forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      type = "default",
      onClick,
      className,
      disabled,
      name,
      submitType,
    }: {
      children: React.ReactNode;
      type?: "primary" | "default" | "invert";
      name?: string;
      onClick?: MouseEventHandler<HTMLButtonElement>;
      className?: string;
      disabled?: boolean;
      submitType?: boolean;
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const typeClass = {
      default: `border-digitalent-blue text-digitalent-blue hover:bg-digitalent-blue hover:text-white
         disabled:hover:bg-transparent disabled:hover:text-digitalent-blue`,
      invert: `text-white border-white hover:bg-white hover:text-digitalent-blue 
      disabled:hover:bg-transparent disabled:hover:text-white`,
      primary: `bg-digitalent-green text-white border-digitalent-green`,
    };

    return (
      <button
        onClick={onClick}
        className={`px-[20px] py-[10px] border-2 uppercase font-title 
        font-medium  disabled:opacity-50 disabled:cursor-not-allowed ${typeClass[type]} ${className}`}
        disabled={disabled}
        name={name}
        type={submitType ? "submit" : "button"}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
