"use client";

import clsx from "clsx";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputBoxProps {
  name: string;
  type: string;
  id: string;
  value?: string;
  placeholder: string;
  icon: LucideIcon;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
}

const InputBox = ({
  errors,
  disabled,
  name,
  type,
  id,
  value,
  placeholder,
  required,
  register,
  icon: Icon,
}: InputBoxProps) => {
  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);

  return (
    <div className=" relative w-[100%] mb-4">
      <input
        type={
          type === "password" ? (isShowPassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        {...register(id, { required })}
        id={id}
        className={clsx(
          `
            input-box 
          `,
          errors[id] && `focus:ring-rose-600`,
          disabled && `opacity-50 cursor-default`
        )}
        disabled={disabled}
      />

      <Icon className="input-icon w-5 h-5"></Icon>

      {type === "password" ? (
        isShowPassword ? (
          <Eye
            className="input-icon w-5 h-5 left-[auto] right-4 cursor-pointer"
            onClick={() => setIsShowPassword((current) => !current)}
          />
        ) : (
          <EyeOff
            className="input-icon w-5 h-5 left-[auto] right-4 cursor-pointer"
            onClick={() => setIsShowPassword((current) => !current)}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputBox;
