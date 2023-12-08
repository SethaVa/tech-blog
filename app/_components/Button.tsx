"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
                input-box
            `,
        disabled && `opacity-50 cursor-default`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
