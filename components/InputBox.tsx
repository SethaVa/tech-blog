"use client";

import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { useState } from "react";

interface InputBoxProps {
  name: string;
  type: string;
  id?: string;
  value?: string;
  placeholder: string;
  icon: LucideIcon;
}

const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon: Icon,
}: InputBoxProps) => {
  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);

  return (
    <div className=" relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type === "password" ? (isShowPassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
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
