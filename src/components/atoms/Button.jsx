import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    dangerOutline: 'bg-white hover:bg-red-50 text-red-600 border border-red-200',
  };

  return (
    <button
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}