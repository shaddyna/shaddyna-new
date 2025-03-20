import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#0d173a] transition-all disabled:bg-gray-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;