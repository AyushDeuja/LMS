interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  noRounded?: boolean;
  buttonIcon?: React.JSX.Element;
}

const Button = ({
  label,
  type,
  onClick,
  className,
  noRounded,
  buttonIcon,
}: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={` w-full cursor-pointer text-white py-2 flex items-center justify-center gap-3 ${
          noRounded ? "rounded-none" : "rounded-md"
        } font-semibold hover:opacity-85 active:scale-95 transition-transform duration-150 ${className}`}
      >
        {buttonIcon}
        {label}
      </button>
    </div>
  );
};

export default Button;
