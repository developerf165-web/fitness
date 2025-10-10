import React from "react";

export default function FormSection({ children, className }) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}
