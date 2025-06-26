"use client";

import React from "react";

type TextFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email"; // Added more common input types
  value?: string | number; // Added value prop for controlled inputs
  name?: string; // Added name for form handling
  disabled?: boolean; // Added disabled state
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      placeholder = "",
      onChange,
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
