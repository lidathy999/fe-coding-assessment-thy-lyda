"use client";

import React from "react";

type TextFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
  value?: string | number;
  name?: string;
  disabled?: boolean;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      placeholder = "",
      onChange,
      onBlur,
      onKeyDown,
      type = "text",
      className = "",
      value,
      name,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`w-full p-2 border rounded-md ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
